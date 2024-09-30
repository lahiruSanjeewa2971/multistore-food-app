import { db } from "@/firebase";
import { Category } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Un-authorized", { status: 400 });
    }

    const { name, billboardLabel, billboardId } = body;

    if (!name) {
      return new NextResponse("Category name is missing.", { status: 400 });
    }

    if (!billboardLabel) {
      return new NextResponse("Billboard is missing.", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is missing.", { status: 400 });
    }

    const store = await getDoc(doc(db, "stores", params.storeId));

    if (store.exists()) {
      let storeData = store.data();
      if (storeData?.userId !== userId) {
        return new NextResponse("Un-authorized access", { status: 500 });
      }
    }

    const categoryData = {
      name,
      billboardLabel,
      billboardId,
      createdAt: serverTimestamp(),
    };

    const CategoryRef = await addDoc(
      collection(db, "stores", params.storeId, "categories"),
      categoryData
    );

    const id = CategoryRef.id;

    await updateDoc(doc(db, "stores", params.storeId, "categories", id), {
      ...categoryData,
      id,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ id, ...categoryData });
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is missing.", { status: 400 });
    }

    const cateogoriesData = (
      await getDocs(collection(doc(db, "sotres", params.storeId), "categories"))
    ).docs.map((doc) => doc.data()) as Category[];

    return NextResponse.json(cateogoriesData);

  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
