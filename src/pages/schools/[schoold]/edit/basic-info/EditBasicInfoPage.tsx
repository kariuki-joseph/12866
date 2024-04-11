import paperPlaneTiltPlain from "/icons/paper-plane-tilt-plain.svg";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSection from "../../../../../components/FormSection.tsx";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../../../configs/weteach-api.ts";
import { School } from "../../../../../interfaces/api.ts";
import queryClient from "../../../../../configs/query-client.ts";

const schema = z.object({
  name: z.string().min(5).default("sfdgafdg"),
  phone_number: z.string(),
  primary_email: z.string().email().min(5),
  image: z.unknown(),
});

type ISchema = z.infer<typeof schema>;

interface EditBasicInfoFormProps {
  school: School;
}

function EditBasicInfoForm(props: EditBasicInfoFormProps) {
  const { school } = props;
  const navigate = useNavigate();

  const previousPage = "../../";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchema>({
    defaultValues: {
      name: school.name,
      phone_number: school.phone_number,
      primary_email: school.primary_email,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({
    name,
    phone_number,
    primary_email,
    image,
  }: ISchema) => {
    const formData = new FormData();

    if (image[0] !== undefined) formData.append("image", image[0]);

    formData.append("name", name);
    formData.append("primary_email", primary_email);
    formData.append("phone_number", phone_number);

    try {
      await weteachApi.patch(
        `api/v1/dashboard/school/modify/${school.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: [`api/v1/dashboard/school/get/${school.id}/`],
      });
      navigate(previousPage, { relative: "path" });
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
          {...register("image")}
          className={"w-fit"}
          accept=".png, .jpg, .jpeg"
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

      <div className={"flex flex-row items-center justify-end py-2 gap-3"}>
        <button
          className={"btn-outlined"}
          to={previousPage}
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

  return (
    <FormSection title={"Edit School Basic Info"} previousPage={previousPage}>
      {data !== undefined ? <EditBasicInfoForm school={data.data} /> : null}
    </FormSection>
  );
}
