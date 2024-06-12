import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import { useState } from "react";
import queryString from "query-string";
import * as Popover from "@radix-ui/react-popover";
import more_vert from "/icons/more_vert.svg";
import { Job } from "../../../../../interfaces/api.ts";
import weteachApi from "../../../../../configs/weteach-api.ts";
import PaginationSection from "../../../../../components/PaginationSection.tsx";
import NoData from "../../../../../components/no-data.tsx";

function JobsTable({ jobs }: { jobs: Job[] }) {
  const navigate = useNavigate();
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
            <tr>
              <th>{job.title}</th>
              <td>{job.status}</td>
              <td>{job.views}</td>
              <td>
                {/*{job.payment_rate !== null*/}
                {/*  ? `${job.payment_rate.days} days(s) for Ksh ${job.payment_rate.charges})`*/}
                {/*  : "-"}*/}
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
                        to={`jobs/${job.id}/edit/basic-info`}
                        className={"hover:bg-gray-100 hover:text-black"}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Basic Info
                      </Link>
                      <Link
                        to={`jobs/${job.id}/edit/job-details`}
                        className={"hover:bg-gray-100 hover:text-black"}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Job Details
                      </Link>
                      <Link
                        to={`jobs/${job.id}/edit/payment-rate`}
                        className={"hover:bg-gray-100 hover:text-black"}
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

export default function SavedJobs() {
  const { jobId } = useParams();
  const [page, setPage] = useState(1);

  const query = queryString.stringify(
    {
      page,
    },
    {
      skipEmptyString: true,
    },
  );

  const url = `api/v1/dashboard/job/saves/${jobId}/${query === "" ? "" : "?" + query}`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
    placeholderData: (previousData) => previousData,
  });

  return (
    <section>
      {data !== undefined ? (
        <>
          {data.data.results.length !== 0 ? (
            <>
              <JobsTable jobs={data.data.results} />
            </>
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
