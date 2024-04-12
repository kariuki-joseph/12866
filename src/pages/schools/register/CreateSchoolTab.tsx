import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import paperPlaneTiltPlain from "/icons/paper-plane-tilt-plain.svg";
import weteachApi from "../../../configs/weteach-api.ts";

const schema = z.object({
  name: z.string().min(5),
  phone_number: z.string(),
  primary_email: z.string().email().min(5),
  image: z.unknown(),
});

type ISchema = z.infer<typeof schema>;

export default function CreateSchoolTab() {
  const previousPage = "/";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({
    name,
    phone_number,
    primary_email,
    image,
  }: ISchema) => {
    const userId = sessionStorage.getItem("userId");
    const formData = new FormData();

    formData.append("image", image[0]);

    formData.append("name", name);
    formData.append("primary_email", primary_email);
    formData.append("phone_number", phone_number);
    formData.append("owner", userId);

    try {
      await weteachApi.post("api/v1/users/school/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
          required
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
