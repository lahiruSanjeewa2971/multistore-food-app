"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { columns, KitchensColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/api-list";

interface KitchenClientProps {
  data: KitchensColumns[];
}

export const KitchensClient = ({ data }: KitchenClientProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-center">
        <Heading
          title={`Kitchens (${data.length})`}
          description="Manage kitchens for your site"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/kitchens/create`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="name" columns={columns} data={data} />

      <Heading title="API" description="API calls for kitchens" />
      <Separator />

      <ApiList entityName="kitchens" entityNameId="kitchenId" />
    </>
  );
};
