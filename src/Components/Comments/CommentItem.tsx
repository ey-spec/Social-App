import { useContext, useState } from "react";
import { formatDate, timeAgoShort } from "../../Helpers/formatDate";
import type { Comment } from "../../Types/post.types";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../lib/toast";

export default function CommentItem({
  comment,
  postId,
  onEdit,
  showActions = true
}: {
  comment: Comment;
  postId: string;
  onEdit?: () => void;
  showActions?: boolean;
}) {
  const [actionsClicked, setactionsClicked] = useState(false);
  const { UserId } = useContext(AuthContext);
  const queryClient = useQueryClient();

  function handleDeleteComment() {
    return axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${comment._id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      },
    );
  }

  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteComment,
    onSuccess: (res) => {
      showSuccessToast(res.data.message || "Comment Deleted");
      queryClient.invalidateQueries({
        queryKey: ["PostComments", postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["PostDetails", postId],
      });
      queryClient.invalidateQueries({ queryKey: ["AllPosts"] });
      queryClient.invalidateQueries({ queryKey: ["MyPosts"] });
    },
  });

  return (
    <div className="flex items-start gap-2.5">
      <img
        src={comment.commentCreator.photo}
        alt={comment.commentCreator.name}
        className="w-8 h-8 rounded-full object-cover shrink-0"
      />
      <div className="min-w-0">
        <div className="flex items-start gap-1">
          <div className="bg-gray-50 rounded-2xl px-3.5 py-2">
            <h4 className="text-xs font-semibold text-gray-900">
              {comment.commentCreator.name}
            </h4>
            <p className="text-sm text-gray-700 break-words whitespace-pre-line">
              {comment.content}
            </p>
          </div>

          {/* Options menu */}
          {showActions && comment.commentCreator._id === UserId && (
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setactionsClicked(!actionsClicked)}
                className="flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <FaEllipsisV className="w-3.5 h-3.5" />
              </button>

              {actionsClicked && (
                <div className="absolute right-0 top-9 z-20 w-36 rounded-xl bg-white border border-gray-100 shadow-lg shadow-indigo-100/60 py-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      onEdit?.();
                      setactionsClicked(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    <FaEdit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      mutate();
                      setactionsClicked(false);
                    }}
                    disabled={isPending}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  >
                    <FaTrash
                      className={`w-4 h-4 ${isPending ? "animate-pulse" : ""}`}
                    />
                    {isPending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {comment.image && (
          <img
            src={comment.image}
            alt="Comment attachment"
            loading="lazy"
            className="mt-2 max-h-48 rounded-xl border border-gray-100 object-cover"
          />
        )}
        <div className="mt-1 ml-3 flex items-center gap-3 text-xs text-gray-500">
          <button
            type="button"
            className="font-medium hover:text-rose-500 transition-colors"
          >
            Like
          </button>
          <button
            type="button"
            className="font-medium hover:text-indigo-600 transition-colors"
          >
            Reply
          </button>
          <time
            dateTime={comment.createdAt}
            title={formatDate(comment.createdAt)}
            className="text-gray-400"
          >
            {timeAgoShort(comment.createdAt)}
          </time>
        </div>
      </div>
    </div>
  );
}
