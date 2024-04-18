import FormSection from "../../../components/FormSection.tsx";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import weteachApi from "../../../configs/weteach-api.ts";
import queryClient from "../../../configs/query-client.ts";

const schema = z.object({
  charges: z.coerce.number().min(1),
  days: z.coerce.number().min(1),
});

type ISchema = z.infer<typeof schema>;

export default function CreatePaymentPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ISchema) => {
    await weteachApi.post(`/api/v1/payments/rates/`, data);

    await queryClient.invalidateQueries({
      queryKey: [`api/v1/payments/rates/`],
    });

    navigate("/payments");
  };
  return (
    <FormSection title={"Create Payment Package"} previousPage={"/payments"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={"days"}>Days</label>
        <input
          {...register("days")}
          placeholder={"Enter days"}
          type={"number"}
        />

        <label htmlFor={"charges"}>Amount</label>
        <input
          {...register("charges")}
          placeholder={"Enter amount"}
          type={"number"}
        />

        <div
          className={"flex flex-row items-center justify-end py-2 gap-3 mt-3"}
        >
          <button
            className={"btn-outlined"}
            onClick={() => navigate("payments")}
          >
            Cancel
          </button>
          <button className={"btn"}>Submit</button>
        </div>
      </form>
    </FormSection>
  );
}
