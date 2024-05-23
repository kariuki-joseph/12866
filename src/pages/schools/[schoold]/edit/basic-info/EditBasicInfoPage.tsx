import paperPlaneTiltPlain from "/icons/paper-plane-tilt-plain.svg";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSection from "../../../../../components/FormSection.tsx";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../../../configs/weteach-api.ts";
import {
  AxiosResponse,
  InstitutionLevel,
  School,
} from "../../../../../interfaces/api.ts";
import queryClient from "../../../../../configs/query-client.ts";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

const schema = z.object({
  name: z.string().min(5),
  phone_number: z.string(),
  primary_email: z.string().email().min(5),
  website: z.string().url(),
  institution_levels: z.array(z.string()),
});

type ISchema = z.infer<typeof schema>;

interface EditBasicInfoFormProps {
  school: School;
  institution_levels: InstitutionLevel[];
}

function EditBasicInfoForm(props: EditBasicInfoFormProps) {
  const { school, institution_levels } = props;
  const navigate = useNavigate();

  const previousPage = "../../";

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ISchema>({
    defaultValues: {
      name: school.name,
      phone_number: school.phone_number,
      primary_email: school.primary_email,
      website: school.web_site,
      institution_levels: school.institution_level.map((v) => v.id.toString()),
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({
    name,
    phone_number,
    primary_email,
    website,
    institution_levels,
  }: ISchema) => {
    const institution_levels_ints = institution_levels.map((v) => parseInt(v));

    try {
      await weteachApi.patch(`api/v1/dashboard/school/modify/${school.id}/`, {
        name,
        primary_email,
        phone_number,
        web_site: website,
        institution_level: institution_levels_ints,
      });

      await queryClient.invalidateQueries({
        queryKey: [`api/v1/dashboard/school/get/${school.id}/`],
      });
      navigate(previousPage, { relative: "path" });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();

      const file = document.getElementById("file");

      // @ts-ignore
      const image = file.files[0];

      if (image !== undefined) {
        formData.append("image", image);

        await weteachApi.patch(
          `api/v1/dashboard/school/modify/${school.id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        await queryClient.invalidateQueries({
          queryKey: [`api/v1/dashboard/school/get/${school.id}/`],
        });
      }
    } catch (e) {
      console.log(e.response.data);
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
          id={"file"}
          className={"w-fit"}
          accept=".png, .jpg, .jpeg"
          onChange={handleImageUpload}
        />
      </label>

      <label htmlFor={"name"}>Name</label>
      <input {...register("name")} placeholder={"Enter name"} type={"text"} />
      <p className={"text-xs text-error mt-1"}>{errors.name?.message}</p>

      <label htmlFor={"primary_email"}>Email</label>
      <input {...register("primary_email")} placeholder={"Enter email"} />
      <p className={"text-xs text-error mt-1"}>
        {errors.primary_email?.message}
      </p>

      <label htmlFor={"phone_number"}>Phone number</label>
      <input
        {...register("phone_number")}
        placeholder={"Enter phone number"}
        type={"text"}
      />
      <p className={"text-xs text-error mt-1"}>
        {errors.phone_number?.message}
      </p>

      <label htmlFor={"website"}>Website</label>
      <input
        {...register("website")}
        placeholder={"Enter website"}
        type={"text"}
      />
      <p className={"text-xs text-error mt-1"}>{errors.website?.message}</p>

      <label htmlFor={"institution_levels"}>Institution level</label>
      <ToggleGroup.Root
        type={"multiple"}
        className={
          "*:px-6 *:py-3 text-sm *:rounded-3xl *:border *:border-gray-200 *:w-1/3 flex flex-row gap-3 justify-evenly "
        }
        defaultValue={getValues("institution_levels")}
        onValueChange={(values) => setValue("institution_levels", values)}
      >
        {institution_levels.map((institution_level) => (
          <ToggleGroup.Item
            key={institution_level.id}
            value={institution_level.id.toString()}
            className={
              "data-[state=on]:text-primary  data-[state=on]:bg-[#FBEFFF] data-[state=checked]:border-primary"
            }
          >
            {institution_level.name}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
      <p className={"text-xs text-error mt-1"}>
        {errors.institution_levels?.message}
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

export default function EditBasicInfoPage() {
  const { schoolId } = useParams();

  const previousPage = "../../";

  const url = `api/v1/dashboard/school/get/${schoolId}/`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  const url2 = `api/v1/subjects/institution/levels/`;
  const { data: data2 } = useQuery<AxiosResponse<InstitutionLevel[]>>({
    queryKey: [url2],
    queryFn: () => weteachApi.get(url2),
  });

  return (
    <FormSection title={"Edit School Basic Info"} previousPage={previousPage}>
      {data !== undefined && data2 !== undefined ? (
        <EditBasicInfoForm school={data.data} institution_levels={data2.data} />
      ) : null}
    </FormSection>
  );
}
