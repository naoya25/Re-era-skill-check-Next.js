import { isLoginContext, userInfoContext } from "@/hooks/useGetCurrentUser";
import { LoginFormInputType } from "@/types/loginFormInput";
import { UserType } from "@/types/user";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputType>({
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const isLogin = useContext(isLoginContext);
  const [userInfo, setUserInfo] = useContext(userInfoContext);
  // すでにログイン中の時
  if (isLogin)
    return (
      <div className="text-center">
        <p>ユーザ名:{userInfo.username}でログイン中</p>
        <LogoutButton />
      </div>
    );
  // ログイン処理
  const onSubmit: SubmitHandler<LoginFormInputType> = async (data) => {
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.name,
          password: data.password,
        }),
      });

      const user = (await res.json()) as UserType;
      setUserInfo(user);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/todo");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <input
          id="name"
          placeholder="名前"
          {...register("name", {
            required: {
              value: true,
              message: "kminchelle と入力してください",
            },
            validate: (data) => {
              if (data !== "kminchelle") {
                return "kminchelle と入力してください";
              }
            },
          })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.name?.message && (
          <div className="text-red-500 text-sm mt-1">{errors.name.message}</div>
        )}
      </div>

      <div className="mb-4">
        <input
          id="password"
          type="password"
          placeholder="パスワード"
          {...register("password", {
            required: {
              value: true,
              message: "0lelplR と入力してください",
            },
            validate: (data) => {
              if (data !== "0lelplR") {
                return "0lelplR と入力してください";
              }
            },
          })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.password?.message && (
          <div className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        ログイン
      </button>
    </form>
  );
}
