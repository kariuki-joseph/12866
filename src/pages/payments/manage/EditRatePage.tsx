import FormSection from "../../../components/FormSection.tsx";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../configs/weteach-api.ts";
import { useNavigate, useParams } from "react-router-dom";
import { PaymentRate } from "../../../interfaces/api.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import queryClient from "../../../configs/query-client.ts";

const schema = z.object({
  charges: z.coerce.number().min(1),
  days: z.coerce.number().min(1),
});

type ISchema = z.infer<typeof schema>;

export function EditRateForm(props: { rate: PaymentRate }) {
  const navigate = useNavigate();
  const { rate } = props;

  const previousPage = "../../";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchema>({
    defaultValues: {
      charges: rate.charges,
      days: rate.days,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ISchema) => {
    try {
      await weteachApi.patch(`api/v1/payments/rates/modify/${rate.id}/`, data);

      await queryClient.invalidateQueries({
        queryKey: [`api/v1/payments/rates/${rate.id}`],
      });

      await queryClient.invalidateQueries({
        queryKey: ["api/v1/payments/rates/"],
      });

      navigate(previousPage, { relative: "path" });
    } catch (e) {
      alert(e.response.data);
    }
  };

  return (
    <FormSection title={"Edit Payment Rate"} previousPage={previousPage}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={"days"}>Days</label>
        <input
          {...register("days")}
          placeholder={"Enter days"}
          type={"number"}
        />
        <p className={"text-xs text-error mt-1"}>{errors.days?.message}</p>

        <label htmlFor={"charges"}>Charges</label>
        <input
          {...register("charges")}
          placeholder={"Enter charges"}
          type={"number"}
        />
        <p className={"text-xs text-error mt-1"}>{errors.charges?.message}</p>

        <div
          className={"flex flex-row items-center justify-end py-2 gap-3 mt-3"}
        >
          <button className={"btn-outlined"}>Update</button>
        </div>
      </form>
    </FormSection>
  );
}
export default function EditRatePage() {
  const params = useParams();
  const url = `api/v1/payments/rates/${params.rateId}`;

  const { data, isLoading } = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const { data } = await weteachApi.get("api/v1/payments/rates/");

      const rates = data.filter(
        (rate) => rate.id === parseInt(params.rateId),
      ) as PaymentRate[];

      return rates[0];
    },
  });

  return <>{data !== undefined ? <EditRateForm rate={data} /> : null}</>;
}
