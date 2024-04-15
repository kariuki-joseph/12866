import { z } from "zod";
import FormSection from "../../../../../../components/FormSection.tsx";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../../../../configs/weteach-api.ts";
import {
  AxiosResponse,
  PaymentRate,
} from "../../../../../../interfaces/api.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as RadioGroup from "@radix-ui/react-radio-group";

const schema = z.object({
  payment_rate: z.string().optional(),
  teacher_requirements: z.string().optional(),
  duties_and_responsibilities: z.string().optional(),
  minimum_requirements: z.string().optional(),
  additional_requirements: z.string().optional(),
  how_to_apply: z.string().optional(),
  about: z.string().optional(),
});

type ISchema = z.infer<typeof schema>;

export default function EditJobDetails() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const paymentRateUrl = `/api/v1/payments/rates/`;
  const paymentQuery = useQuery<AxiosResponse<PaymentRate[]>>({
    queryKey: [paymentRateUrl],
    queryFn: () => weteachApi.get(paymentRateUrl),
  });

  return (
    <FormSection title={"Edit Job Details"} previousPage={"../../../../"}>
      <label>Publicity Package</label>
      <RadioGroup.Root
        name={"gender"}
        className={"flex flex-col gap-3 justify-evenly "}
        onValueChange={(value) => setValue("payment_rate", value)}
      >
        {paymentQuery.data !== undefined ? (
          <>
            {paymentQuery.data.data.map((payment_rate) => (
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
        ) : null}
      </RadioGroup.Root>
    </FormSection>
  );
}
