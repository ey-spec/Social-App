import { timeAgo } from "../../Helpers/formatDate";
import type { Comment } from "../../Types/post.types";

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="flex items-start gap-2.5">
      <img
        src={comment.commentCreator.photo}
        alt={comment.commentCreator.name}
        className="w-8 h-8 rounded-full object-cover shrink-0"
      />
      <div className="min-w-0">
        <div className="bg-gray-50 rounded-2xl px-3.5 py-2">
          <h4 className="text-xs font-semibold text-gray-900">
            {comment.commentCreator.name}
          </h4>
          <p className="text-sm text-gray-700 break-words whitespace-pre-line">
            {comment.content}
          </p>
        </div>
        {comment.image && (
          <img
            src={comment.image}
            alt="Comment attachment"
            loading="lazy"
            className="mt-2 max-h-48 rounded-xl border border-gray-100 object-cover"
          />
        )}
        <p className="mt-1 ml-3 text-xs text-gray-400">
          {timeAgo(comment.createdAt)}
        </p>
      </div>
    </div>
  );
}
