import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import {
  AxiosResponse,
  Job,
  PaymentRate,
} from "../../../../../../interfaces/api.ts";
import weteachApi from "../../../../../../configs/weteach-api.ts";
import FormSection from "../../../../../../components/FormSection.tsx";
import check_circle from "/icons/check_circle.svg";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import { Dispatch, SetStateAction, useState } from "react";

const schema = z.object({
  payment_rate: z.string(),
  phone_number: z.string().startsWith("254").length(12),
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
    const res = await weteachApi.post("api/v1/payments/mpesa/post/make/", {
      owner: job.school.owner.id,
      job: job.id,
      rate: data.payment_rate,
      phone_number: data.phone_number,
    });

    const { payment } = res.data;

    setTab("processing-payment");
    sessionStorage.setItem("paymentId", payment.id);
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

function ProcessingPayment() {
  const paymentId = sessionStorage.getItem("paymentId");

  const navigate = useNavigate();
  const [isPaid, setIsPaid] = useState(false);
  const url = `api/v1/payments/mpesa/confirm/${paymentId}/`;

  useQuery({
    queryKey: [url],
    queryFn: async () => {
      const payment = await weteachApi.get(url);

      if (payment.data.payment.payment_status === "Paid") {
        setIsPaid(true);

        setTimeout(() => {
          navigate("../../../../", {
            relative: "path",
          });
        }, 300);
      }

      return payment;
    },
    refetchInterval: 3000,
  });

  return (
    <>
      {isPaid ? (
        <div>
          <img
            src={check_circle}
            alt={"checked"}
            className={"w-32 h-32 m-auto"}
          />
          <p className={"text-center text-gray-500 mb-3"}>
            Payment successful!
          </p>
        </div>
      ) : (
        <div>
          <div role="status" className={"flex flex-row justify-center mb-6"}>
            <svg
              aria-hidden="true"
              className="w-28 h-28 text-gray-200 animate-spin dark:text-gray-100 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
          <p className={"text-center text-gray-500 mb-3"}>
            Processing payment...
          </p>
        </div>
      )}
    </>
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
          <ProcessingPayment />
        </Tabs.Content>
      </Tabs.Root>
    </FormSection>
  );
}
