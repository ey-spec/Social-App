// src/Components/Comments/CommentForm.tsx
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaPlus, FaPaperPlane, FaTimes } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { showErrorToast, showSuccessToast } from "../../lib/toast";
import { useState } from "react";

interface commentData {
  content: string;
  image: FileList;
}

export default function CommentForm({ postId }: { postId: string }) {
  const [imageSrc, setimageSrc] = useState("");

  const { register, handleSubmit, reset } = useForm<commentData>({
    defaultValues: {
      content: "",
    },
  });

  const { onChange: onImageChange, ...imageField } = register("image");

   function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    onImageChange(e);
    const file = e.target.files?.[0];
    if (file) setimageSrc(URL.createObjectURL(file));
  }

  function handleAddComment(values: commentData) {
    const formData = new FormData();
    const file = values.image?.[0];
    if (!values.content && !file) return;
    if (values.content) formData.append("content", values.content);
    if (file) formData.append("image", file);

    mutate(formData);
  }

  function addComment(formData: FormData) {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      },
    );
  }

  const { isPending, mutate } = useMutation({
    mutationFn: addComment,
    onSuccess: (res) => {
      showSuccessToast(res.data.message || "Comment added");
      reset();
      setimageSrc("");
    },
    onError: (err) => {
      showErrorToast(
        axios.isAxiosError(err) ? err.message : "Something went wrong.",
      );
    },
  });

  return (
    <form
      onSubmit={handleSubmit(handleAddComment)}
      className="rounded-2xl bg-white/80 border border-white shadow-sm shadow-indigo-100/60 p-3"
    >
      {/* Image preview */}
      {imageSrc && (
        <div className="relative mb-2 w-16 h-16">
          <img
            src={imageSrc}
            alt="Selected"
            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
          />
          <button
            type="button"
            className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-gray-800 text-white hover:bg-red-500 transition-colors"
          >
            <FaTimes onClick={() => setimageSrc("")} className="w-2.5 h-2.5" />
          </button>
        </div>
      ) }

      {/* Input row */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="comment-image"
          className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <FaPlus className="w-3.5 h-3.5" />
        </label>
        <input
          id="comment-image"
          type="file"
          accept="image/*"
          hidden
          {...imageField}
          onChange={handleImageChange}
        />

        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 min-w-0 rounded-full bg-gray-50 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 border border-transparent focus:outline-none focus:border-indigo-300 focus:bg-white transition-colors"
          {...register("content")}
        />

        <button
          disabled={isPending}
          type="submit"
          className="shrink-0 flex items-center disabled:bg-slate-600 disabled:cursor-not-allowed justify-center w-9 h-9 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          {isPending ? (
            <ImSpinner9 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <FaPaperPlane className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </form>
  );
}
