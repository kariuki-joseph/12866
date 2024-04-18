import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import {
  AxiosResponse,
  Job,
  PaymentRate,
} from "../../../../../../interfaces/api.ts";
import weteachApi from "../../../../../../configs/weteach-api.ts";
import FormSection from "../../../../../../components/FormSection.tsx";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import { Dispatch, SetStateAction, useState } from "react";

const schema = z.object({
  payment_rate: z.string(),
  phone_number: z.string().startsWith("2547").length(12),
});

type ISchema = z.infer<typeof schema>;

function EditPaymentRateForm({
  job,
  setTab,
}: {
  job: Job;
  setTab: Dispatch<SetStateAction<string>>;
}) {
  const navigate = useNavigate();

  const previousPage = "../../../../";
  const paymentRateUrl = `/api/v1/payments/rates/`;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISchema>({
    defaultValues: {
      phone_number: "2547",
    },
    resolver: zodResolver(schema),
  });

  const { data } = useQuery<AxiosResponse<PaymentRate[]>>({
    queryKey: [paymentRateUrl],
    queryFn: () => weteachApi.get(paymentRateUrl),
  });

  const onSubmit = async (data: ISchema) => {
    // const res = await weteachApi.post("api/v1/payments/mpesa/post/make/", {
    //   owner: job.school.owner.id,
    //   job: job.id,
    //   rate: data.payment_rate,
    //   phone_number: data.phone_number,
    // });
    //
    // const { payment } = res.data;

    setTab("processing-payment");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {data !== undefined ? (
        <>
          <label>Publicity Package</label>
          <RadioGroup.Root
            name={"payment_rate"}
            className={"flex flex-col gap-3 justify-evenly mb-3"}
            onValueChange={(value) => setValue("payment_rate", value)}
          >
            <>
              {data.data.map((payment_rate) => (
                <div key={payment_rate.id} className={"w-full"}>
                  <RadioGroup.Item
                    value={payment_rate.id.toString()}
                    className={
                      "text-left text-sm border-gray-200 border rounded w-full h-full px-6 py-3 data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
                    }
                  >
                    {payment_rate.days} day(s) for Ksh {payment_rate.charges}
                  </RadioGroup.Item>
                </div>
              ))}
            </>
          </RadioGroup.Root>
          <p className={"text-xs text-error mt-1"}>
            {errors.payment_rate?.message}
          </p>
        </>
      ) : null}

      <label htmlFor={"phone_number"}>Phone number</label>
      <input
        {...register("phone_number")}
        placeholder={"Enter phone number"}
        type={"text"}
      />
      <p className={"text-xs text-error mt-1"}>
        {errors.phone_number?.message}
      </p>

      <div className={"flex flex-row items-center justify-end py-2 gap-3"}>
        <button
          className={"btn-outlined"}
          onClick={() => navigate(previousPage, { relative: "path" })}
        >
          Cancel
        </button>
        <button className={"btn"}>Proceed</button>
      </div>
    </form>
  );
}

export default function EditPaymentRatePage() {
  const [tab, setTab] = useState("choose-payment-rate");

  const { jobId } = useParams();

  const previousPage = "../../../../";

  const url = `api/v1/jobs/view/${jobId}/`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });
  return (
    <FormSection title={"Make Publicity Payment"} previousPage={previousPage}>
      <Tabs.Root value={tab}>
        <Tabs.Content value={"choose-payment-rate"}>
          {data !== undefined ? (
            <EditPaymentRateForm job={data.data} setTab={setTab} />
          ) : null}
        </Tabs.Content>
        <Tabs.Content value={"processing-payment"}>
          Processing payment
        </Tabs.Content>
      </Tabs.Root>
    </FormSection>
  );
}
