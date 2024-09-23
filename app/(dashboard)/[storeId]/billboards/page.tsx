import React from "react";
import { BillboardClient } from "./components/client";

const Billboards = ({ params }: { params: { storeId: string } }) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  );
};

export default Billboards;
