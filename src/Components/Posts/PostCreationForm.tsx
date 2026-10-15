import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaImage, FaPaperPlane, FaTimes } from "react-icons/fa";
import { showErrorToast, showSuccessToast } from "../../lib/toast";
import { ImSpinner9 } from "react-icons/im";

interface PostData {
  body: string;
  image: FileList;
}

export default function PostCreationForm() {
  const [imageSrc, setimageSrc] = useState("");
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<PostData>({
    defaultValues: {
      body: "",
    },
  });

  const { onChange: onImageChange, ...imageField } = register("image");

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    onImageChange(e);
    const file = e.target.files?.[0];
    if (file) setimageSrc(URL.createObjectURL(file));
  }

  function handleAddPost(values: PostData) {
    const formData = new FormData();
    const file = values.image?.[0];
    if (!values.body && !file) return;
    if (values.body) formData.append("body", values.body);
    if (file) formData.append("image", file);

    mutate(formData);
  }

  function addPost(formData: FormData) {
    return axios.post(`https://route-posts.routemisr.com/posts`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
      },
    });
  }

  const { isPending, mutate } = useMutation({
    mutationFn: addPost,
    onSuccess: (res) => {
      showSuccessToast(res.data.message || "Post added");
      reset();
      setimageSrc("");
      queryClient.invalidateQueries({ queryKey: ["AllPosts"] });
    },
    onError: (err) => {
      showErrorToast(
        axios.isAxiosError(err) ? err.message : "Something went wrong.",
      );
    },
  });

  return (
    <form
      onSubmit={handleSubmit(handleAddPost)}
      className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-lg shadow-indigo-100/60 p-5"
    >
      <textarea
        rows={3}
        placeholder="What's on your mind?"
        className="w-full resize-none rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 border border-transparent focus:outline-none focus:border-indigo-300 focus:bg-white transition-colors"
        {...register("body")}
      />
      {imageSrc && (
        <div className="relative">
          <img
            src={imageSrc}
            alt="Selected"
            className="mt-3 w-full max-h-64 object-cover rounded-xl border border-gray-100"
          />
          <button
            type="button"
            className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-gray-800 text-white hover:bg-red-500 transition-colors"
          >
            <FaTimes onClick={() => setimageSrc("")} className="w-2.5 h-2.5" />
          </button>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <label
          htmlFor="post-image"
          className="flex items-center gap-2 cursor-pointer rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
        >
          <FaImage className="w-4 h-4" />
          <span>Photo</span>
        </label>
        <input
          id="post-image"
          type="file"
          accept="image/*"
          hidden
          {...imageField}
          onChange={handleImageChange}
        />

        <button
         disabled={isPending}
          type="submit"
          className="flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          {isPending ? (
            <ImSpinner9 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <FaPaperPlane className="w-3.5 h-3.5" />
              <span>Post</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
