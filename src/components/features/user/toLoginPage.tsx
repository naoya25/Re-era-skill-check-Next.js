import { useContext } from "react";
import { isLoginContext } from "@/hooks/useGetCurrentUser";

const LoginPrompt = () => {
  const isLogin = useContext(isLoginContext);

  return (
    <div className="max-w-md mx-auto mt-8">
      {!isLogin && (
        <div className="bg-white border border-gray-300 rounded-md p-4">
          <p className="text-lg font-semibold mb-2">
            現在あなたはログインしていません。
          </p>
          <p className="mb-2">ログインしてください。</p>
          <p>
            <a href="/user/login" className="text-blue-500 hover:underline">
              ログインページへ
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPrompt;
