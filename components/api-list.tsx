"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams, useRouter } from "next/navigation";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityNameId: string;
}

const ApiList = ({ entityName, entityNameId }: ApiListProps) => {
  const router = useRouter();
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        varient="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        varient="public"
        description={`${baseUrl}/${entityName}/${entityNameId}`}
      />
      <ApiAlert
        title="POST"
        varient="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        varient="admin"
        description={`${baseUrl}/${entityName}/${entityNameId}`}
      />
      <ApiAlert
        title="DELETE"
        varient="admin"
        description={`${baseUrl}/${entityName}/${entityNameId}`}
      />
    </>
  );
};

export default ApiList;
