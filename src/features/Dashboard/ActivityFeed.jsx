// ActivityFeed.js
import React from 'react';

const activityFeed = [
  { message: 'Welcome back, Tom Cook!', timestamp: 'Today at 10:30 AM' },
  { message: 'You last logged in 2 days ago.', timestamp: '2 days ago' },
  { message: 'You have 3 new notifications.', timestamp: 'Yesterday' },
];

export default function ActivityFeed() {
  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-xl font-semibold text-gray-900">Activity Feed</h2>
      <div className="space-y-4">
        {activityFeed.map((activity, index) => (
          <div key={index} className="flex items-center text-sm text-gray-600">
            <span className="font-medium text-gray-900">{activity.message}</span>
            <span className="ml-2 text-gray-500">{activity.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
