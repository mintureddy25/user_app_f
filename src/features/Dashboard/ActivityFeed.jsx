import React from 'react';

export default function ActivityFeed({ user }) {
  // Helper function to format the last login timestamp to "YYYY-MM-DD HH:mm:ss"
  const formatTimestamp = (date) => {
    const d = new Date(date);

    // Extract the components of the date
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const activityFeed = [
    { 
      message: `Welcome back, ${user.name}!`, 
      timestamp: `You last logged in at ${formatTimestamp(user.last_login)}`  // Display formatted timestamp
    },
    { 
      message: 'You have 3 new notifications.',
      timestamp: 'Yesterday'
    }
  ];

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
