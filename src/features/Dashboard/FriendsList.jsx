import React from 'react';
import { useGetUserFriendsQuery } from '../../app/Services/userApi';

export default function FriendsList() {
  const { data: friends, isLoading, error } = useGetUserFriendsQuery((1));

  // Handle loading state
  if (isLoading) {
    return <div>Loading friends...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading friends.</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Friends</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {friends?.friends?.map((friend) => (
          <div key={friend.id} className="flex items-center gap-x-3">
            <img
              className="h-10 w-10 rounded-full"
              src={friend.profile_picture || 'https://via.placeholder.com/150'} // Fallback if no image URL
              alt={friend.name}
            />
            <span className="text-sm font-medium text-gray-900">{friend.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
