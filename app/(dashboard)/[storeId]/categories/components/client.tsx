"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { CategoryColumns, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface CategoryClientProps {
  data: CategoryColumns[];
}

export const CategoryClient = ({data} : CategoryClientProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-center">
        <Heading
          title="Categories (0)"
          description="Manage categories for your site"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/categories/create`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
