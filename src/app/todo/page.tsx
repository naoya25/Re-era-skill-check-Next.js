"use client";

import LoginPrompt from "@/components/features/user/toLoginPage";
import Loading from "@/components/ui/Loading";
import { isLoginContext, userInfoContext } from "@/hooks/useGetCurrentUser";
import { TodoType } from "@/types/todo";
import { getAllTodos, toggleCompleteTodo } from "@/utils/todo";
import { useContext, useEffect, useState } from "react";

const AllTodoPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<TodoType[]>([]);

  const isLogin = useContext(isLoginContext);
  const [userInfo, setUserInfo] = useContext(userInfoContext);
  if (!isLogin) return <LoginPrompt />;
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      const todosData = await getAllTodos();
      setTodos(todosData);
      setLoading(false);
    };

    fetchTodos();
  }, []);

  const handleToggleComplete = async (id: number) => {
    const newTodos = todos.map((todo) =>
      todo.id == id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    await toggleCompleteTodo(
      id,
      newTodos.find((todo) => todo.id === id)?.completed || false
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <p className="text-lg font-semibold mb-4">All Todos</p>
      {loading && <Loading />}
      <div>
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="p-5 m-5 border flex justify-between items-center"
          >
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
                disabled={todo.userId != userInfo.id}
              />
              <span className={todo.completed ? "line-through" : ""}>
                {todo.todo}
              </span>
            </label>
            <div className="space-x-3">
              {todo.userId == userInfo.id ? (
                <p>
                  <a
                    href={`/todo/edit/${todo.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </p>
              ) : (
                <p>
                  <a
                    href={`/user/${todo.userId}`}
                    className="text-blue-500 hover:underline"
                  >
                    userId: {todo.userId}
                  </a>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTodoPage;
