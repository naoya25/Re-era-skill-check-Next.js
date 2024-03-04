import { isLoginContext, userInfoContext } from "@/hooks/useGetCurrentUser";
import { UserType } from "@/types/user";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({
    defaultValues: {
      id: null,
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      gender: "",
      image: "",
      token: "",
    },
  });

  const isLogin = useContext(isLoginContext);
  const [userInfo, setUserInfo] = useContext(userInfoContext);
  // すでにログイン中の時
  if (isLogin) {
    return (
      <div className="text-center">
        <p>ユーザ名:{userInfo.username}でログイン中</p>
        <LogoutButton />
      </div>
    );
  }

  const onSubmit: SubmitHandler<UserType> = async (data) => {
    try {
      const user = { ...data } as UserType;
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
          id="id"
          placeholder="ID"
          {...register("id", {
            required: {
              value: true,
              message: "idは必須です。",
            },
            pattern: {
              value: /^(?:[1-9]|[1-9][0-9]|1[0-4][0-9]|150)$/,
              message: "1以上150以下の整数のみ入力してください。",
            },
          })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.id && (
          <div className="text-red-500 text-sm mt-1">{errors.id.message}</div>
        )}
      </div>

      <div className="mb-4">
        <input
          id="username"
          placeholder="名前"
          {...register("username", {
            required: "名前は必須です。",
          })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.username && (
          <div className="text-red-500 text-sm mt-1">
            {errors.username.message}
          </div>
        )}
      </div>

      <div className="mb-4">
        <input
          id="email"
          placeholder="メールアドレス"
          {...register("email", {
            required: "メールアドレスは必須です。",
            pattern: {
              value:
                /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
              message: "有効なメールアドレスを入力してください",
            },
          })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.email && (
          <div className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </div>
        )}
      </div>

      <div className="mb-4">
        <select
          id="gender"
          {...register("gender", { required: "性別を選択してください。" })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="" disabled>
            性別
          </option>
          <option value="no answer">回答しない</option>
          <option value="male">男性</option>
          <option value="female">女性</option>
        </select>
        {errors.gender && (
          <div className="text-red-500 text-sm mt-1">
            {errors.gender.message}
          </div>
        )}
      </div>

      <div className="mb-4">
        <input
          id="image"
          placeholder="画像URL"
          {...register("image", {
            pattern: {
              value:
                /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(?:jpg|jpeg|png|gif|bmp)$/,
              message: "画像のURLを入力してください",
            },
          })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.image && (
          <div className="text-red-500 text-sm mt-1">
            {errors.image.message}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        登録
      </button>
    </form>
  );
}
