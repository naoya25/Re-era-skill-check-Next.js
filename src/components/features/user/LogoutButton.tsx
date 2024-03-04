"use client";
import { isLoginContext, userInfoContext } from "@/hooks/useGetCurrentUser";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const LogoutButton = () => {
  const isLogin = useContext(isLoginContext);
  const [userInfo, setUserInfo] = useContext(userInfoContext);
  const router = useRouter();
  return (
    <div>
      {isLogin ? (
        <button
          onClick={() => {
            setUserInfo({
              id: null,
              username: "",
              email: "",
              firstName: "",
              lastName: "",
              gender: "",
              image: "",
              token: "",
            });
            localStorage.removeItem("user");
            router.push("/user/login");
          }}
          className="hover:text-gray-300"
        >
          Logout
        </button>
      ) : (
        <a href="/user/login">ログイン</a>
      )}
    </div>
  );
};

export default LogoutButton;
