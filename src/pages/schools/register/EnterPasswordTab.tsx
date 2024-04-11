import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import React from "react";

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

interface EnterPasswordTabProps {
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function EnterPasswordTab(props: EnterPasswordTabProps) {
  const { setTab } = props;
  const previousPage = "/";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ISchema, e: any) => {
    e.preventDefault();
    setTab("create-school-tab");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor={"new_password"}>Password</label>
      <input
        {...register("new_password")}
        placeholder={"Enter new password"}
        type={"password"}
      />
      <p className={"text-xs text-error mt-1"}>
        {errors.new_password?.message}
      </p>

      <label htmlFor={"confirm_password"}>Confirm Password</label>
      <input
        {...register("confirm_password")}
        placeholder={"Confirm password"}
        type={"password"}
      />
      <p className={"text-xs text-error mt-1"}>
        {errors.confirm_password?.message}
      </p>

      <div className={"flex flex-row justify-end gap-3 mt-3"}>
        <button
          onClick={() => navigate(previousPage, { relative: "path" })}
          className={"btn-outlined"}
          type={"button"}
        >
          Cancel
        </button>
        <button className={"btn"}>Proceed</button>
      </div>
    </form>
  );
}
