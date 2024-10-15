import { db } from "@/firebase";
import { Product } from "@/types-db";
import { collection, doc, getDocs } from "firebase/firestore";
import { format } from "date-fns";
import { SizesClient } from "./components/client";
import { ProductColumns } from "./components/columns";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const productData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "products"))
  ).docs.map((doc) => doc.data()) as Product[];

  const formattedProducts: ProductColumns[] = productData.map((item) => ({
    id: item.id,
    name: item.name,
    // price: item.price,
    price: formatter.format(item.price),
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    category: item.category,
    size: item.size,
    cuisine: item.cuisine,
    kitchen: item.kitchen,
    createdAt: item.createdAt
      ? format(item.createdAt.toDate(), "MMMM do, yyyy")
      : "",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
