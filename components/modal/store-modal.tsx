"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/modal";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Store name should be minimum 3 characters." }),
});

export const StoreModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log("Form values :", values);
    try {
      setIsLoading(true);

      const response = await axios.post("/api/stores", values);
      console.log("submit | response :", response);
    } catch (error) {
      console.log("error :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create a new store"
      description="Add a new store to manage the products and categories."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-4 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Your store name..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* space-x-2 = elements within the div has x axis space of 2 */}
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={isLoading}
                  type="button"
                  variant={"outline"}
                  size={"sm"}
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit" size={"sm"}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
