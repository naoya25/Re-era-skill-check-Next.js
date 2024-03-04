"use client";
import LoginPrompt from "@/components/features/user/toLoginPage";
import Loading from "@/components/ui/Loading";
import { isLoginContext, userInfoContext } from "@/hooks/useGetCurrentUser";
import { postTodo } from "@/utils/todo";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AddTodoPage = () => {
  const router = useRouter();
  const isLogin = useContext(isLoginContext);
  const [userInfo, setUserInfo] = useContext(userInfoContext);
  if (!isLogin) return <LoginPrompt />;
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ todoText: string }>({
    defaultValues: {
      todoText: "",
    },
  });

  const onSubmit: SubmitHandler<{ todoText: string }> = async (data) => {
    try {
      setLoading(true);
      if (isLogin && userInfo.id) {
        const res = await postTodo({
          todo: data.todoText,
          userId: userInfo.id,
        });
        console.log(res);
        router.push(`/user/${userInfo.id}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <p className="text-lg font-semibold mb-4">Add Todo</p>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="m-5">
          <input
            id="todo"
            type="text"
            placeholder="todo"
            className="w-full border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:border-blue-500"
            {...register("todoText", {
              required: {
                value: true,
                message: "空欄になっています",
              },
            })}
          />
          {errors.todoText?.message && (
            <div className="text-red-500 text-sm mt-1">
              {errors.todoText.message}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            追加
          </button>
        </form>
      )}
    </div>
  );
};

export default AddTodoPage;
