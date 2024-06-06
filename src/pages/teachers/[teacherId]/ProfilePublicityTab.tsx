import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../configs/weteach-api";
import { useParams } from "react-router-dom";
import queryString from "query-string";
import { useState } from "react";
import PaginationSection from "../../../components/PaginationSection";
import NoData from "../../../components/no-data";
import { TeacherProfilePayment } from "../../../interfaces/api";
import { DateTime } from "luxon";

export function TeacherPayments(props: { payments: TeacherProfilePayment[] }) {
  const { payments } = props;

  return (
    <div className={"table-container mt-3"}>
      <table>
        <thead>
          <tr>
            <th>Subscription Tier</th>
            <th>Profile Impressions</th>
            <th>Status</th>
            <th>Posted On</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className={"hover:cursor-default"}>
              <th>
                {payment.payment !== null
                  ? `${payment.payment.profile_rate.charges} for ${payment.payment.profile_rate.days}(s)`
                  : "-"}
              </th>
              <td>{payment.views}</td>
              <td>
                {payment.is_active ? (
                  <span
                    className={
                      "px-2 py-1 bg-[#D6FBD8] text-[#2E7D32] rounded-3xl text-center"
                    }
                  >
                    Live
                  </span>
                ) : (
                  <span
                    className={
                      "px-2 py-1 bg-[#F8BD00] bg-opacity-10 text-[#CD7F4B] rounded-3xl text-center"
                    }
                  >
                    Offline
                  </span>
                )}
              </td>
              <td>
                {payment.payment !== null
                  ? `${DateTime.fromISO(
                    payment.payment.last_updated_time,
                  ).toLocaleString({
                    locale: "en-gb",
                  })}`
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default function ProfilePublicityTab() {
  const params = useParams();

  const [page, setPage] = useState(1);

  const query = queryString.stringify(
    {
      page,
    },
    {
      skipEmptyString: true,
    },
  );

  const url = `/api/v1/dashboard/teacher/profiles/${params.teacherId}/${query === "" ? "" : "?" + query}`;
  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <section>
      {data !== undefined ? (
        <>
          {data.data.results.length !== 0 ? (
            <TeacherPayments payments={data.data.results} />
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
