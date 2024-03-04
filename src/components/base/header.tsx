"use client";
import React, { useContext } from "react";
import LogoutButton from "../features/user/LogoutButton";
import { isLoginContext, userInfoContext } from "@/hooks/useGetCurrentUser";

const Header = () => {
  const isLogin = useContext(isLoginContext);
  const [userInfo, setUserInfo] = useContext(userInfoContext);
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">
          <a href="/">MyTodoApp</a>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            {isLogin && (
              <>
                <li>
                  <a href="/todo" className="hover:text-gray-300">
                    AllTodo
                  </a>
                </li>
                <li>
                  <a
                    href={`/user/${userInfo.id}`}
                    className="hover:text-gray-300"
                  >
                    MyTodo
                  </a>
                </li>
                <li>
                  <a href="/todo/add" className="hover:text-gray-300">
                    AddTodo
                  </a>
                </li>
                <li>
                  <a href="/user/show" className="hover:text-gray-300">
                    MyProfile
                  </a>
                </li>
              </>
            )}
            <li>
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
