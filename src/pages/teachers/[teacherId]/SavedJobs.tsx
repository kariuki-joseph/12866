import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import queryString from "query-string";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../configs/weteach-api.ts";
import search from "/icons/search.svg";
import PaginationSection from "../../../components/PaginationSection.tsx";
import { z } from "zod";
import { Job } from "../../../interfaces/api.ts";
import { DateTime } from "luxon";
import NoData from "../../../components/no-data.tsx";

function JobsTable({ jobs }: { jobs: Job[] }) {
  return (
    <div className={"table-container mt-3"}>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Status</th>
            <th>Post Impression</th>
            <th>Post Publicity</th>
            <th>Posted On</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className={"hover:cursor-default"}>
              <th>{job.title}</th>
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

export default function SavedJobs() {
  const { teacherId } = useParams();
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

  const url = `/api/v1/dashboard/teacher/saved/jobs/${teacherId}/${query === "" ? "" : "?" + query}`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
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
          <select {...register("status")} className={"p-2 text-xs"}>
            <option value={""}>Select status</option>
            <option value={"active"}>Active</option>
            <option value={"inactive"}>Inactive</option>
            <option value={"expired"}>Expired</option>
            <option value={"draft"}>Draft</option>
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
