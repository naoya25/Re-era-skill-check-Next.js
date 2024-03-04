// todo関連の関数まとめ

// 全てのtodoを取得
export const getAllTodos = async () => {
  const res = await fetch("https://dummyjson.com/todos", {
    cache: "no-store", // ssr
  });
  const data = await res.json();
  console.log(data);
  return data.todos;
};

// 一つのtodoを取得する
export const getTodo = async (todoId: number) => {
  const res = await fetch(`https://dummyjson.com/todos/${todoId}`, {
    cache: "no-store", // ssr
  });
  const data = await res.json();
  console.log(data);
  return data;
};

// 新たにtodoを投稿する
export const postTodo = async ({
  todo,
  userId,
}: {
  todo: string;
  userId: number;
}) => {
  const res = await fetch("https://dummyjson.com/todos/add", {
    cache: "no-store", // ssr
    method: "POST",
    body: JSON.stringify({ todo, completed: false, userId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = (await res).json();
  console.log(data);
  return data;
};

// todoを編集する
export const updateTodo = async ({
  todoId,
  todo,
  completed,
}: {
  todoId: number;
  todo: string;
  completed: boolean;
}) => {
  const res = await fetch(`https://dummyjson.com/todos/${todoId}`, {
    cache: "no-store", // ssr
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todo, completed }),
  });
  const data = await res.json();
  console.log(data);
  return data;
};

// todoの完了・未完了の切り替え
export const toggleCompleteTodo = async (
  todoId: number,
  completed: boolean
) => {
  const res = await fetch(`https://dummyjson.com/todos/${todoId}`, {
    cache: "no-store", // ssr
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  const data = await res.json();
  console.log(data);
  return data;
};

// todoを削除する
export const deleteTodo = async (todoId: number) => {
  const res = await fetch(`https://dummyjson.com/todos/${todoId}`, {
    cache: "no-store", // ssr
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  return data;
};

// userIdを受け取り、そのユーザのtodoを全て返す
export const getUserTodos = async (userId: number) => {
  const res = await fetch(`https://dummyjson.com/todos/user/${userId}`, {
    cache: "no-store", // ssr
  });
  const data = await res.json();
  console.log(data);
  return data;
};
