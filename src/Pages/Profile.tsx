import axios from "axios";
import React, { useContext } from "react";
import {
  FaEnvelope,
  FaBirthdayCake,
  FaVenusMars,
  FaCalendarAlt,
} from "react-icons/fa";
import type { ProfileResponse } from "../Types/user.types";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../Helpers/formatDate";
import Loader from "../Components/Common/Loader";
import type { PostsResponse } from "../Types/post.types";

import PostCard from "../Components/Posts/PostCard";
import { AuthContext } from "../context/auth.context";

export default function Profile() {
  async function getMyProfileDetails() {
    const { data } = await axios.get<ProfileResponse>(
      "https://route-posts.routemisr.com/users/profile-data",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      },
    );
    return data.data.user;
  }

  const {
    data: profile,
    isLoading: ProfileDetailsLoading,
    isError: ProfileError,
    error: ProfileErrorMessage,
  } = useQuery({
    queryKey: ["MyProfile"],
    queryFn: getMyProfileDetails,
  });

  const { UserId } = useContext(AuthContext);

  async function getMyProfilePosts() {
    const { data } = await axios.get<PostsResponse>(
      `https://route-posts.routemisr.com/users/${UserId}/posts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      },
    );
    return data.data.posts;
  }

  const {
    data: profilePosts,
    isLoading: ProfilePostsLoading,
    isError: PostsError,
    error: PostsErrorMessage,
  } = useQuery({
    queryKey: ["MyPosts"],
    queryFn: getMyProfilePosts,
    enabled: !!getMyProfileDetails,
  });

  if (ProfileDetailsLoading) {
    return <Loader />;
  }

  if (ProfileError) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red`-700">
          {ProfileErrorMessage.message}
        </div>
      </div>
    );
  }

  if (ProfilePostsLoading) {
    return <Loader />;
  }

  if (PostsError) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red`-700">
          {PostsErrorMessage.message}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Details card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-lg shadow-indigo-100/60 overflow-hidden">
        {/* Cover */}
        <div className="h-40 sm:h-52 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500">
          {profile?.cover && (
            <img
              src={profile?.cover}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="px-5 pb-6">
          {/* Avatar + name */}
          <div className="mt-6 flex flex-col items-center text-center sm:flex-row sm:items-end sm:text-left sm:gap-4">
            <img
              src={profile?.photo}
              alt="Eyad Hatem Fouad"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md bg-white"
            />
            <div className="mt-3 sm:mt-0 sm:pb-1">
              <h1 className="text-xl font-bold text-gray-900">
                {profile?.name}
              </h1>
              <p className="text-sm text-gray-500">@{profile?.username}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 divide-x divide-gray-100 rounded-xl bg-gray-50 py-3 text-center">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {profile?.followersCount}
              </p>
              <p className="text-xs text-gray-500">Followers</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {profile?.followingCount}
              </p>
              <p className="text-xs text-gray-500">Following</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {profile?.bookmarksCount}
              </p>
              <p className="text-xs text-gray-500">Saved</p>
            </div>
          </div>

          {/* Details */}
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 text-sm text-gray-700">
            <li className="flex items-center gap-3 min-w-0">
              <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-indigo-50 text-indigo-600">
                <FaEnvelope className="w-4 h-4" />
              </span>
              <span className="truncate">{profile?.email}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-indigo-50 text-indigo-600">
                <FaBirthdayCake className="w-4 h-4" />
              </span>
              {profile && formatDate(profile?.dateOfBirth)}
            </li>
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-indigo-50 text-indigo-600">
                <FaVenusMars className="w-4 h-4" />
              </span>
              <span className="capitalize">{profile?.gender}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-indigo-50 text-indigo-600">
                <FaCalendarAlt className="w-4 h-4" />
              </span>
              Joined {profile && formatDate(profile?.createdAt)}
            </li>
          </ul>
        </div>
      </div>

      {/* Posts */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Posts</h2>
        {profilePosts?.map((post) => (
          <PostCard key={post.id} post={post} isPostDetails={false} isProfile />
        ))}
      </section>
    </div>
  );
}
