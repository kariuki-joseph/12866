import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { InstitutionLevel } from "../../../interfaces/api.ts";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import weteachApi from "../../../configs/weteach-api.ts";

const schema = z.object({
  name: z.string().min(5),
  phone_number: z.string(),
  primary_email: z.string().email().min(5),
  website: z.string().url(),
  image: z.unknown(),
  institution_levels: z.array(z.string()),
});

type ISchema = z.infer<typeof schema>;

export default function CreateSchoolTab(props: {
  institution_levels: InstitutionLevel[];
}) {
  const { institution_levels } = props;
  const previousPage = "/";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({
    name,
    phone_number,
    primary_email,
    image,
    website,
    institution_levels,
  }: ISchema) => {
    const owner = sessionStorage.getItem("userId");

    const institution_levels_ints = institution_levels.map((v) => parseInt(v));

    try {
      await weteachApi.post("api/v1/users/school/", {
        name,
        primary_email,
        phone_number,
        web_site: website,
        owner: owner,
        institution_level: institution_levels_ints,
      });

      navigate(previousPage, { relative: "path" });
    } catch (e) {
      alert(e.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <ToggleGroup.Root
        type={"multiple"}
        className={
          "*:px-6 *:py-3 text-sm *:rounded-3xl *:border *:border-gray-200 *:w-1/3 flex flex-row gap-3 justify-evenly "
        }
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
