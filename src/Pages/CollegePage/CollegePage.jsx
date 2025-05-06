import { ChevronLeft } from 'lucide-react'
import React from 'react'
import university2 from '../../assets/university2.svg';


function CollegePage() {
  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 font-sans">
    {/* Header */}
    <div className="flex items-center gap-2 mb-6">
      <button className="text-purple-600">
        <ChevronLeft />
      </button>
      <h2 className="text-xl font-semibold text-gray-800">Select Course</h2>
    </div>

    {/* Institution Info */}
    <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-50 to-white border border-orange-200 shadow hover:shadow-md transition-all flex items-center justify-between">
      <div>
        <p className="text-base font-medium text-gray-800">Indian Institute of Technology Madras</p>
        <p className="text-sm text-gray-500">Chennai, Tamil Nadu</p>
      </div>
      <img
        src={university2}
        alt="IIT Madras Logo"
        className="w-14 h-14 object-contain"
      />
    </div>

    {/* Course Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      {/* Card 1 */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 w-full max-w-sm mx-auto border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Bachelor of Science in Physics
      </h3>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="text-gray-500">Duration</span>
          <span className="text-blue-600 font-medium">1 Year</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tuition Fee (1st Year)</span>
          <span className="text-blue-600 font-medium">$64.3</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Level</span>
          <span className="text-blue-600 font-medium">Bachelor</span>
        </div>
      </div>
    </div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 w-full max-w-sm mx-auto border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Bachelor of Science in Physics
      </h3>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="text-gray-500">Duration</span>
          <span className="text-blue-600 font-medium">1 Year</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tuition Fee (1st Year)</span>
          <span className="text-blue-600 font-medium">$64.3</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Level</span>
          <span className="text-blue-600 font-medium">Bachelor</span>
        </div>
      </div>
    </div>
      {/* Card 3 */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 w-full max-w-sm mx-auto border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Bachelor of Science in Physics
      </h3>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="text-gray-500">Duration</span>
          <span className="text-blue-600 font-medium">1 Year</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tuition Fee (1st Year)</span>
          <span className="text-blue-600 font-medium">$64.3</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Level</span>
          <span className="text-blue-600 font-medium">Bachelor</span>
        </div>
      </div>
    </div>

      {/* Card 4 */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 w-full max-w-sm mx-auto border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Bachelor of Science in Physics
      </h3>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="text-gray-500">Duration</span>
          <span className="text-blue-600 font-medium">1 Year</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tuition Fee (1st Year)</span>
          <span className="text-blue-600 font-medium">$64.3</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Level</span>
          <span className="text-blue-600 font-medium">Bachelor</span>
        </div>
      </div>
    </div>

      {/* Card 5 */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 w-full max-w-sm mx-auto border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Bachelor of Science in Physics
      </h3>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="text-gray-500">Duration</span>
          <span className="text-blue-600 font-medium">1 Year</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tuition Fee (1st Year)</span>
          <span className="text-blue-600 font-medium">$64.3</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Level</span>
          <span className="text-blue-600 font-medium">Bachelor</span>
        </div>
      </div>
    </div>

      {/* Card 6 */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 w-full max-w-sm mx-auto border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Bachelor of Science in Physics
      </h3>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="text-gray-500">Duration</span>
          <span className="text-blue-600 font-medium">1 Year</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tuition Fee (1st Year)</span>
          <span className="text-blue-600 font-medium">$64.3</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Level</span>
          <span className="text-blue-600 font-medium">Bachelor</span>
        </div>
      </div>
    </div>
    </div>
  </div>
  )
}

export default CollegePage
