import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { PostsResponse } from "../Types/post.types";
import PostCard from "../Components/Posts/PostCard";
import Loader from "../Components/Common/Loader";
import PostCreationForm from "../Components/Posts/PostCreationForm";

export default function Home() {
  async function getPosts({ pageParam }: { pageParam: number }) {
    const { data } = await axios.get<PostsResponse>(
      "https://route-posts.routemisr.com/posts",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
        params: { page: pageParam, limit: 10 },
      },
    );
    return data;
  }

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["AllPosts"],
    queryFn: getPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta?.pagination.nextPage ?? undefined,
  });

  const posts = data?.pages.flatMap((page) => page.data.posts);

  if (isLoading) return <Loader />;

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
    <div className="space-y-4">
      <PostCreationForm />
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} isPostDetails={false} />
      ))}
      {hasNextPage && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
