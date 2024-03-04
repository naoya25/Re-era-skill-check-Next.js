"use client";

import LoginPrompt from "@/components/features/user/toLoginPage";
import Loading from "@/components/ui/Loading";
import { isLoginContext, userInfoContext } from "@/hooks/useGetCurrentUser";
import { TodoType } from "@/types/todo";
import { deleteTodo, getTodo, updateTodo } from "@/utils/todo";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const TodoShowPage = ({ params }: { params: { todoId: number } }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<{ todo: string; completed: boolean }>({
    defaultValues: {
      todo: "",
      completed: false,
    },
  });
  const [todo, setTodo] = useState<TodoType>({
    id: 0,
    todo: "",
    completed: false,
    userId: 0,
  });

  const isLogin = useContext(isLoginContext);
  const [userInfo, setUserInfo] = useContext(userInfoContext);
  if (!isLogin) return <LoginPrompt />;

  useEffect(() => {
    const fetchUserTodos = async () => {
      const todoData = await getTodo(params.todoId);
      setTodo(todoData);
      setValue("todo", todoData.todo);
      setValue("completed", todoData.completed);
      setLoading(false);
    };

    fetchUserTodos();
  }, [params.todoId, setValue]);

  const onSubmit: SubmitHandler<{ todo: string; completed: boolean }> = async (
    data
  ) => {
    try {
      setLoading(true);
      if (isLogin) {
        const res = await updateTodo({
          todo: data.todo,
          completed: data.completed,
          todoId: params.todoId,
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
      <p className="text-lg font-semibold mb-4">Todo</p>
      {loading ? (
        <Loading />
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="m-5">
            <input
              id="todo"
              type="text"
              placeholder="todo"
              className="w-full border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:border-blue-500"
              {...register("todo", {
                required: {
                  value: true,
                  message: "空欄になっています",
                },
              })}
            />
            {errors.todo?.message && (
              <div className="text-red-500 text-sm mt-1">
                {errors.todo.message}
              </div>
            )}
            <label className="inline-flex items-center mb-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                {...register("completed")}
              />
              <span className="ml-2">
                {watch("completed") ? "完了" : "未完了"}
              </span>
            </label>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mb-4"
            >
              Todo編集
            </button>
          </form>
          <button
            onClick={() => {
              setLoading(true);
              deleteTodo(params.todoId);
              router.push(`/user/${userInfo.id}`);
            }}
            className="bg-red-500 text-white py-2 px-4 m-5 rounded-md hover:bg-red-600 transition duration-300"
          >
            削除
          </button>
        </>
      )}
    </div>
  );
};

export default TodoShowPage;
