import Loader from "../Components/Common/Loader";
import { useParams } from "react-router-dom";
import PostCard from "../Components/Posts/PostCard";
import usePost from "../hooks/usePost";

export default function PostDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: post, isPending, isError, error } = usePost(id);

  if (isPending) return <Loader />;

  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error.message}
        </div>
      </div>
    );
  }
  return (
    <>
      <PostCard post={post} isPostDetails={true} />
    </>
  );
}
