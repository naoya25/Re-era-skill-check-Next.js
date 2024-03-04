"use client";
import React from "react";
import LoginForm from "@/components/features/user/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-lg mx-auto px-4 py-8 bg-white shadow-lg rounded-lg mt-10">
        <p className="text-lg mb-4">
          dummyjsonのlogin用のAPIを使用しています。
        </p>
        <p className="mb-4">
          <a
            href="https://dummyjson.com/docs/auth"
            target="_blanck"
            className="text-blue-500 hover:underline"
          >
            詳しくはこちら
          </a>
        </p>
        <p className="mb-4">
          名前は、kminchelle で、パスワードは、0lelplR でログインできます。
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
