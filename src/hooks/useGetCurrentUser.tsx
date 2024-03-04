"use client";
import { UserType } from "@/types/user";
import React, { useEffect, useState } from "react";

// ログインしているかどうか
export const isLoginContext = React.createContext<boolean>(false);

// ログインユーザの情報
export const userInfoContext = React.createContext<
  [UserType, React.Dispatch<React.SetStateAction<UserType>>]
>([
  {
    id: null,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    image: "",
    token: "",
  },
  () => {},
]);

export const UserContextProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserType>({
    id: null,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    image: "",
    token: "",
  });

  useEffect(() => {
    // localStorageからユーザー情報取得
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (userInfo?.id) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userInfo]);

  return (
    <isLoginContext.Provider value={isLogin}>
      <userInfoContext.Provider value={[userInfo, setUserInfo]}>
        {props.children}
      </userInfoContext.Provider>
    </isLoginContext.Provider>
  );
};
