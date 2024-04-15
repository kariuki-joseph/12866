import filterList from "/icons/filter_list.svg";
import addSecondary from "/icons/add_secondary.svg";
import expandMore from "/icons/expand_more.svg";
import search from "/icons/search.svg";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../configs/weteach-api.ts";
import { Link, useParams } from "react-router-dom";
import { Job } from "../../../interfaces/api.ts";

function PostedJobsTable({ jobs }: { jobs: Job[] }) {
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <th>{job.title}</th>
              <td>{job.status}</td>
              <td>{job.views}</td>
              <td>
                {job.payment_rate !== null
                  ? `${job.payment_rate.days} days(s) for Ksh ${job.payment_rate.charges})`
                  : "-"}
              </td>
              <td>{job.creation_time}</td>
              <td>:</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PostedJobsTab() {
  const { schoolId } = useParams();

  const url = `/api/v1/dashboard/school/jobs/${schoolId}/`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <section>
      <div className={"flex flex-row items-center justify-between"}>
        <div className={"flex flex-row gap-3"}>
          <button className="flex flex-row text-sm items-center gap-3 p-3 border border-gray-200 rounded-[32px]">
            <img src={filterList} alt={"filter"} />
            <p>Filter by</p>
            <img src={expandMore} alt={"expand more"} />
          </button>

          <button className="flex flex-row text-sm items-center gap-3 p-3 border border-gray-200 rounded-[32px] w-[300px]">
            <img src={search} alt={"search"} />
            <p>Search</p>
          </button>
        </div>
        <Link className={"btn-outlined"} to={"jobs/create"}>
          <img src={addSecondary} className={"w-6 h-6"} />
          <span>Post new job</span>
        </Link>
      </div>

      {data !== undefined ? <PostedJobsTable jobs={data.data.results} /> : null}
    </section>
  );
}
