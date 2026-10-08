import axios from "axios";
import type { SinglePostResponse } from "../Types/post.types";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Common/Loader";
import { useParams } from "react-router-dom";
import PostCard from "../Components/Posts/PostCard";

export default function PostDetails() {
 

  const { id } = useParams<{ id: string }>();

  async function getSinglePost() {
    const { data } = await axios.get<SinglePostResponse>(
      `https://route-posts.routemisr.com/posts/${id}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("UserToken")}` } },
    );
    return data.data.post;
  }

  const {
    data: post,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["PostDetails", id],
    queryFn: getSinglePost,
  });

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
