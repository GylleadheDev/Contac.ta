"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Home } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
    const router = useRouter();
  return (
    <div className="min-h-screen flex-col antialiased bg-gradient-to-tl from-slate-100 transition-all ease-linear to-slate-200 dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-950 flex items-center justify-center p-4">
      <Image
        src={"/Logo-1.png"}
        alt="Logo"
        width={110}
        height={60}
        className="dark:invert"
      />
      <a
        href="/"
        className="flex justify-center items-center font-bold text-4xl md:text-5xl  mb-8"
      >
        <span className="text-cyan-600 dark:text-cyan-600">Con</span>
        <span className="text-[#E1785F] dark:text-[#C2CEC4]">tac</span>
        <span className="text-gray-700 dark:text-[#E1785F]">.ta</span>
      </a>
      <div className="w-full justify-center items-center rounded-xl shadow-2xl p-8">
        <CheckCircle size={92} className="m-auto animate-bounce text-green-400" />
      </div>
      <h1 className="mb-4 p-8 text-center text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl ">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-orange-600 from-teal-500  dark:bg-gradient-to-r dark:to-[#0891B2] dark:from-[#EA755F]">
                In your Email
              </span>{" "}
              has a verification link
            </h1>
            <p className="mb-8 text-center text-lg font-normal text-gray-500 dark:text-gray-400">
              If you alredy verified you account , Please click the button below to return to login page and access your account.
            </p>

            <Button onClick={() => (router.push("/auth/signin"))}> <Home size={20} className="mr-2"/>Acess </Button>  
    </div>
  );
}
