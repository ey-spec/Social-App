import PostCreationForm from "./PostCreationForm";
import Loader from "../Common/Loader";
import usePost from "../../hooks/usePost";
import { useParams } from "react-router-dom";

export default function UpdatePost() {
  const { id } = useParams<{ id: string }>();

  const { data: post, isPending, isError, error } = usePost(id);

  if (isPending) return <Loader />;

  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red`-700">
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <>
      <PostCreationForm post={post} />
    </>
  );
}
