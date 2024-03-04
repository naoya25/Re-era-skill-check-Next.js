import Loading from "@/components/ui/Loading";

export default function Home() {
  return (
    <main className="p-24">
      <div className="container mx-auto mt-20 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          todoリスト
        </h1>
        <p className="text-lg text-center text-gray-700">
          自分の目標を明確にし、達成するためのステップを計画しましょう！
        </p>
        <p className="text-center">
          <span className="text-red-500">
            ※注意事項：このサイトは練習用のため、実際には使えません
          </span>
        </p>
        <p className="text-lg text-center m-4">
          <a href="/user/login">はじめての方はこちら💁 </a>
        </p>
        <p className="text-lg text-center m-4">
          <a href="/user/register">ユーザidを手動で設定する </a>
        </p>
      </div>
      <Loading />
    </main>
  );
}
