import FormSection from "../../../../../components/FormSection.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  website: z.string().url(),
  phone_number: z.string(),
});

type ISchema = z.infer<typeof schema>;
export default function ContactDetailsPage() {
  const previousPage = "../../";

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ISchema) => console.log(data);

  return (
    <FormSection title={"Edit Contact Details"} previousPage={previousPage}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"grid grid-cols-2 gap-3 mb-3"}>
          <div>
            <label htmlFor={"email"}>Email</label>
            <input {...register("email")} placeholder={"Enter email"} />
            <p className={"text-xs text-error mt-1"}>{errors.email?.message}</p>
          </div>

          <div>
            <label htmlFor={"phone_number"}>Phone Number</label>
            <input
              {...register("phone_number")}
              type={"tel"}
              placeholder={"Enter phone number"}
            />
            <p className={"text-xs text-error mt-1"}>
              {errors.phone_number?.message}
            </p>
          </div>

          <div>
            <label htmlFor={"website"}>Website</label>
            <input
              {...register("website")}
              type={"tel"}
              placeholder={"Enter website"}
            />
            <p className={"text-xs text-error mt-1"}>
              {errors.website?.message}
            </p>
          </div>
        </div>

        <div className={"flex flex-row justify-end gap-3"}>
          <button
            onClick={() => navigate(previousPage, { relative: "path" })}
            className={"btn-outlined"}
            type={"button"}
          >
            Cancel
          </button>
          <button className={"btn"}>Submit</button>
        </div>
      </form>
    </FormSection>
  );
}
