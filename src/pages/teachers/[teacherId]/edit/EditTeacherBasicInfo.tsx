import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import paperPlaneTiltPlain from "/icons/paper-plane-tilt-plain.svg";
import * as RadioGroup from "@radix-ui/react-radio-group";
import weteachApi from "../../../../configs/weteach-api.ts";
import queryClient from "../../../../configs/query-client.ts";
import { useQuery } from "@tanstack/react-query";
import { Teacher } from "../../../../interfaces/api.ts";
import FormSection from "../../../../components/FormSection.tsx";

const schema = z.object({
  full_name: z.string().min(5),
  institution_level: z.string(),
  experience: z.coerce.number(),
  image: z.unknown().optional(),
});

type ISchema = z.infer<typeof schema>;

function EditTeacherBasicInfoForm({ teacher }: { teacher: Teacher }) {
  const previousPage = "/teachers";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISchema>({
    defaultValues: {
      full_name: teacher.full_name,
      experience: teacher.experience,
      institution_level: teacher.institution_level,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({
    full_name,
    institution_level,
    experience,
    image,
  }: ISchema) => {
    const userId = sessionStorage.getItem("userId");
    const formData = new FormData();

    if (image[0] !== undefined) formData.append("image", image[0]);

    formData.append("full_name", full_name);
    formData.append("experience", experience);
    formData.append("institution_level", institution_level);

    try {
      await weteachApi.patch(
        `api/v1/users/teacher/modify/${teacher.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      await queryClient.invalidateQueries({
        queryKey: [
          "/api/v1/dashboard/teachers/list/",
          `api/v1/dashboard/teacher/get/${teacher.id}/`,
        ],
      });

      navigate(previousPage, { relative: "path" });
    } catch (e) {
      alert(e.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="flex flex-row items-center justify-between  bg-gray-50 border border-gray-200 rounded-lg px-2 mb-3">
        <div className="flex flex-row items-center gap-2">
          <div className={"bg-purple-50 p-2 rounded-3xl m-3"}>
            <img src={paperPlaneTiltPlain} alt={"logo"} className={"w-8 h-8"} />
          </div>

          <div className="w-2/3 flex flex-col gap-1">
            <p className={"text-sm font-bold"}>Add institution logo</p>
            <p className={"text-xs text-gray-500"}>
              This logo will appear as the profile picture
            </p>
          </div>
        </div>
        <input
          type="file"
          {...register("image")}
          className={"w-fit"}
          accept=".png, .jpg, .jpeg"
        />
      </label>

      <label htmlFor={"full_name"}>Name</label>
      <input
        {...register("full_name")}
        placeholder={"Enter name"}
        type={"text"}
      />
      <p className={"text-xs text-error mt-1"}>{errors.full_name?.message}</p>

      <label htmlFor={"experience"}>Experience</label>
      <input
        {...register("experience")}
        placeholder={"Enter year of experience"}
        type={"number"}
      />
      <p className={"text-xs text-error mt-1"}>{errors.experience?.message}</p>

      <label htmlFor={"institution_level"}>Level of Institution</label>
      <RadioGroup.Root
        name={"institution_level"}
        defaultValue={teacher.institution_level}
        className={
          "*:px-6 *:py-3 text-sm *:rounded-3xl *:border *:border-gray-200 *:w-1/3 flex flex-row gap-3 justify-evenly "
        }
        onValueChange={(value) => setValue("institution_level", value)}
      >
        <RadioGroup.Item
          value={"ECDE"}
          className={
            "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
          }
        >
          ECDE
        </RadioGroup.Item>
        <RadioGroup.Item
          value={"Primary School"}
          className={
            "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
          }
        >
          Primary School
        </RadioGroup.Item>
        <RadioGroup.Item
          value={"High School"}
          className={
            "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
          }
        >
          High School
        </RadioGroup.Item>
      </RadioGroup.Root>
      <p className={"text-xs text-error mt-1"}>
        {errors.institution_level?.message}
      </p>

      <div className={"flex flex-row justify-end gap-3 mt-3"}>
        <button
          onClick={() => navigate(previousPage, { relative: "path" })}
          className={"btn-outlined"}
          type={"button"}
        >
          Cancel
        </button>
        <button className={"btn"}>Finish</button>
      </div>
    </form>
  );
}

export default function EditTeacherBasicInfo() {
  const { teacherId } = useParams();

  const url = `api/v1/dashboard/teacher/get/${teacherId}/`;
  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <FormSection
      title={"Edit Teacher Basic Info"}
      previousPage={`/teachers/${teacherId}`}
    >
      {data !== undefined ? (
        <EditTeacherBasicInfoForm teacher={data.data} />
      ) : null}
    </FormSection>
  );
}
