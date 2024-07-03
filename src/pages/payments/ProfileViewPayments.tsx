import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PaginationSection from "../../components/PaginationSection.tsx";
import weteachApi from "../../configs/weteach-api.ts";
import queryString from "query-string";
import NoData from "../../components/no-data.tsx";

function ProfilePostPaymentTable({ payments }: { payments: any }) {

  return (
    <div className={"table-container mt-3"}>
      <table>
        <thead>
          <tr>
            <th>Teachssser</th>
            <th>Post Impressions</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className={"hover:cursor-default"}>
              <th>{payment.teacher_profile_post.teacher.full_name}</th>
              <td>
                {payment.teacher_profile_post.views}
              </td>
              <td>{payment.amount}</td>
              <td>
                {DateTime.fromISO(payment.creation_time).toLocaleString({
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

export default function ProfilePostPayment() {
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
      page,
    },
    {
      skipEmptyString: true,
    },
  );

  const url = `api/v1/dashboard/finances/profile/view/list/${query === "" ? "" : "?" + query}`;

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
      {data !== undefined ? (
        <>
          {data.data.results.length !== 0 ? (
            <ProfilePostPaymentTable payments={data.data.results} />
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
