import { FaImage, FaPaperPlane } from "react-icons/fa";

export default function PostCreationForm() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-lg shadow-indigo-100/60 p-5">
      <textarea
        rows={3}
        placeholder="What's on your mind?"
        className="w-full resize-none rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 border border-transparent focus:outline-none focus:border-indigo-300 focus:bg-white transition-colors"
      />

      <img
        src="https://placehold.co/600x300"
        alt="Selected"
        className="mt-3 w-full max-h-64 object-cover rounded-xl border border-gray-100"
      />

      <div className="mt-3 flex items-center justify-between">
        <label
          htmlFor="post-image"
          className="flex items-center gap-2 cursor-pointer rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
        >
          <FaImage className="w-4 h-4" />
          <span>Photo</span>
        </label>
        <input id="post-image" type="file" accept="image/*" hidden />

        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          <FaPaperPlane className="w-3.5 h-3.5" />
          <span>Post</span>
        </button>
      </div>
    </div>
  );
}