"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellImage } from "./cell-image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColums = {
  id: string;
  label: string;
  imageUrl: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColums>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const { imageUrl } = row.original;
      return <CellImage imageUrl={imageUrl} />;
    },
  },
  {
    accessorKey: "label",
    header: "Bollboard Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
