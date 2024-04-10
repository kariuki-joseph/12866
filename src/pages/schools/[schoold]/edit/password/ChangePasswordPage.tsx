import FormSection from "../../../../../components/FormSection.tsx";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
export default function ChangePasswordPage() {
  const previousPage = "../../";

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ISchema) => {
    // if (data.new_password === data.confirm_password) {
    //   //submit
    // } else {
    //   setPasswordMatchError("Passwords do not match");
    // }
  };

  return (
    <FormSection title={"Change Password"} previousPage={previousPage}>
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
    </FormSection>
  );
}
