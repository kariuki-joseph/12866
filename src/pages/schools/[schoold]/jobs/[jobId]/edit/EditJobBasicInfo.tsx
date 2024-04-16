import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import FormSection from "../../../../../../components/FormSection.tsx";
import weteachApi from "../../../../../../configs/weteach-api.ts";
import { useQuery } from "@tanstack/react-query";
import { Job } from "../../../../../../interfaces/api.ts";

const schema = z.object({
  title: z.string().min(5),
  deadline: z.coerce.date(),
});

type ISchema = z.infer<typeof schema>;

function EditJobBasicInfoForm({ job }: { job: Job }) {
  const navigate = useNavigate();

  const previousPage = "../../../../";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchema>({
    defaultValues: {
      title: job.title,
      deadline: DateTime.fromISO(job.deadline).toJSDate(),
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ISchema) => {
    await weteachApi.patch(`api/v1/jobs/modify/${job.id}/`, {
      title: data.title,
      deadline: DateTime.fromJSDate(data.deadline),
    });

    navigate(previousPage, { relative: "path" });
  };
  return (
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
  );
}

export default function EditJobBasicInfo() {
  const { jobId } = useParams();

  const previousPage = "../../../../";
  const url = `api/v1/jobs/view/${jobId}/`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <FormSection title={"Edit Job basic info"} previousPage={previousPage}>
      {data !== undefined ? <EditJobBasicInfoForm job={data.data} /> : null}
    </FormSection>
  );
}
