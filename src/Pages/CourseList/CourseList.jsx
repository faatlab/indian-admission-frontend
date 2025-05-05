import React from 'react';

import course1 from '../../assets/course1.svg';
import course2 from '../../assets/course2.svg';
import course3 from '../../assets/course3.svg';
import save from '../../assets/save.svg';

function CourseList() {
  const totalStars = 5;
  const renderStars = (rating) =>
    Array.from({ length: totalStars }).map((_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  return (
    <div>
      <div className="flex justify-between items-center mx-30 my-20">
        <h2 className="text-3xl font-black text-[#535353]">Trending Courses</h2>{' '}
      </div>
      <div className=" flex flex-row items-center gap-6 justify-center flex-wrap mt-3 mb-20">
        {/* Card 1 */}
            <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white gap-2">
            <div className="flex flex-col justify-between p-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Bachelor of Computer Applications
                </h2>
                <div className="flex items-center space-x-1">
                {renderStars(3)}
                <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                    <img src={save} alt="" />
                </span>
                </div>
            </div>
            <img src={course1} alt="BCA" className="w-40 object-cover" />
            </div>

        {/* Card 2 */}
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Information Technology
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(4)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course2} alt="BIT" className="w-40 object-cover" />
        </div>

        {/* Card 3 */}
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Data Science
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(5)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course3} alt="BDS" className="w-40 object-cover" />
        </div>
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Data Science
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(5)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course3} alt="BDS" className="w-40 object-cover" />
        </div>
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Data Science
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(5)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course3} alt="BDS" className="w-40 object-cover" />
        </div>
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Data Science
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(5)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course3} alt="BDS" className="w-40 object-cover" />
        </div>
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white gap-2">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Computer Applications
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(3)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course1} alt="BCA" className="w-40 object-cover" />
        </div>

        {/* Card 2 */}
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Information Technology
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(4)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course2} alt="BIT" className="w-40 object-cover" />
        </div>
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Information Technology
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(4)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course2} alt="BIT" className="w-40 object-cover" />
        </div>
      </div>
      <div className=" flex flex-row items-center gap-6 justify-center flex-wrap mt-3 mb-20">
        {/* Card 1 */}
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white gap-2">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Computer Applications
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(3)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course1} alt="BCA" className="w-40 object-cover" />
        </div>

        {/* Card 2 */}
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Information Technology
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(4)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course2} alt="BIT" className="w-40 object-cover" />
        </div>

        {/* Card 3 */}
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Data Science
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(5)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course3} alt="BDS" className="w-40 object-cover" />
        </div>
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Data Science
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(5)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course3} alt="BDS" className="w-40 object-cover" />
        </div>
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Data Science
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(5)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course3} alt="BDS" className="w-40 object-cover" />
        </div>
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Data Science
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(5)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course3} alt="BDS" className="w-40 object-cover" />
        </div>
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white gap-2">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Computer Applications
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(3)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course1} alt="BCA" className="w-40 object-cover" />
        </div>

        {/* Card 2 */}
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Information Technology
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(4)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course2} alt="BIT" className="w-40 object-cover" />
        </div>
        <div className="flex w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white">
          <div className="flex flex-col justify-between p-4 flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Bachelor of Information Technology
            </h2>
            <div className="flex items-center space-x-1">
              {renderStars(4)}
              <span className="ml-auto text-gray-600 text-lg cursor-pointer">
                <img src={save} alt="" />
              </span>
            </div>
          </div>
          <img src={course2} alt="BIT" className="w-40 object-cover" />
        </div>
      </div>

      <div className="w-full flex justify-center mt-10 mb-17">
      <div className="flex space-x-4">
        <button className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
          previous page
        </button>
        <button className="px-6 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition">
          Next Page
        </button>
      </div>
    </div>
    </div>
  );
}

export default CourseList;
