import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";
import { useState } from "react";
import queryString from "query-string";
import weteachApi from "../../../../../configs/weteach-api.ts";
import PaginationSection from "../../../../../components/PaginationSection.tsx";
import NoData from "../../../../../components/no-data.tsx";

function JobViewsTable({ jobViews }: { jobViews: JobView[] }) {
  return (
    <div className={"table-container mt-3"}>
      <table>
        <thead>
          <tr>
            <th>Teacher</th>
            <th>Viewed On</th>
          </tr>
        </thead>
        <tbody>
          {jobViews.map((jobView) => (
            <tr>
              <th>{jobView.teacher_profile.full_name}</th>
              <td>
                {DateTime.fromISO(jobView.creation_time).toLocaleString({
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

export default function JobViews() {
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

  const url = `api/v1/dashboard/job/views/${jobId}/${query === "" ? "" : "?" + query}`;

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
              <JobViewsTable jobViews={data.data.results} />
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
