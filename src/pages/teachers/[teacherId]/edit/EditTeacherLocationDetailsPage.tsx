import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { z } from "zod";
import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef } from "react";
import { AxiosResponse, County, Teacher } from "../../../../interfaces/api.ts";
import weteachApi from "../../../../configs/weteach-api.ts";
import queryClient from "../../../../configs/query-client.ts";
import FormSection from "../../../../components/FormSection.tsx";

const schema = z.object({
  countyId: z
    .string({
      invalid_type_error: "County is required",
    })
    .nullable(),
  subCountyId: z
    .string({
      invalid_type_error: "Sub County is required",
    })
    .nullable(),
  formated_address: z.string({
    invalid_type_error: "Address is required",
  }),
});

type ISchema = z.infer<typeof schema>;

const SelectCounty = forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<ISchema>>
>(({ onChange, onBlur, name, label }, ref) => {
  const url = `api/v1/users/counties/`;

  const { data } = useQuery<AxiosResponse<County[]>>({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <>
      <label htmlFor={name}>{label}</label>
      {data !== undefined ? (
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
          {data.data.map((county) => (
            <option value={county.id} key={county.id}>
              {county.name}
            </option>
          ))}
        </select>
      ) : null}
    </>
  );
});

const SelectSubCounty = forwardRef<
  HTMLSelectElement,
  { label: string; countyId: string } & ReturnType<UseFormRegister<ISchema>>
>(({ onChange, onBlur, name, label, countyId }, ref) => {
  const url = `api/v1/users/sub-scounties/list/?county__id=${countyId}`;

  const { data } = useQuery<AxiosResponse<County[]>>({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <>
      <label htmlFor={name}>{label}</label>

      {data !== undefined ? (
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
          {data.data.map((county) => (
            <option value={county.id} key={county.id}>
              {county.name}
            </option>
          ))}
        </select>
      ) : null}
    </>
  );
});

function EditLocationDetailsForm(props: { teacher: Teacher }) {
  const { teacher } = props;

  const navigate = useNavigate();
  const previousPage = "../../";

  const countyId =
    teacher.county !== null ? teacher.county.id.toString() : null;
  const subCountyId =
    teacher.sub_county !== null ? teacher.sub_county.id.toString() : null;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ISchema>({
    defaultValues: {
      countyId: countyId,
      subCountyId: subCountyId,
      formated_address: teacher.formated_address,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ISchema) => {
    try {
      await weteachApi.patch(`api/v1/dashboard/teacher/modify/${teacher.id}/`, {
        county: parseInt(data.countyId),
        sub_county: parseInt(data.subCountyId),
        formated_address: data.formated_address,
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
      <SelectCounty label="county" {...register("countyId")} />

      <SelectSubCounty
        label="sub county"
        {...register("subCountyId")}
        countyId={watch("countyId")}
      />

      <label htmlFor={"formated_address"}>Address</label>
      <input
        {...register("formated_address")}
        placeholder={"Enter address"}
        type={"text"}
      />
      <p className={"text-xs text-error mt-1"}>
        {errors.formated_address?.message}
      </p>

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

export default function EditTeacherLocationDetails() {
  const { teacherId } = useParams();

  const url = `api/v1/dashboard/teacher/get/${teacherId}/`;
  const { data } = useQuery<AxiosResponse<Teacher>>({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <FormSection title={"Edit Location Details"} previousPage={"../.."}>
      {data !== undefined ? (
        <EditLocationDetailsForm teacher={data.data} />
      ) : null}
    </FormSection>
  );
}
