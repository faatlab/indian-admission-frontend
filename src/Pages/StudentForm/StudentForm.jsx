import React, { useState } from 'react';

const sections = [
  'Program Info',
  'Personal Info',
  'Communication Info',
  'Educational Info',
  'Other Info',
  'Upload Docs',
];

const FormSectionSwitcher = ({ currentSection, setCurrentSection }) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {sections.map((section, index) => (
      <button
        key={index}
        onClick={() => setCurrentSection(section)}
        className={`px-4 py-2 rounded-xl shadow text-sm font-medium transition duration-300 ${
          currentSection === section
            ? 'bg-orange-500 text-white'
            : 'bg-white text-orange-500 border border-orange-500 hover:bg-orange-100'
        }`}
      >
        {section}
      </button>
    ))}
  </div>
);
const Input = ({ label, type = 'text', placeholder, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      className="border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full transition"
    />
  </div>
);

const Select = ({ label, options, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      required={required}
      className="border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full transition"
    >
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  </div>
);

function StudentForm() {
  const [currentSection, setCurrentSection] = useState('Personal Info');
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form saved!');
  };
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center  lg:my-20 my-10 ">
        <h2 className="text-3xl font-black text-[#535353]">Student Form</h2>{' '}
      </div>

      <FormSectionSwitcher
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      {currentSection === 'Personal Info' && (
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <Input label="Full Name" placeholder="Enter full name" required />
          <Input label="Date of Birth" type="date" required />
          <Select
            label="Gender"
            options={['Select', 'Male', 'Female', 'Other']}
            required
          />
          <Select
            label="Religion"
            options={['Select', 'Hindu', 'Muslim', 'Christian', 'Other']}
            required
          />
          <Input label="Caste" placeholder="Enter caste" />
          <Select
            label="Category"
            options={['Select', 'General', 'OBC', 'SC', 'ST']}
            required
          />
          <Input label="Aadhar Number" placeholder="Enter Aadhar number" />
          <Select
            label="Blood Group"
            options={[
              'Select',
              'A+',
              'A-',
              'B+',
              'B-',
              'AB+',
              'AB-',
              'O+',
              'O-',
            ]}
            required
          />
          <Select
            label="PWD (Disability)"
            options={['Select', 'Yes', 'No']}
            required
          />
          <Input
            label="Father's Name"
            placeholder="Enter father's name"
            required
          />
          <Input
            label="Father's Mobile Number"
            placeholder="Enter father's mobile number"
            required
          />
          <Input
            label="Mother's Name"
            placeholder="Enter mother's name"
            required
          />
          <Input
            label="Mother's Mobile Number"
            placeholder="Enter mother's mobile number"
            required
          />
          <Select
            label="Combined Parent Annual Income"
            options={[
              'Choose',
              '< 1 Lakh',
              '1-5 Lakhs',
              '5-10 Lakhs',
              '> 10 Lakhs',
            ]}
            required
          />
          <Select
            label="Preferred Point of Contact"
            options={['Select', 'Father', 'Mother']}
            required
          />

          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white  py-2 px-6 rounded-xl shadow-lg transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {currentSection === 'Program Info' && (
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            label="Program Name"
            placeholder="Enter the program name"
            required
          />
          <Input
            label="Specialization"
            placeholder="Enter specialization if any"
            required
          />
          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white  py-2 px-6 rounded-xl shadow-lg transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {currentSection === 'Communication Info' && (
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            label="Permanent Address"
            placeholder="Enter permanent address"
            required
          />
          <Input
            label="Correspondence Address"
            placeholder="Enter correspondence address"
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter email address"
            required
          />
          <Input
            label="Mobile Number"
            placeholder="Enter mobile number"
            required
          />
          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white  py-2 px-6 rounded-xl shadow-lg transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {currentSection === 'Educational Info' && (
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            label="10th School Name"
            placeholder="Enter 10th school name"
            required
          />
          <Input
            label="10th Board Name"
            placeholder="Enter 10th board name"
            required
          />
          <Input
            label="10th Percentage/CGPA"
            placeholder="Enter marks"
            required
          />
          <Input
            label="10th Year of Passing"
            type="number"
            placeholder="YYYY"
            required
          />
          <Input
            label="12th School Name"
            placeholder="Enter 12th school name"
            required
          />
          <Input
            label="12th Board Name"
            placeholder="Enter 12th board name"
            required
          />
          <Input
            label="12th Percentage/CGPA"
            placeholder="Enter marks"
            required
          />
          <Input
            label="12th Year of Passing"
            type="number"
            placeholder="YYYY"
            required
          />
          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white  py-2 px-6 rounded-xl shadow-lg transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {currentSection === 'Other Info' && (
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            label="Extra Curricular Activities"
            placeholder="Mention any activities"
          />
          <Input label="Hobbies" placeholder="Enter hobbies" />
          <Input label="Achievements" placeholder="Mention achievements" />
          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white  py-2 px-6 rounded-xl shadow-lg transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {currentSection === 'Upload Docs' && (
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <Input label="Upload Photo" type="file" required />
          <Input label="Upload Signature" type="file" required />
          <Input label="Upload 10th Marksheet" type="file" required />
          <Input label="Upload 12th Marksheet" type="file" required />
          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white  py-2 px-6 rounded-xl shadow-lg transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default StudentForm;
