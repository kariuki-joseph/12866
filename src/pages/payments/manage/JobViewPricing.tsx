import React from "react";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../configs/weteach-api.ts";
import { ViewPaymentRate } from "../../../interfaces/api.ts";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import queryClient from "../../../configs/query-client.ts";

const schema = z.object({
  charge: z.coerce.number().min(0),
});

type ISchema = z.infer<typeof schema>;

function JobViewPricingForm({ rate }: { rate: ViewPaymentRate }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchema>({
    defaultValues: {
      charge: rate.charge,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ISchema) => {
    await weteachApi.patch(
      `api/v1/payments/view/charge/modify/${rate.id}/`,
      data,
    );

    queryClient.invalidateQueries({
      queryKey: [`api/v1/payments/view/charge/`],
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className={"text-sm text-gray-500"}>Cost of Viewing a Job Post</p>

      <hr className={"my-3"} />

      <label htmlFor={"charge"}>Amount</label>
      <input
        {...register("charge")}
        placeholder={"Enter amount"}
        type={"number"}
      />

      <p className={"text-xs text-error mt-1"}>{errors.charge?.message}</p>

      <div className={"flex flex-row items-center justify-end py-2 gap-3"}>
        <button
          className={"btn-outlined"}
          onClick={() => navigate("../", { relative: "path" })}
        >
          Cancel
        </button>
        <button className={"btn"}>Submit</button>
      </div>
    </form>
  );
}

export default function JobViewPricing({
  setTab,
}: {
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const url = `api/v1/payments/view/charge/`;

  const { data, isLoading } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <div>
      {data !== undefined ? <JobViewPricingForm rate={data.data} /> : null}
    </div>
  );
}
