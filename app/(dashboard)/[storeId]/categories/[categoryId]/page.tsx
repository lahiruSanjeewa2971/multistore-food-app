import { db } from "@/firebase";
import { Billboard, Category } from "@/types-db";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
  const category = (
    await getDoc(
      doc(db, "stores", params.storeId, "categories", params.categoryId)
    )
  ).data() as Category;

  const billboardsData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "billboards"))
  ).docs.map((doc) => doc.data()) as Billboard[];

//   console.log('billboardsData', billboardsData)

  return (
    <div className="flex-col">
      <CategoryForm initialData={category} billboards={billboardsData} />
    </div>
  );
};

export default CategoryPage;
