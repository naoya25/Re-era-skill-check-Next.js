"use client";
import React from "react";
import RegisterForm from "@/components/features/user/RegisterForm";

export default function Register() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-lg mx-auto px-4 py-8 bg-white shadow-lg rounded-lg mt-10">
        <p className="text-lg mb-4">userIdを自由に設定できます</p>
        <p className="mb-4">
          名前は、kminchelle で、パスワードは、0lelplR でログインできます。
        </p>
        <RegisterForm />
      </div>
    </div>
  );
}
