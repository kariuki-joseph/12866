import filterList from "/icons/filter_list.svg";
import search from "/icons/search.svg";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as Popover from "@radix-ui/react-popover";
import { Payment } from "../../interfaces/api.ts";
import PaginationSection from "../../components/PaginationSection.tsx";
import weteachApi from "../../configs/weteach-api.ts";
import queryString from "query-string";
import NoData from "../../components/no-data.tsx";

function PostedJobsTable({ payments }: { payments: Payment[] }) {
  const navigate = useNavigate();
  return (
    <div className={"table-container mt-3"}>
      <table>
        <thead>
          <tr>
            <th>School</th>
            <th>Post Publicity</th>
            <th>Payment Method</th>
            <th>Post Impressions</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className={"hover:cursor-default"}>
              <th>{payment.job.school.name}</th>
              <td>
                {payment.rate.days} day(s) for Ksh {payment.rate.charges}
              </td>
              <td>{payment.payment_method}</td>
              <td>-</td>
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

export default function JobPayments() {
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

  const url = `api/v1/dashboard/finances/post/list/${query === "" ? "" : "?" + query}`;

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
              ></Popover.Content>
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
            <PostedJobsTable payments={data.data.results} />
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
