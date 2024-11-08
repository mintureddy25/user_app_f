import React, { useState, useEffect } from "react";
import { useUpdateUserDataMutation } from "../../app/Services/userApi"; 

const ProfilePage = ({ user, setShowProfile }) => {
  const [userDetails, setUserDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    gender: user?.gender || "",
    age: user?.age || "",
    profilePicture: user?.profile_picture || "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateUserData] = useUpdateUserDataMutation(); 

  
  useEffect(() => {
    if (user?.profile_picture) {
      setUserDetails({
        ...userDetails,
        profilePicture: user.profile_picture,
      });
    }
  }, [user]);

  // Handle file input change (for new image)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Save the selected image as a Blob
    }
  };

  // Handle image removal (reset state)
  const handleRemoveImage = () => {
    setImage(null);
    setUserDetails({ ...userDetails, profilePicture: null });
    document.getElementById("file-upload").value = ""; // Reset file input
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        const formData = new FormData();
        formData.append("name", userDetails.name);
        formData.append("gender", userDetails.gender);
        formData.append("age", userDetails.age);

        // Append the profile picture if available
        if (image) {
            formData.append("profilePicture", image); // Attach image file (Blob)
        }

        // Get user ID and prepare the API endpoint
        const { id } = user;
        const url = `${process.env.REACT_APP_API_URL}/user/${id}`;  // Example endpoint URL

        // Make the API call using fetch
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'token': localStorage.getItem('encodedToken'), // or from Redux state
            },
            body: formData, // Send the FormData which automatically includes the file
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        const responseData = await response.json();
        setUserDetails(responseData.data);  // Update state with the response data
        setLoading(false);
        alert("Profile updated successfully!");
        setShowProfile(false); // Close the profile form
    } catch (err) {
        setLoading(false);
        setError("Failed to update profile.");
        console.error(err);
    }
};


  // Handle cancel action (close profile form without saving)
  const handleCancel = () => {
    setShowProfile(false); // Close the profile form
  };

  return (
    <div className="profile-page">
      <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

      {/* Display error message if any */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Profile Form */}
      <form
        className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        onSubmit={handleSubmit}
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Name Input */}
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userDetails.name}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, name: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Email Input (Readonly) */}
            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userDetails.email}
                  readOnly
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-200 placeholder:text-gray-400 sm:text-sm"
                />
              </div>
            </div>

            {/* Gender Select */}
            <div className="sm:col-span-2">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-900"
              >
                Gender
              </label>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  value={userDetails.gender || ""}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, gender: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Trans">Trans</option>
                </select>
              </div>
            </div>

            {/* Age Input */}
            <div className="sm:col-span-2">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-900"
              >
                Age
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={userDetails.age || ""}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, age: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Profile Picture */}
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {userDetails.profilePicture || image ? (
                  <>
                    <img
                      src={
                        image
                          ? URL.createObjectURL(image)  
                          : userDetails.profilePicture
                      }
                      alt="Profile"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex items-center gap-x-3">
                      <button
                        type="button"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => document.getElementById("file-upload").click()}
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-50"
                        onClick={handleRemoveImage}
                      >
                        Remove
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => document.getElementById("file-upload").click()}
                  >
                    Upload Image
                  </button>
                )}
                {/* Hidden file input */}
                <input
                  type="file"
                  id="file-upload"
                  name="file-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="sm:col-span-full flex justify-end gap-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
