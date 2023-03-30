import client from "@/app/client";
import { MyList } from "@/app/components/MyList";
import { GET_SINGLE_LIST } from "@/app/queries/lists";

export default async function ListId({ params }: any) {
  const { listId } = params;

  return (
    <div className="container">
      <MyList listId={listId} />
    </div>
  );
}
