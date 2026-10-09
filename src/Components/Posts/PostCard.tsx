import { Link } from "react-router-dom";
import { formatDate, timeAgo } from "../../Helpers/formatDate";
import type { CommentsResponse, Post } from "../../Types/post.types";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import CommentItem from "../Comments/CommentItem";
import CommentForm from "../Comments/CommentForm";

export default function PostCard({
  post,
  isPostDetails,
}: {
  post: Post;
  isPostDetails: boolean;
}) {
  async function getPostComments({ pageParam }: { pageParam: number }) {
    const { data } = await axios.get<CommentsResponse>(
      `https://route-posts.routemisr.com/posts/${post._id}/comments`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
        params: { page: pageParam, limit: 10 },
      },
    );
    console.log(data);

    return data;
  }

  const {
    data: allComments,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["PostComments", post._id],
    queryFn: getPostComments,
    enabled: isPostDetails,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta?.pagination.nextPage ?? undefined,
  });

  const AllComments = allComments?.pages.flatMap((page) => page.data.comments);

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
    <article className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-lg shadow-indigo-100/60 p-5">
      {/* User details */}
      <div className="flex items-center gap-3">
        <img
          src={post.user.photo}
          alt={post.user.name}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-50"
        />
        <div className="flex flex-col leading-tight">
          <h3 className="text-sm font-semibold text-gray-900">
            {post.user.name}
          </h3>
          <p className="text-xs text-gray-500">
            @{post.user.username} ·{" "}
            <time dateTime={post.createdAt} title={formatDate(post.createdAt)}>
              {timeAgo(post.createdAt)}
            </time>
          </p>
        </div>
      </div>
      {/* Post content */}
      <div className="mt-4 space-y-3">
        {post.body && (
          <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-line break-words">
            {post.body}
          </p>
        )}

        {post.image && (
          <img
            src={post.image}
            alt={post.body || `Post by ${post.user.name}`}
            loading="lazy"
            className="w-full max-h-[28rem] object-cover rounded-xl border border-gray-100"
          />
        )}
      </div>
      {/* Stats / actions */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-rose-500 transition-colors"
        >
          <FaHeart className="w-4 h-4" />
          <span>{post.likesCount}</span>
        </button>

        <Link
          to={`/${post._id}`}
          type="button"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <FaComment className="w-4 h-4" />
          <span>{post.commentsCount}</span>
        </Link>

        <button
          type="button"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <FaShare className="w-4 h-4" />
          <span>{post.sharesCount}</span>
        </button>
      </div>
      {/* Comments */}
      {isPostDetails ? (
        <>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <CommentForm
              postId={post._id}
              queryKey={
                isPostDetails ? ["PostComments", post._id] : ["AllPosts"]
              }
            />
          </div>

          {AllComments && (
            <div className="mt-4 space-y-4">
              {AllComments.length === 0 ? (
                <p className="text-center text-sm text-gray-500 py-4">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                AllComments.map((comment) => (
                  <CommentItem key={comment._id} comment={comment} />
                ))
              )}
              {hasNextPage && (
                <button
                  type="button"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="mx-auto block text-sm font-medium text-indigo-600 hover:text-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {isFetchingNextPage ? "Loading..." : "Load more comments"}
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        post.topComment && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <CommentItem comment={post.topComment} />
            {post.commentsCount > 1 && (
              <Link
                to={`/${post.id}`}
                className="mt-2 ml-10 block text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                View all {post.commentsCount} comments
              </Link>
            )}
          </div>
        )
      )}
    </article>
  );
}
