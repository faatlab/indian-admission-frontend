import React, { useState } from 'react'
import { ChevronDown } from "lucide-react";

const faqs = [
    {
      question: "What is your return policy?",
      answer: "You can return any item within 30 days of purchase with a valid receipt.",
    },
    {
      question: "How do I track my order?",
      answer: "You'll receive a tracking link via email once your order has shipped.",
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes, our support team is available 24/7 via chat or email.",
    },
  ];

function Faq() {

    const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);

};

    
  return (
    <div className="max-w-dvh mx-auto px-4 py-10">
    <h1 className="text-2xl font-bold text-orange-600 mb-6 text-center">FAQs</h1>
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-orange-300 rounded-lg p-4 transition-shadow duration-300 hover:shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left text-base font-medium text-orange-700 focus:outline-none"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 text-orange-500 transform transition-transform duration-500 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                isOpen ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm text-gray-700 pl-1 pr-1 pb-1">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>    
  )
}

export default Faq
