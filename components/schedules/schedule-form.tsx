"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import { ArrowBigDown, ArrowDown } from "lucide-react";
type ScheduleFormProps = {
  onSuccess: () => void;
  initialData?: any;
  trigger: React.ReactNode;
};

export default function ScheduleForm({
  onSuccess,
  initialData,
  trigger,
}: ScheduleFormProps) {
  const [status, setStatus] = React.useState("");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(initialData?.title || "");
  const [cliente, setCliente] = useState(initialData?.cliente || "");
  const [endTime, setEndTime] = useState(
    initialData?.end_time
      ? new Date(initialData.end_time).toISOString().slice(0, 16)
      : ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const scheduleData = {
        title,
        cliente,
        status,
        end_time: new Date(endTime).toISOString(),
        user_id: user.id,
      };

      if (initialData) {
        await supabase
          .from("schedules")
          .update(scheduleData)
          .eq("id", initialData.id);
      } else {
        await supabase.from("schedules").insert([scheduleData]);
      }

      toast({
        title: initialData ? "Schedule updated" : "Schedule created",
        description: initialData
          ? "Your schedule has been updated."
          : "Your new schedule has been created.",
        variant: "success",
      });

      setOpen(false);
      onSuccess();
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Schedule" : "Create Schedule"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Cliente</Label>
            <Input
              id="cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
          </div>
          <div className="space-y-2 flex flex-col m-auto ">
            <Label htmlFor="description">Status</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"> {status} <ArrowDown className="ml-4"/> </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Andamento do serviço</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={status}
                  onValueChange={setStatus}
                >
                  <DropdownMenuRadioItem value="A fazer" className="text-orange-500 ">A fazer</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem className="text-green-500" value="Feito">
                    Feito
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem className="text-red-600" value="cancelado">
                    Cancelado
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-time">Data marcada</Label>
            <Input
              id="end-time"
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? "Saving..."
              : initialData
              ? "Update Schedule"
              : "Create Schedule"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
