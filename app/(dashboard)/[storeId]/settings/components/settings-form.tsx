"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Store } from "@/types-db";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Store name should be minimum 3 characters." }),
});

export const SettingsForm = ({ initialData }: SettingsFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("onSubmit :", data);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <Heading title="Settings" description="Manage Store Preferences." />
        <Button variant={"destructive"} size={"icon"} onClick={() => {}}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <Separator />

      {/* update store name form */}
    </>
  );
};
