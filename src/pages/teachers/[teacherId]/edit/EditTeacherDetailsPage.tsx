import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../../configs/weteach-api.ts";
import FormSection from "../../../../components/FormSection.tsx";
import { AxiosResponse, Subject, Teacher } from "../../../../interfaces/api.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import queryClient from "../../../../configs/query-client.ts";

const schema = z.object({
  subjects: z.array(z.string()),
});

type ISchema = z.infer<typeof schema>;

function EditTeacherDetailsForm(props: { teacher: Teacher }) {
  const { teacher } = props;
  const previousPage = `../../`;

  const url = `api/v1/subjects/`;

  const { data } = useQuery<AxiosResponse<Subject[]>>({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  const navigate = useNavigate();

  const { watch, register, handleSubmit } = useForm<ISchema>({
    defaultValues: {
      subjects: teacher.qualifications.map((d) => d.id.toString()),
    },
    resolver: zodResolver(schema),
  });

  const subjects = watch("subjects");

  const onSubmit = async (data: ISchema) => {
    const qualifications = data.subjects.map((d) => parseInt(d));

    try {
      await weteachApi.patch(`api/v1/dashboard/teacher/modify/${teacher.id}/`, {
        qualifications,
      });

      await queryClient.invalidateQueries({
        queryKey: [`api/v1/dashboard/teacher/get/${teacher.id}/`],
      });

      navigate(previousPage, { relative: "path" });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className={"text-sm text-gray-500 mb-3"}>Subjects & Skills</p>

      {data !== undefined ? (
        <div
          className={
            "*:px-6 *:py-3 text-sm *:rounded-3xl *:border *:border-gray-200 grid grid-cols-4 gap-3"
          }
        >
          {data.data.map(({ id, name }) => (
            <label
              htmlFor={id.toString()}
              key={id}
              className={`${subjects.findIndex((d) => d === id.toString()) >= 0 ? ` text-primary  bg-[#FBEFFF] !border-primary ` : null} text-center`}
            >
              <span>{name}</span>
              <input
                type="checkbox"
                value={id}
                id={id.toString()}
                className={"absolute bottom-0 invisible"}
                {...register("subjects")}
              />
            </label>
          ))}
        </div>
      ) : null}

      <div className={"flex flex-row justify-end gap-3 mt-3"}>
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
  );
}

export default function EditTeacherDetailsPage() {
  const { teacherId } = useParams();

  const previousPage = "../../";

  const url = `api/v1/dashboard/teacher/get/${teacherId}/`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <FormSection title={"Edit Teacher Details"} previousPage={previousPage}>
      {data !== undefined ? (
        <EditTeacherDetailsForm teacher={data.data} />
      ) : null}
    </FormSection>
  );
}
