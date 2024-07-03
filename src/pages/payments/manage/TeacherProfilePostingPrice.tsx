import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../configs/weteach-api.ts";
import { PaymentRate } from "../../../interfaces/api.ts";
import * as Popover from "@radix-ui/react-popover";
import more_vert from "/icons/more_vert.svg";
import add_secondary from "/icons/add_secondary.svg";
import queryClient from "../../../configs/query-client.ts";
import { Link } from "react-router-dom";

function TeacherProfilePostingPriceTable({ rates }: { rates: PaymentRate[] }) {
  const deletePackage = async (id: number) => {
    await weteachApi.delete(`/api/v1/payments/rates/modify/${id}/`);

    await queryClient.invalidateQueries({
      queryKey: ["api/v1/payments/rates/"],
    });
  };

  return (
    <div className={"table-container"}>
      <table>
        <thead>
          <tr>
            <th>Duration of post(in days)</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.id}>
              <td>{rate.days}</td>
              <td>{rate.charges}</td>
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
                        "bg-white *:px-3 *:py-2 z-20 border border-gray-200 text-xs flex flex-col w-[200px] rounded"
                      }
                      side={"bottom"}
                      sideOffset={5}
                      align={"end"}
                    >
                      <Link
                        to={`${rate.id}/edit`}
                        className={
                          "hover:bg-gray-100 hover:text-black text-left"
                        }
                      >
                        Edit
                      </Link>
                      <Popover.Close asChild>
                        <button
                          className={
                            "hover:bg-gray-100 hover:text-black text-left"
                          }
                          onClick={() => deletePackage(rate.id)}
                        >
                          Delete
                        </button>
                      </Popover.Close>
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
export default function TeacherProfilePostingPrice() {
  const url = `api/v1/payments/profile/rates/`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <>
      <div className={"flex flex-row justify-end mb-3"}>
        <Link to={"/payments/create"} className={"btn-outlined"}>
          <img src={add_secondary} alt={"add"} />
          <span>Add package</span>
        </Link>
      </div>
      {data !== undefined ? <TeacherProfilePostingPriceTable rates={data.data} /> : null}
    </>
  );
}
