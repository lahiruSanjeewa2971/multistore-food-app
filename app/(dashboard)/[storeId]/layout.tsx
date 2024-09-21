import { db } from "@/firebase";
import { Store } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

const DashboardLayout = async ({
  children,
  params,
}: DashboardLayoutProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const storeSnap = await getDocs(
    query(
      collection(db, "stores"),
      where("userId", "==", userId),
      where("id", "==", params.storeId)
    )
  );

  let store;

  storeSnap.forEach((doc) => {
    store = doc.data() as Store;
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      This is the Navbar : {params.storeId}
      {children}
    </>
  );
};

export default DashboardLayout;