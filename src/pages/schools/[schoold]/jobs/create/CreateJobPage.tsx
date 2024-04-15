import FormSection from "../../../../../components/FormSection.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import weteachApi from "../../../../../configs/weteach-api.ts";
import { DateTime } from "luxon";

const schema = z.object({
  title: z.string().min(5),
  deadline: z.coerce.date(),
});

type ISchema = z.infer<typeof schema>;

export default function CreateJobPage() {
  const { schoolId } = useParams();
  const navigate = useNavigate();

  const previousPage = "../../";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ISchema) => {
    await weteachApi.post(`api/v1/jobs/owner/create/`, {
      school: schoolId,
      title: data.title,
      deadline: DateTime.fromJSDate(data.deadline),
    });

    navigate(previousPage, { relative: "path" });
  };
  return (
    <FormSection title={"Post New Job"} previousPage={previousPage}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={"title"}>Job Title</label>
        <input
          {...register("title")}
          placeholder={"Enter job title"}
          type={"text"}
        />
        <p className={"text-xs text-error mt-1"}>{errors.title?.message}</p>

        <label htmlFor={"deadline"}>Deadline</label>
        <input
          {...register("deadline")}
          placeholder={"Enter deadline"}
          type={"date"}
        />
        <p className={"text-xs text-error mt-1"}>{errors.deadline?.message}</p>

        <div className={"flex flex-row items-center justify-end py-2 gap-3"}>
          <button
            className={"btn-outlined"}
            onClick={() => navigate(previousPage, { relative: "path" })}
          >
            Cancel
          </button>
          <button className={"btn"}>Submit</button>
        </div>
      </form>
    </FormSection>
  );
}
