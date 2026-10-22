import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { SinglePostResponse } from "../Types/post.types";

export default function usePost(id?: string) {
  async function getSinglePost() {
    const { data } = await axios.get<SinglePostResponse>(
      `https://route-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      },
    );
    return data.data.post;
  }

  return useQuery({
    queryKey: ["PostDetails", id],
    queryFn: getSinglePost,
    enabled: !!id,
  });
}
