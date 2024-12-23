"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { CalendarClock, User, LogOut, PlusCircle, Home } from "lucide-react";
import { ModeToggle } from "@/components/themeChanger";
import Image from "next/image";

export default function Navbar({
  user,
  avatarUrl,
}: {
  user: any;
  avatarUrl?: string;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };
  console.log(avatarUrl)

  return (
    <header className="w-full p-2 m-0 md:p-8   ">
      <nav className="  ">
        <div className="flex  justify-between items-center">
          <div className="flex justify-center items-center  ">
            <div className="flex gap-2 md:gap-8">
               <Image src={"/Logo-1.png"} alt="logo" width={50} height={80} className="dark:invert" />
              <a
                href="/"
                className="flex justify-center items-center font-bold hidden md:flex text-xl"
              >
                <span className="text-cyan-600 dark:text-cyan-600">Con</span>
                <span className="text-[#E1785F] dark:text-[#C2CEC4]">tac</span>
                <span className="text-gray-700 dark:text-[#E1785F]">.ta</span>
              </a>
             
            </div>
          </div>
          <div className="flex gap-2 mr-0 md:mr-10">
           <Button onClick={() => (router.push("/dashboard"))}> <CalendarClock size={20} className="mr-2"/>agendar</Button>
          <Button onClick={() => (router.push("/"))}> <Home size={20} className="mr-2"/>Home</Button>  
          </div>
         
          <div className="flex justify-between items-center gap-2 ">
            
            <ModeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={avatarUrl} alt="Profile" />
                    <AvatarFallback>
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
}
