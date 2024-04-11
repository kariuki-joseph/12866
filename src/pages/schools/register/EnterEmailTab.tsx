import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import React from "react";

const schema = z.object({
  email: z.string().email().min(5),
});

type ISchema = z.infer<typeof schema>;

interface EnterEmailTabProps {
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function EnterEmailTab(props: EnterEmailTabProps) {
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
    setTab("enter-otp-tab");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor={"email"}>Email</label>
      <input
        {...register("email")}
        placeholder={"Enter email"}
        type={"email"}
      />
      <p className={"text-xs text-error mt-1"}>{errors.email?.message}</p>

      <div className={"flex flex-row justify-end gap-3 mt-3"}>
        <button
          onClick={() => navigate(previousPage, { relative: "path" })}
          className={"btn-outlined"}
          type={"button"}
        >
          Cancel
        </button>
        <button className={"btn"}>Verify Email</button>
      </div>
    </form>
  );
}
