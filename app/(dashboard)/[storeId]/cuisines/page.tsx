import { db } from "@/firebase";
import { Cuisine, Kitchen } from "@/types-db";
import { collection, doc, getDocs } from "firebase/firestore";
import { format } from "date-fns";
import { CuisinesColumns } from "./components/columns";
import { CuisinesClient } from "./components/client";

const CuisinesPage = async ({ params }: { params: { storeId: string } }) => {
  const cuisineData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "cuisines"))
  ).docs.map((doc) => doc.data()) as Cuisine[];

  const formattedCuisines: CuisinesColumns[] = cuisineData.map((item) => ({
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
        <CuisinesClient data={formattedCuisines} />
      </div>
    </div>
  );
};

export default CuisinesPage;
