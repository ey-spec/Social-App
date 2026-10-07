// src/Components/Posts/PostCard.tsx
import { formatDate, timeAgo } from "../../Helpers/formatDate";
import type { Post } from "../../Types/post.types";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

export default function PostCard({ post }: { post: Post }) {
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

        <button
          type="button"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <FaComment className="w-4 h-4" />
          <span>{post.commentsCount}</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <FaShare className="w-4 h-4" />
          <span>{post.sharesCount}</span>
        </button>
      </div>
      {/* Top comment */}
      {post.topComment && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-start gap-2.5">
            <img
              src={post.topComment.commentCreator.photo}
              alt={post.topComment.commentCreator.name}
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />

            <div className="min-w-0">
              <div className="bg-gray-50 rounded-2xl px-3.5 py-2">
                <h4 className="text-xs font-semibold text-gray-900">
                  {post.topComment.commentCreator.name}
                </h4>
                <p className="text-sm text-gray-700 break-words whitespace-pre-line">
                  {post.topComment.content}
                </p>
              </div>

              {post.topComment.image && (
                <img
                  src={post.topComment.image}
                  alt="Comment attachment"
                  loading="lazy"
                  className="mt-2 max-h-48 rounded-xl border border-gray-100 object-cover"
                />
              )}

              <p className="mt-1 ml-3 text-xs text-gray-400">
                {timeAgo(post.topComment.createdAt)}
                {post.commentsCount > 1 && (
                  <span> · View all {post.commentsCount} comments</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
