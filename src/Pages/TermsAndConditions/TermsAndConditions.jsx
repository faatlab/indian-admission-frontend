import React from 'react'

function TermsAndConditions() {
  return (
     <div className="mb-20 mt-20  max-w-5xl mx-auto px-4 py-8 text-sm text-orange-900 bg-orange-50 border border-orange-200 rounded-md leading-relaxed">
      <h1 className="text-2xl font-semibold text-orange-700 mb-6 text-center">
        Terms & Conditions
      </h1>

      {/* Section 1 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">1. Acceptance of Terms</h2>
        <p>
          By accessing or registering on this platform, you agree to these Terms and Conditions, along with our Privacy Policy.
          These terms are applicable to all students, parents, and other users seeking guidance or services for Indian college admissions.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">2. Services Provided</h2>
        <p>
          We offer admission-related information, counselling, application tracking, and reminders for Indian colleges and universities.
          However, we do not guarantee admission to any institution. Final decisions rest solely with the respective colleges or universities.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">3. User Obligations</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>You must provide accurate and up-to-date personal and academic information.</li>
          <li>Using fraudulent documents or misrepresentation may lead to disqualification or legal action.</li>
          <li>You are responsible for meeting deadlines for applications, document uploads, and fees.</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">4. Eligibility</h2>
        <p>
          Our platform is intended for students who are eligible for admission under Indian education boards (CBSE, ICSE, State Boards),
          and for those applying to colleges recognized by AICTE, UGC, or relevant state authorities.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">5. Fees & Payments</h2>
        <p>
          Some services on our platform may be paid (e.g., premium counselling, application assistance). All fee-related terms will be
          clearly communicated. No refunds will be issued once services are availed unless explicitly stated.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">6. Data Usage & Privacy</h2>
        <p>
          We collect and process your data solely for admission assistance and communication purposes. Your information will not be shared
          with third parties without your consent, except where required by law or partnering institutions. For full details, please refer
          to our <a href="#" className="text-orange-700 underline">Privacy Policy</a>.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">7. Communication</h2>
        <p>
          By signing up, you consent to receive communication from us via email, SMS, or WhatsApp related to your admission process,
          deadlines, and updates.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">8. Modifications</h2>
        <p>
          These terms may be updated from time to time. You are responsible for reviewing them periodically. Your continued use of the
          platform constitutes acceptance of any changes.
        </p>
      </section>

      {/* Section 9 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">9. Governing Law</h2>
        <p>
          These Terms shall be governed by and interpreted in accordance with the laws of India. Any disputes arising shall be subject
          to the jurisdiction of the courts located in [Your City, India].
        </p>
      </section>

      <p className="text-xs text-orange-700 text-center mt-6">
        Last updated: May 2025
      </p>
    </div>
  )
}

export default TermsAndConditions
