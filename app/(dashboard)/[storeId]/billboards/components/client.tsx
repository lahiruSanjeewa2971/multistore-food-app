"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColums, columns } from "./columns";

interface BillboardClientProps {
  data: BillboardColums[];
}

export const BillboardClient = ({data} : BillboardClientProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-center">
        <Heading
          title={`Billboards (0)`}
          description="Manage billboards for your store."
        />

        <Button onClick={() => router.push(`/${params.storeId}/billboards/create`)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New
        </Button>
      </div>

      <Separator/>

      <DataTable columns={columns} data={data } />
    </>
  );
};
