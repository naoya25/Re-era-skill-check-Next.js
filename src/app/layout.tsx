import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/base/header";
import Footer from "@/components/base/footer";
import { UserContextProvider } from "@/hooks/useGetCurrentUser";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const noto = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "todoリスト - 自分の目標を達成しよう！",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${noto.className} min-h-[100vh] relative pb-10 antialiased bg-gray-100`}
      >
        <UserContextProvider>
          <Header />
          {children}
          <Footer />
        </UserContextProvider>
      </body>
    </html>
  );
}
