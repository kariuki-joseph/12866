import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../../configs/weteach-api.ts";
import FormSection from "../../../../components/FormSection.tsx";
import { Teacher } from "../../../../interfaces/api.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import queryClient from "../../../../configs/query-client.ts";

const schema = z.object({
  subjects: z.string({
    invalid_type_error: "Subjects is required",
  }),
  additional_skills: z.string({
    invalid_type_error: "Additional skills is required",
  }),
  accommodation: z.string({
    invalid_type_error: "Accommodation is required",
  }),
  gender: z.string({
    invalid_type_error: "Gender is required",
  }),
});

type ISchema = z.infer<typeof schema>;

function EditTeacherDetailsForm(props: { teacher: Teacher }) {
  const { teacher } = props;
  const previousPage = `teachers/${teacher.id}`;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISchema>({
    // defaultValues: {
    //   institution_level: teacher.institution_level,
    //   accommodation: teacher.accommodation,
    //   gender: teacher.gender,
    // },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ISchema) => {
    try {
      await weteachApi.patch(
        `api/v1/dashboard/school/modify/${teacher.id}/`,
        data,
      );

      await queryClient.invalidateQueries({
        queryKey: [`api/v1/dashboard/school/get/${teacher.id}/`],
      });

      navigate(previousPage, { relative: "path" });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <EditTeacherDetailsForm school={data.data} />
      ) : null}
    </FormSection>
  );
}
