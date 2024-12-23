"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, X, CheckCheck, Clock } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import ScheduleForm from "@/components/schedules/schedule-form";
import { format } from "date-fns";

export default function Dashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [schedules, setSchedules] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    fetchSchedules();
  }, []);

  const checkUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/signin");
        return;
      }
      setUser(user);

      const { data: profile } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single();

      if (profile?.avatar_url) {
        setAvatarUrl(profile.avatar_url);
      }
    } catch (error) {
      console.error("Error checking user:", error);
      router.push("/auth/signin");
    }
  };

  const fetchSchedules = async () => {
    try {
      const { data, error } = await supabase.from("schedules").select("*");

      if (error) throw error;

      setSchedules(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("schedules").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Schedule deleted",
        description: "The schedule has been deleted successfully.",
        variant: "success",
      });

      fetchSchedules();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen ">
        <div className="animate-pulse w-50 h-50 m-auto"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <Navbar user={user} avatarUrl={avatarUrl} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-cyan-500 ">
            Data
          </h1>
          <ScheduleForm
            onSuccess={fetchSchedules}
            trigger={
              <Button className="bg-slate-900 dark:bg-white">
                <Plus className="mr-2 h-4 w-4" />
                scheduling
              </Button>
            }
          />
        </div>

        <div className="rounded-2xl border">
          <Table className="dark:bg-slate-900 bg-slate-300 rounded-2xl">
            <TableHeader>
              <TableRow>
                <TableHead>Serviço</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="hidden">Criação</TableHead>
                <TableHead>Data prevista</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="font-medium">
                    {schedule.title}
                  </TableCell>
                  <TableCell>{schedule.cliente}</TableCell>
                  <TableCell className="hidden">
                    {format(new Date(schedule.created_at), "PPp")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(schedule.end_time), "PPp")}
                  </TableCell>
                  <TableCell className="text-center m-auto">
                    {schedule.status === "cancelado" ? (
                      <span className="text-red-600 text-center" ><X className="ml-4"/> </span>
                    ) : schedule.status === "Feito" ? (
                      <span className="text-green-500 text-center" ><CheckCheck className="ml-4"/>  </span>
                    ) : schedule.status === "A fazer" ? (
                      <span className="text-yellow-500 text-center" ><Clock className="ml-4"/> </span>
                    ) : (
                      schedule.status
                    )}

                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-end space-x-2">
                      <ScheduleForm
                        onSuccess={fetchSchedules}
                        initialData={schedule}
                        trigger={
                          <Button
                            variant="ghost"
                            className="bg-orange-600"
                            size="icon"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        }
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(schedule.id)}
                        className="bg-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {schedules.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center dark:text-slate-200 dark:bg-orange-500"
                  >
                    Você ainda nao criou nenhum agendamento , clique no botão
                    acima e crie seu primeiro Agendamento de serviço
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
