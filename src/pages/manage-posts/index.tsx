import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../configs/weteach-api.ts";
import LoadingBlocks from "../../components/loading/LoadingBlocks.tsx";
import StatCard from "../../components/StatCard.tsx";
import { AxiosResponse, InstitutionLevel, Job } from "../../interfaces/api.ts";
import { DateTime } from "luxon";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import queryString from "query-string";
import search from "/icons/search.svg";
import PaginationSection from "../../components/PaginationSection.tsx";
import inbox from "/icons/inbox.svg";
import visibility from "/icons/visibility.svg";
import paper_plane_tilt from "/icons/paper-plane-tilt.svg";
import visibility_off_primary from "/icons/visibility_off_primary.svg";
import NoData from "../../components/no-data.tsx";

function JobStats() {
  const url = "api/v1/dashboard/jobs/statistics/";

  const { data, isLoading } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  if (isLoading) return <LoadingBlocks numberOfBlocks={4} />;

  return (
    <section className="flex flex-row w-full justify-evenly gap-4 mb-3">
      <StatCard
        imageSrc={paper_plane_tilt}
        title={data?.data.total_job_posts}
        text={"Total Job Posts"}
      />

      <StatCard
        imageSrc={visibility}
        title={data?.data.active_posts}
        text={"Active Posts"}
      />

      <StatCard
        imageSrc={inbox}
        title={data?.data.draft_posts}
        text={"Drafts (Unpaid for)"}
      />

      <StatCard
        imageSrc={visibility_off_primary}
        title={data?.data.unviewed_posts}
        text={"Unviewed Posts"}
      />
    </section>
  );
}

function JobsTable({ jobs }: { jobs: Job[] }) {
  const navigate = useNavigate();

  return (
    <div className={"table-container mt-3"}>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>School</th>
            <th>Institution Level</th>
            <th>Status</th>
            <th>Post Impression</th>
            <th>Post Publicity</th>
            <th>Posted On</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr
              key={job.id}
              onClick={() =>
                navigate(`/schools/${job.school.id}/jobs/${job.id}`)
              }
            >
              <th>{job.title}</th>
              <th>{job.school.name}</th>
              <th>
                {job.institution_level !== null
                  ? job.institution_level.name
                  : "-"}
              </th>
              <td>{job.status}</td>
              <td>{job.views}</td>
              <td>
                {job.payment_rate !== null
                  ? `${job.payment_rate.days} days(s) for Ksh ${job.payment_rate.charges})`
                  : "-"}
              </td>
              <td>
                {DateTime.fromISO(job.creation_time).toLocaleString()}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const schema = z.object({
  payment_rate: z.string().optional(),
  teacher_requirements: z.string().optional(),
  title: z.string().optional(),
  status: z.string().optional(),
  institution_level: z.string().optional(),
});

type ISchema = z.infer<typeof schema>;

function JobsTableSection(props: { institution_levels: InstitutionLevel[] }) {
  const { institution_levels } = props;

  const [page, setPage] = useState(1);

  const { register, watch, reset } = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const subscription = watch(() => setPage(1));
    return () => subscription.unsubscribe();
  }, [watch]);

  const status = watch("status");
  const title = watch("title");
  const institution_level = watch("institution_level");

  const query = queryString.stringify(
    {
      status,
      page,
      search: title,
      institution_level,
    },
    {
      skipEmptyString: true,
    },
  );

  const url = `/api/v1/dashboard/jobs/list/${query === "" ? "" : "?" + query}`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
    placeholderData: (previousData) => previousData,
  });

  function clearFilter() {
    reset({
      status: "",
    });
  }

  return (
    <section>
      <div className={"flex flex-row items-center justify-between"}>
        <div className={"flex flex-row gap-3 w-full"}>
          <select {...register("status")} className={"p-2 text-xs w-fit"}>
            <option value={""}>Select status</option>
            <option value={"active"}>Active</option>
            <option value={"inactive"}>Inactive</option>
            <option value={"expired"}>Expired</option>
            <option value={"draft"}>Draft</option>
          </select>

          <select
            {...register("institution_level")}
            className={"p-2 text-xs w-fit"}
          >
            <option value={""}>Select level of institution</option>

            {institution_levels.map((institution_level) => (
              <option value={institution_level.id} key={institution_level.id}>
                {institution_level.name}
              </option>
            ))}
          </select>

          <label className="flex flex-row text-sm items-center gap-3 px-4 py-0 border border-gray-200 rounded-[32px] w-[300px]">
            <img src={search} alt={"filter"} />
            <input
              {...register("title")}
              type={"search"}
              placeholder={"Search"}
              className={"py-0  text-regular h-full border-0 focus:outline-0"}
            />
          </label>
        </div>
      </div>

      {data !== undefined ? (
        <>
          {data.data.results.length !== 0 ? (
            <JobsTable jobs={data.data.results} />
          ) : (
            <NoData />
          )}

          <PaginationSection
            page={page}
            total={data.data.count}
            setPage={setPage}
          />
        </>
      ) : null}
    </section>
  );
}

export default function ManagePostsPage() {
  const url = "api/v1/subjects/institution/levels/";

  const { data } = useQuery<AxiosResponse<InstitutionLevel[]>>({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
    placeholderData: (previousData) => previousData,
  });

  return (
    <>
      <JobStats />
      <section>
        <h1 className={"font-bold text-lg"}>Jobs on Platform</h1>
        <p className={"text-sm text-gray-500 mb-3"}>
          Explore and manage the jobs on the platform
        </p>

        {data !== undefined ? (
          <JobsTableSection institution_levels={data.data} />
        ) : null}
      </section>
    </>
  );
}
