import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import mainLogo from '../../assets/main-logo.svg';
import wave from '../../assets/wave.webp';
import think from '../../assets/think.webp';
import tc from '../../assets/tc.webp';

function FooterComponent() {
  return (
    <div>
      <footer className="bg-white text-center py-12 px-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          {/* Heading & Subtitle */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            One Platform for All Your Indian College Admissions
          </h2>
          <p className="text-gray-600 mt-4 text-sm md:text-base">
            Explore courses, compare universities, track deadlines, and apply —
            all in one place, designed to simplify your admission journey in
            India.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <button className="bg-gray-100 text-gray-900 px-5 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-gray-200 transition">
              <div className="w-5">
                <img src={think} alt="" />
              </div>{' '}
              Faq
            </button>
            <button className="bg-gray-100 text-gray-900 px-5 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-gray-200 transition">
              <div className="w-5">
                <img src={tc} alt="" />
              </div>{' '}
              T&C
            </button>
           
              <button className="bg-gray-100 text-gray-900 px-5 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-gray-200 transition">
              <div className="w-5">
                <img src={wave} alt="" />
              </div>{' '}
              Contact
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-12 mb-6"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-4 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={mainLogo} alt="Indian Admission" className=" w- h-15" />
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-600">
            © 2025 Indian Admission. All Rights Reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            <a
              href="#"
              className="p-2 rounded-full border border-gray-300 text-gray-800 hover:bg-gray-100"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full border border-gray-300 text-gray-800 hover:bg-gray-100"
            >
              <FaLinkedinIn size={16} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full border border-gray-300 text-gray-800 hover:bg-gray-100"
            >
              <FaTwitter size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default FooterComponent;
