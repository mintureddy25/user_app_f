import React, { useState, useEffect } from "react";
import { useUpdateUserDataMutation } from "../../app/Services/userApi";


const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    profilePicture: "",
  });
  const [image, setImage] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateUserData] = useUpdateUserDataMutation();


//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get("/api/user-details");
//         setUserDetails(response.data); // Assume the response has user details
//       } catch (err) {
//         console.error("Failed to fetch user details", err);
//         setError("Failed to fetch user details.");
//       }
//     };

//     fetchUserDetails();
//   }, []);

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let updatedData = { ...userDetails };
     
      
      if (image) {
        // Convert the image to base64 and update the profile picture
        const base64Image = await convertToBase64(image);
        updatedData.profilePicture = base64Image;
      }
      const userId = 1;

      // Update the user details via API call
      const response =  await updateUserData({ userId,
        data: {
          ...updatedData
        },
      }).unwrAP();

      // Update the state with the updated user details
      setUserDetails(response.data);

      setLoading(false);
      alert("Profile updated successfully!");
    } catch (err) {
      setLoading(false);
      setError("Failed to update profile.");
      console.error(err);
    }
  };

  return (
    <div className="profile-page">
      <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Profile Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userDetails.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userDetails.email}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={userDetails.gender}
            onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={userDetails.age}
            onChange={(e) => setUserDetails({ ...userDetails, age: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            id="profile_picture"
            name="profile_picture"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {userDetails.profile_picture && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Current Profile Picture</label>
            <img
              src={userDetails.profile_picture}
              alt="Profile"
              className="mt-2 w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
