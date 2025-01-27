import { Dispatch, SetStateAction, useState } from "react";
import { User } from "../../interfaces/api.ts";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import weteachApi from "../../configs/weteach-api.ts";
import login_bg from "/images/login_bg.png";
import { Toaster, toast } from 'sonner';

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
    localStorage.setItem("accessToken", "");
    localStorage.setItem("userId", "");
    localStorage.setItem("userName", "");

    try {
      setErrorMessage(null);

      const res = await weteachApi.post("api/v1/auth/token/", {
        email: data.email,
        password: data.password,
      });

      const refreshToken = res.data["refresh"];
      const accessToken = res.data.access;

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
      toast('Invalid Username or Password')
      setErrorMessage(e.response.data.detail);
    }
  };

  return (
    <div className="flex flex-row h-[100vh]">
      <section
        className={"h-[100vh] w-1/2 flex flex-col items-center justify-center"}
      >
        <form
          className={
            "w-[500px] border border-gray-200 p-6 flex flex-col gap-3 mx-auto rounded"
          }
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className={"flex flex-row items-center gap-3 justify-center"}>
            <span className={"text-3xl font-bold text-primary"}>Mwalimu Finder</span>
          </h1>
          <p className={"text-sm text-gray-500 text-center mb-6"}>
            Welcome to Mwalimu Finder. Enter your credentials to log in.
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
              "bg-secondary text-white py-3 rounded mx-auto w-[275px] text-center font-bold w-full"
            }
          >
            Login
          </button>
        </form>
      </section>
      <div className="h-[100vh] w-1/2 ">
        <img
          src={login_bg}
          alt="login background"
          className="object-cover object-center h-[100vh] w-full"
        />
      </div>

      <Toaster />

    </div>
  );
}
