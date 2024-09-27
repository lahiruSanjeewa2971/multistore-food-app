import React from "react";
import { BillboardClient } from "./components/client";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Billboard } from "@/types-db";
import { BillboardColums } from "./components/columns";
import { format } from "date-fns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboardsData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "billboards"))
  ).docs.map((doc) => doc.data()) as Billboard[];

  const formattedBillboards: BillboardColums[] = billboardsData.map((item) => ({
    id: item.id,
    label: item.label,
    imageUrl: item.imageUrl,
    createdAt: item.createdAt
      ? format(item.createdAt.toDate(), "MMMM do, yyyy")
      : "",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
