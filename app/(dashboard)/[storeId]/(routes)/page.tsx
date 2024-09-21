import { db } from "@/firebase";
import { Store } from "@/types-db";
import { doc, getDoc } from "firebase/firestore";

interface DashboardOverviewProps {
  params: { storeId: string };
}

const DashboardOverview = async ({ params }: DashboardOverviewProps) => {
  const store = (
    await getDoc(doc(db, "stores", params.storeId))
  ).data() as Store;

  return <div>DashboardOverview: {store.name}</div>;
};

export default DashboardOverview;
