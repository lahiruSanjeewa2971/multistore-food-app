"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { columns, CuisinesColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/api-list";

interface CuisineClientProps {
  data: CuisinesColumns[];
}

export const CuisinesClient = ({ data }: CuisineClientProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-center">
        <Heading
          title={`Cuisines (${data.length})`}
          description="Manage cuisines for your site"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/cuisines/create`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="name" columns={columns} data={data} />

      <Heading title="API" description="API calls for cuisines" />
      <Separator />

      <ApiList entityName="cuisines" entityNameId="cuisineId" />
    </>
  );
};
