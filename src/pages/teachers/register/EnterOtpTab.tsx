import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import React from "react";
import weteachApi from "../../../configs/weteach-api.ts";

const schema = z.object({
  otp: z.coerce.number(),
});

type ISchema = z.infer<typeof schema>;

interface EnterOtpTabProps {
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function EnterOtpTab(props: EnterOtpTabProps) {
  const { setTab } = props;
  const previousPage = "/teachers";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ISchema) => {
    try {
      await weteachApi.post(`api/v1/users/otp/confirm/`, {
        otp_code: data.otp,
      });

      sessionStorage.setItem("otp", data.otp);

      setTab("enter-password-tab");
    } catch (e) {
      alert("invalid otp");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className={"text-gray-500 text-sm"}>
        A short PIN was sent to your email. Check your inbox and enter the PIN
        to verify your email
      </p>
      <label htmlFor={"otp"}>Otp</label>
      <input {...register("otp")} placeholder={"Enter otp"} type={"number"} />
      <p className={"text-xs text-error mt-1"}>{errors.otp?.message}</p>

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
