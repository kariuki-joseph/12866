import { Dispatch, SetStateAction, useState } from "react";
import { User } from "../../interfaces/api.ts";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import paperPlaneTilt from "/icons/paper-plane-tilt.svg";
import weteachApi from "../../configs/weteach-api.ts";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

type ISchema = z.infer<typeof schema>;

export default function LoginPage({
  setUser,
}: {
  setUser: Dispatch<SetStateAction<User | null>>;
}) {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ISchema) => {
    try {
      setErrorMessage(null);

      const res = await weteachApi.post("api/v1/auth/token/", {
        email: data.email,
        password: data.password,
      });

      const refreshToken = res.data["refresh"];
      const accessToken = res.data.access;

      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessToken", accessToken);

      const userRes = await weteachApi.get("/api/v1/users/user");

      const user = userRes.data;

      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.email);

      setUser({
        id: user.id,
        name: user.email ?? "-",
      });

      navigate("/");
    } catch (e) {
      setErrorMessage(e.response.data.detail);
    }
  };

  return (
    <section
      className={"h-[100vh] w-full flex flex-col items-center justify-center"}
    >
      <form
        className={
          "w-[500px] border border-gray-200 p-6 flex flex-col gap-3 mx-auto rounded"
        }
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className={"flex flex-row items-center gap-3 justify-center"}>
          <img src={paperPlaneTilt} alt={"logo"} />
          <span className={"text-3xl font-bold text-primary"}>Weteach</span>
        </h1>
        <p className={"text-sm text-gray-500 text-center mb-6"}>
          Welcome to Weteach. Enter your credentials to log in.
        </p>
        <div>
          <label htmlFor={"email"}>Email</label>
          <input {...register("email")} placeholder={"Enter email"} />
          <p className={"text-xs text-error mt-1"}>{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor={"password"}>Password</label>
          <input
            {...register("password")}
            placeholder={"Enter password"}
            type={"password"}
          />
          <p className={"text-xs text-error mt-1"}>
            {errors.password?.message}
          </p>
        </div>

        {errorMessage !== null ? (
          <p className={"text-xs text-error mt-1 text-center mb-6"}>
            {errorMessage}
          </p>
        ) : null}

        <button
          className={
            "bg-secondary text-white py-3 rounded mx-auto w-[275px] text-center font-bold"
          }
        >
          Login
        </button>
      </form>
    </section>
  );
}
