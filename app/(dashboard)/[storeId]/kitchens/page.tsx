import { db } from "@/firebase";
import { Kitchen } from "@/types-db";
import { collection, doc, getDocs } from "firebase/firestore";
import { KitchensClient } from "./components/client";
import { KitchensColumns } from "./components/columns";
import { format } from "date-fns";

const KitchensPage = async ({ params }: { params: { storeId: string } }) => {
  const kitchenData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "kitchens"))
  ).docs.map((doc) => doc.data()) as Kitchen[];

  const formattedKitchens: KitchensColumns[] = kitchenData.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: item.createdAt
      ? format(item.createdAt.toDate(), "MMMM do, yyyy")
      : "",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <KitchensClient data={formattedKitchens} />
      </div>
    </div>
  );
};

export default KitchensPage;
