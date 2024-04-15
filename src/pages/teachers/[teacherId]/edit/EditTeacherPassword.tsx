import FormSection from "../../../../../components/FormSection.tsx";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import weteachApi from "../../../../../configs/weteach-api.ts";
import { Teacher } from "../../../../../interfaces/api.ts";

const schema = z
  .object({
    new_password: z.string(),
    confirm_password: z.string(),
  })
  .refine(
    ({ new_password, confirm_password }) => new_password === confirm_password,
    {
      message: "Passwords do not match",
      path: ["confirm_password"],
    },
  );

type ISchema = z.infer<typeof schema>;

function ChangePasswordForm({ teacher }: { teacher: Teacher }) {
  const previousPage = "../../";

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ISchema) => {
    await weteachApi.post("api/v1/dashboard/user/change/password/", {
      user_id: teacher.user.id,
      password: data.new_password,
    });

    navigate(previousPage, { relative: "path" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={"grid grid-cols-2 gap-3 mb-3"}>
        <div>
          <label htmlFor={"new_password"}>New Password</label>
          <input
            {...register("new_password")}
            placeholder={"Enter new password"}
            type={"password"}
          />
          <p className={"text-xs text-error mt-1"}>
            {errors.new_password?.message}
          </p>
        </div>

        <div>
          <label htmlFor={"confirm_password"}>Confirm Password</label>
          <input
            {...register("confirm_password")}
            placeholder={"Confirm password"}
            type={"password"}
          />
          <p className={"text-xs text-error mt-1"}>
            {errors.confirm_password?.message}
          </p>
        </div>
      </div>

      <div className={"flex flex-row justify-end gap-3"}>
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

export default function EditTeacherPasswordPage() {
  const { teacherId } = useParams();

  const previousPage = "../../";

  const url = `api/v1/dashboard/teacher/get/${teacherId}/`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => weteachApi.get(url),
  });

  return (
    <FormSection title={"Edit Teacher Password"} previousPage={previousPage}>
      {data !== undefined ? <ChangePasswordForm teacher={data.data} /> : null}
    </FormSection>
  );
}
