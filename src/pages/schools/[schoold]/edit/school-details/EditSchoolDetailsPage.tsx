import FormSection from "../../../../../components/FormSection.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { School } from "../../../../../interfaces/api.ts";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../../../configs/weteach-api.ts";
import * as RadioGroup from "@radix-ui/react-radio-group";
import queryClient from "../../../../../configs/query-client.ts";

const schema = z.object({
  about: z.string({
    invalid_type_error: "About is required",
  }),
  accommodation: z.string({
    invalid_type_error: "Accommodation is required",
  }),
  gender: z.string({
    invalid_type_error: "Gender is required",
  }),
});

type ISchema = z.infer<typeof schema>;

interface EditSchoolDetailsFormProps {
  school: School;
}

function EditSchoolDetailsForm(props: EditSchoolDetailsFormProps) {
  const { school } = props;
  const previousPage = "../../";

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISchema>({
    defaultValues: {
      about: school.about,
      accommodation: school.accommodation,
      gender: school.gender,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ISchema) => {
    try {
      await weteachApi.patch(
        `api/v1/dashboard/school/modify/${school.id}/`,
        data,
      );

      await queryClient.invalidateQueries({
        queryKey: [`api/v1/dashboard/school/get/${school.id}/`],
      });

      navigate(previousPage, { relative: "path" });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor={"about"}>About</label>
      <textarea
        {...register("about")}
        placeholder={"Enter school description"}
        rows={5}
      />
      <p className={"text-xs text-error mt-1"}>{errors.about?.message}</p>

      <label htmlFor={"accommodation"}>Accommodation</label>
      <RadioGroup.Root
        name={"accommodation"}
        defaultValue={school.accommodation}
        className={
          "*:px-6 *:py-3 text-sm *:rounded-3xl *:border *:border-gray-200 *:w-1/3 flex flex-row gap-3 justify-evenly "
        }
        onValueChange={(value) => setValue("accommodation", value)}
      >
        <RadioGroup.Item
          value={"Day School"}
          className={
            "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
          }
        >
          Day School
        </RadioGroup.Item>
        <RadioGroup.Item
          value={"Boarding School"}
          className={
            "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
          }
        >
          Boarding School
        </RadioGroup.Item>
        <RadioGroup.Item
          value={"Mixed"}
          className={
            "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
          }
        >
          Mixed
        </RadioGroup.Item>
      </RadioGroup.Root>
      <p className={"text-xs text-error mt-1"}>
        {errors.accommodation?.message}
      </p>

      <label htmlFor={"gender"}>Gender</label>
      <RadioGroup.Root
        name={"gender"}
        defaultValue={school.gender}
        className={
          "*:px-6 *:py-3 text-sm *:rounded-3xl *:border *:border-gray-200 *:w-1/3 flex flex-row gap-3 justify-evenly "
        }
        onValueChange={(value) => setValue("gender", value)}
      >
        <RadioGroup.Item
          value={"Mixed"}
          className={
            "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
          }
        >
          Mixed
        </RadioGroup.Item>
        <RadioGroup.Item
          value={"Girls"}
          className={
            "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
          }
        >
          Girls School
        </RadioGroup.Item>
        <RadioGroup.Item
          value={"Boys"}
          className={
            "data-[state=checked]:text-primary  data-[state=checked]:bg-[#FBEFFF] data-[state=checked]:border-primary"
          }
        >
          Boys School
        </RadioGroup.Item>
      </RadioGroup.Root>
      <p className={"text-xs text-error mt-1"}>{errors.gender?.message}</p>

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

export default function EditSchoolDetailsPage() {
  const { schoolId } = useParams();

  const previousPage = "../../";

  const url = `api/v1/dashboard/school/get/${schoolId}/`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <FormSection title={"Edit School Details"} previousPage={previousPage}>
      {data !== undefined ? <EditSchoolDetailsForm school={data.data} /> : null}
    </FormSection>
  );
}
