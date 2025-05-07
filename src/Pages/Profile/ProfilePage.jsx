import React, { useState } from 'react';
// import tick from '../../assets/tick.svg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [isUploaded, setIsUploaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const getBorderClass = () => {
    if (isUploaded) {
      return isHovering ? 'border-red-300' : 'border-green-300';
    }
    return 'border-dashed border-gray-300 hover:border-orange-500';
  };

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  return (
    <div className="min-h-screen bg-white px-6 py-8 md:px-16 w-3/4 mx-auto mt-15">
      <div className="flex justify-between items-start flex-wrap gap-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome, Amanda
          </h1>
          <p className="text-sm text-gray-500">{today}</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-white bg-[#FF7043]   hover:bg-orange-600 focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-8  py-3 text-center me-2 mb-2"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Profile Image & Info */}
      <div className="mt-8 flex items-center gap-4">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="User"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Alexa Rawles</h2>
          <p className="text-sm text-gray-500">alexarawles@gmail.com</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            disabled={!isEditing}
            placeholder="Your First Name"
            className="w-full bg-gray-100 rounded-lg px-4 py-2 text-sm outline-none disabled:opacity-70"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="text"
            disabled={!isEditing}
            placeholder="Enter your email"
            className="w-full bg-gray-100 rounded-lg px-4 py-2 text-sm outline-none disabled:opacity-70"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            disabled={!isEditing}
            className="w-full bg-gray-100 rounded-lg px-4 py-2 text-sm outline-none disabled:opacity-70"
          >
            <option>Your First Name</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <input
            type="text"
            disabled={!isEditing}
            placeholder="Your First Name"
            className="w-full bg-gray-100 rounded-lg px-4 py-2 text-sm outline-none disabled:opacity-70"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            disabled={!isEditing}
            className="w-full bg-gray-100 rounded-lg px-4 py-2 text-sm outline-none disabled:opacity-70"
          >
            <option>Your First Name</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            disabled={!isEditing}
            placeholder="Your First Name"
            className="w-full bg-gray-100 rounded-lg px-4 py-2 text-sm outline-none disabled:opacity-70"
          />
        </div>
      </div>
      <div className="mt-10">
        <label className="block text-lg font-semibold text-gray-800 mb-4">
          Upload Documents
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500">
            <p className="text-sm text-gray-600">10th Marksheet</p>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500">
            <p className="text-sm text-gray-600">12th Marksheet</p>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500">
            <p className="text-sm text-gray-600">Transfer Certificate (TC)</p>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500">
            <p className="text-sm text-gray-600">Community Certificate</p>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500">
            <p className="text-sm text-gray-600">Passport Size Photo</p>
          </div>
          <div
            className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-colors duration-300 ${getBorderClass()}`}
            onClick={() => {
              if (isUploaded && isHovering) {
                setIsUploaded(false); // delete file
              } else if (!isUploaded) {
                setIsUploaded(true); // simulate file upload
              }
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="flex items-center justify-center gap-1 text-sm">
              {isUploaded ? (
                isHovering ? (
                  <span className="flex items-center text-red-500 gap-1">
                    <DeleteIcon fontSize="small" />
                    Remove
                  </span>
                ) : (
                  <span className="flex items-center text-gray-600 gap-1">
                    Aadhaar / ID Proof
                    <CheckCircleIcon
                      className="text-green-500"
                      fontSize="small"
                    />
                  </span>
                )
              ) : (
                <span className="text-gray-600">Aadhaar / ID Proof</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
