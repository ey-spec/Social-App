import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import type { PostsResponse } from "../Types/post.types";
import PostCard from "../Components/Posts/PostCard";
import Loader from "../Components/Common/Loader";

export default function Home() {
  const { UserToken } = useContext(AuthContext);

  async function getPosts() {
    const { data } = await axios.get<PostsResponse>(
      "https://route-posts.routemisr.com/posts",
      { headers: { Authorization: `Bearer ${UserToken}` } },
    );
    return data.data.posts;
  }

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["AllPosts"],
    queryFn: getPosts,
  });

  if (isLoading) return <Loader />;

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
    <div className="space-y-4">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
