import filterList from "/icons/filter_list.svg";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../configs/weteach-api.ts";
import LoadingBlocks from "../../components/loading/LoadingBlocks.tsx";
import StatCard from "../../components/StatCard.tsx";
import { Job } from "../../interfaces/api.ts";
import { DateTime } from "luxon";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import queryString from "query-string";
import * as Popover from "@radix-ui/react-popover";
import search from "/icons/search.svg";
import PaginationSection from "../../components/PaginationSection.tsx";
import more_vert from "/icons/more_vert.svg";
import visibility from "/icons/visibility.svg";
import attach_money from "/icons/attach_money.svg";
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
        imageSrc={attach_money}
        title={data?.data.total_job_posts}
        text={"Posted Jobs"}
      />

      <StatCard
        imageSrc={attach_money}
        title={data?.data.job_post_revenue}
        text={"Total Post impressions"}
      />

      <StatCard
        imageSrc={attach_money}
        title={data?.data.job_view_revenue}
        text={"Spends on post"}
      />

      <StatCard
        imageSrc={visibility}
        title={data?.data.post_publicity_packages}
        text={"Post Publicity Packages"}
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
            <th>Actions</th>
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
                {DateTime.fromISO(job.creation_time).toLocaleString({
                  locale: "en-gb",
                })}
              </td>
              <td>
                <Popover.Root>
                  <Popover.Trigger asChild onClick={(e) => e.stopPropagation()}>
                    <button
                      className={"flex flex-row items-center justify-center"}
                    >
                      <img src={more_vert} alt={"more"} className={"w-4 h-4"} />
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      className={
                        "bg-white *:px-3 *:py-2 z-20 border border-gray-200 text-xs flex flex-col w-[200px]"
                      }
                      side={"bottom"}
                      sideOffset={5}
                      align={"end"}
                    >
                      <Link
                        to={`/schools/${job.school.id}/jobs/${job.id}/edit/basic-info`}
                        className={"hover:bg-gray-200 hover:text-black"}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Basic Info
                      </Link>
                      <Link
                        to={`/schools/${job.school.id}/jobs/${job.id}/edit/job-details`}
                        className={"hover:bg-gray-200 hover:text-black"}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Job Details
                      </Link>
                      <Link
                        to={`/schools/${job.school.id}/jobs/${job.id}/edit/payment-rate`}
                        className={"hover:bg-gray-200 hover:text-black"}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Make payment
                      </Link>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
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
});

type ISchema = z.infer<typeof schema>;

function JobsTableSection() {
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

  const query = queryString.stringify(
    {
      status,
      page,
      title,
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
        <div className={"flex flex-row gap-3"}>
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="flex flex-row text-sm items-center gap-3 px-4 py-2  border border-gray-200 rounded-[32px]">
                <img src={filterList} alt={"filter"} />
                <p>Filter</p>
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className={"bg-white p-3 z-20 border border-gray-200 text-xs"}
                side={"bottom"}
                sideOffset={5}
                align={"start"}
              >
                <div
                  className={
                    "flex flex-col gap-3 border-b border-gray-200 pb-3 mt-3"
                  }
                >
                  <div
                    className={
                      "flex flex-row items-center w-full justify-center gap-3"
                    }
                  >
                    <label className={"text-right text-xs"}>Status</label>

                    <select {...register("status")} className={"p-2 text-xs"}>
                      <option value={""}>Select status</option>
                      <option value={"active"}>Active</option>
                      <option value={"inactive"}>Inactive</option>
                      <option value={"expired"}>Expired</option>
                      <option value={"draft"}>Draft</option>
                    </select>
                  </div>
                </div>

                <button
                  className={"w-full text-secondary text-sm pt-3"}
                  onClick={() => clearFilter()}
                >
                  Clear filter
                </button>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

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
  return (
    <>
      <JobStats />
      <section>
        <h1 className={"font-bold text-lg"}>Jobs on Platform</h1>
        <p className={"text-sm text-gray-500 mb-3"}>
          Explore and manage the jobs on the platform
        </p>

        <JobsTableSection />
      </section>
    </>
  );
}
