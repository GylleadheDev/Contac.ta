import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { CalendarClock } from 'lucide-react';
import { BiLogoPostgresql } from "react-icons/bi";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiNextdotjs } from "react-icons/si";
import { RiSupabaseFill } from "react-icons/ri";
import { FeaturesSec } from "@/components/Features";
import { GifCarousel } from "@/components/Carrousel";
import { MdWarning } from "react-icons/md";
import { ModeToggle } from "@/components/themeChanger";


export default function Home() {
  return (
    <div>
    <section className="  justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <div className="flex gap-4 justify-center ">
        <a
        target='_blank'
          href="https://my-portfolio-gylleadheptbrs-projects.vercel.app/"
          className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-slate-900 bg-orange-500 rounded-full dark:bg-blue-500 dark:text-white "
          role="alert"
        >
          <span className="text-xs  dark:bg-white bg-slate-900 rounded-full dark:text-slate-900 text-white px-4 py-1.5 mr-3">
            New
          </span>{" "}
          <span className="text-sm font-medium">
            Visit My orther projects in my Portffolio
          </span>
          <MdWarning size={25} className="ml-4" />
        </a>
        
          <ModeToggle />
        </div>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Hello ✨ Welcome to <a
                href="/"
                className=" justify-center items-center font-bold "
              >
                <span className="text-cyan-600 dark:text-cyan-600">Con</span>
                <span className="text-[#E1785F] dark:text-[#C2CEC4]">tac</span>
                <span className="text-gray-700 dark:text-[#E1785F]">.ta</span>
              </a>
        </h1>
        <p className="mb-8 text-lg font-normal text-slate-900 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-200">
          Here at Contac.ta CRM  we focus on We focus on versatility, intuitiveness and without a shadow of doubt Ease , for you and all your business
        </p>
        <div className="flex p-8 flex-wrap justify-center items-center gap-5">
        <a
            href="/login"
            className=" justify-center items-center w-[60%] md:w-[30%] text-base font-medium text-center text-white rounded-lg  "
          >
           <Button asChild  className="w-full">
                <Link href="/dashboard">Login Now!</Link>
              </Button>
          </a>
        
          <a
            href="/login"
            className=" justify-center items-centertext-base w-[60%] md:w-[30%] font-medium text-center text-white rounded-lg  "
          >
           <Button asChild  className="w-full">
                <Link href="/auth/signup">Create your Account</Link>
              </Button>
          </a>
         
        </div>

        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <span className="font-semibold text-slate-900 dark:text-gray-200 uppercase">
            build with
          </span>
          <div className="flex justify-center  items-center mt-8 sm:justify-around ">
            <a
              href="#"
              className="mr-5 transition-all delay-75 mb-5 lg:mb-0 hover:text-blue-800 dark:hover:text-blue-800"
            >
              <BiLogoPostgresql size={40}></BiLogoPostgresql>
            </a>
            <a
              href="#"
              className="mr-5 transition-all delay-75 mb-5 lg:mb-0 hover:text-teal-600 dark:hover:text-teal-600"
            >
              <RiSupabaseFill size={40}></RiSupabaseFill>
            </a>
            <a
              href="#"
              className="mr-5 transition-all delay-75 mb-5 lg:mb-0 hover:text-cyan-500 dark:hover:text-cyan-500"
            >
              <RiTailwindCssFill size={40}></RiTailwindCssFill>
            </a>
            <a
              href="#"
              className="mr-5 transition-all delay-75 mb-5 lg:mb-0 hover:text-slate-900 dark:hover:text-white"
            >
              <SiNextdotjs size={40}></SiNextdotjs>
            </a>
          </div>
        </div>
        <section className="p-2 my-20">
          <GifCarousel></GifCarousel>
          <FeaturesSec />
        </section>
      </div>
    </section>
    
  </div>






    
  );
}