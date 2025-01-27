import { z } from "zod";
import FormSection from "../../../../../../components/FormSection.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../../../../configs/weteach-api.ts";
import {
  AxiosResponse,
  Job,
  TeacherRequirement,
} from "../../../../../../interfaces/api.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import optionalMinLength from "../../../../../../utils/optional-min-length.ts";

const schema = z.object({
  teacher_requirements: z.array(z.string()).min(1, "Required"),
  duties_and_responsibilities: z
    .string()
    .refine(optionalMinLength, "String should not be less than (5) characters"),
  minimum_requirements: z
    .string()
    .refine(optionalMinLength, "String should not be less than (5) characters"),
  additional_requirements: z
    .string()
    .refine(optionalMinLength, "String should not be less than (5) characters"),
  how_to_apply: z
    .string()
    .refine(optionalMinLength, "String should not be less than (5) characters"),
});

type ISchema = z.infer<typeof schema>;

function EditJobDetailsForm({ job }: { job: Job }) {
  const navigate = useNavigate();

  const previousPage = "../../../../";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ISchema>({
    defaultValues: {
      teacher_requirements: job.teacher_requirements.map((d) =>
        d.id.toString(),
      ),
      duties_and_responsibilities: job.duties_and_responsibilities ?? "",
      additional_requirements: job.additional_requirements ?? "",
      minimum_requirements: job.minimum_requirements ?? "",
      how_to_apply: job.how_to_apply ?? "",
    },
    resolver: zodResolver(schema),
  });

  const teacherRequirementsUrl = `api/v1/subjects/`;
  const teacherRequirementsQuery = useQuery<
    AxiosResponse<TeacherRequirement[]>
  >({
    queryKey: [teacherRequirementsUrl],
    queryFn: () => weteachApi.get(teacherRequirementsUrl),
  });

  const onSubmit = async (data: ISchema) => {
    await weteachApi.patch(`api/v1/jobs/modify/${job.id}/`, {
      teacher_requirements: data.teacher_requirements.map((val) =>
        parseInt(val),
      ),
      duties_and_responsibilities: data.duties_and_responsibilities,
      minimum_requirements: data.minimum_requirements,
      how_to_apply: data.how_to_apply,
      additional_requirements: data.additional_requirements,
    });

    navigate(previousPage, { relative: "path" });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Subjects & Skills</label>
      {teacherRequirementsQuery.data !== undefined ? (
        <div
          className={
            "*:px-6 *:py-3 text-sm *:rounded-3xl *:border *:border-gray-200 grid grid-cols-4 gap-3"
          }
        >
          {teacherRequirementsQuery.data.data.map(({ id, name }) => (
            <label
              htmlFor={id.toString()}
              key={id}
              className={`${watch("teacher_requirements").findIndex((d) => d === id.toString()) >= 0 ? ` text-primary  bg-[#FBEFFF] !border-primary ` : null} text-center`}
            >
              <span>{name}</span>
              <input
                type="checkbox"
                value={id}
                id={id.toString()}
                className={"absolute bottom-0 invisible"}
                {...register("teacher_requirements")}
              />
            </label>
          ))}
        </div>
      ) : null}
      <p className={"text-xs text-error mt-1"}>
        {errors.teacher_requirements?.message}
      </p>

      <label htmlFor={"duties_and_responsibilities"}>
        Duties & Responsibilities
      </label>
      <textarea
        {...register("duties_and_responsibilities")}
        placeholder={"Enter duties and responsible"}
        rows={4}
      />
      <p className={"text-xs text-error mt-1"}>
        {errors.duties_and_responsibilities?.message}
      </p>

      <label htmlFor={"minimum_requirements"}>Minimum Requirements</label>
      <textarea
        {...register("minimum_requirements")}
        placeholder={"Enter minimum requirements"}
        rows={4}
      />
      <p className={"text-xs text-error mt-1"}>
        {errors.minimum_requirements?.message}
      </p>

      <label htmlFor={"additional_requirements"}>Additional Requirements</label>
      <textarea
        {...register("additional_requirements")}
        placeholder={"Enter additional requirements"}
        rows={4}
      />
      <p className={"text-xs text-error mt-1"}>
        {errors.additional_requirements?.message}
      </p>

      <label htmlFor={"how_to_apply"}>How to apply</label>
      <textarea
        {...register("how_to_apply")}
        placeholder={"Enter how to apply"}
        rows={4}
      />
      <p className={"text-xs text-error mt-1"}>
        {errors.how_to_apply?.message}
      </p>

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

export default function EditJobDetails() {
  const { jobId } = useParams();

  const previousPage = "../../../../";

  const url = `api/v1/jobs/view/${jobId}/`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <FormSection title={"Edit Job Details"} previousPage={previousPage}>
      {data !== undefined ? <EditJobDetailsForm job={data.data} /> : null}
    </FormSection>
  );
}
