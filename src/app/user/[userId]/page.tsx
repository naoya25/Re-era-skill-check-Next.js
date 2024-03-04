"use client";

import LoginPrompt from "@/components/features/user/toLoginPage";
import { isLoginContext, userInfoContext } from "@/hooks/useGetCurrentUser";
import { TodoType } from "@/types/todo";
import { getUserTodos, toggleCompleteTodo } from "@/utils/todo";
import { useContext, useEffect, useState } from "react";

const UserTodoPage = ({ params }: { params: { userId: number } }) => {
  const [userTodos, setUserTodos] = useState<TodoType[]>([]);
  const isLogin = useContext(isLoginContext);
  const [userInfo, setUserInfo] = useContext(userInfoContext);

  useEffect(() => {
    const fetchUserTodos = async () => {
      const res = await getUserTodos(params.userId);
      setUserTodos(res.todos);
    };

    fetchUserTodos();
  }, []);

  const handleToggleComplete = async (id: number) => {
    const newTodos = userTodos.map((todo) =>
      todo.id == id ? { ...todo, completed: !todo.completed } : todo
    );
    setUserTodos(newTodos);
    await toggleCompleteTodo(
      id,
      newTodos.find((todo) => todo.id === id)?.completed || false
    );
  };
  if (!isLogin) return <LoginPrompt />;

  return (
    <div className="max-w-xl mx-auto mt-8">
      <p className="text-lg font-semibold mb-4">
        {params.userId == userInfo.id
          ? "MyTodo"
          : `userId: ${params.userId} Todo`}
      </p>

      <div>
        {userTodos ? (
          userTodos.map((todo) => (
            <div
              key={todo.id}
              className="p-5 m-5 border flex justify-between items-center"
            >
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  disabled={params.userId != userInfo.id}
                />
                <span className={todo.completed ? "line-through" : ""}>
                  {todo.todo}
                </span>
              </label>
              {params.userId == userInfo.id && (
                <div className="space-x-3">
                  <p>
                    <a
                      href={`/todo/edit/${todo.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No todos</p>
        )}
      </div>
    </div>
  );
};

export default UserTodoPage;
