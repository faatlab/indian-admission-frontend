import React from 'react'

function Privacy() {
  return (
    <div className=" mt-20 mb-20 max-w-5xl mx-auto px-4 py-8 text-sm text-orange-900 bg-orange-50 border border-orange-200 rounded-md leading-relaxed">
      <h1 className="text-2xl font-semibold text-orange-700 mb-6 text-center">
        Privacy Policy
      </h1>

      {/* Section 1 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">1. Introduction</h2>
        <p>
          This Privacy Policy explains how we collect, use, and protect your information when you use our platform for Indian college admissions.
          By using our services, you consent to the practices outlined in this policy.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">2. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Personal details (name, phone, email, location)</li>
          <li>Academic records (marks, board, stream, year of passing)</li>
          <li>Application data for counselling or college selection</li>
          <li>Device and browser data (for analytics and security)</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">3. How We Use Your Data</h2>
        <p>
          We use your information to:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Match you with relevant colleges and programs</li>
          <li>Send updates about deadlines and admission alerts</li>
          <li>Provide counselling and support services</li>
          <li>Improve our platform and personalize your experience</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">4. Data Sharing & Third Parties</h2>
        <p>
          We do not sell or rent your data. We may share your information with trusted partners (e.g., colleges or counsellors) only for
          admission purposes and with your consent. We may disclose data if required by law.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">5. Communication</h2>
        <p>
          You agree to receive communication from us via email, SMS, and WhatsApp regarding your admission journey. You may opt out of
          marketing messages but not essential service updates.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">6. Data Security</h2>
        <p>
          We implement industry-standard security practices to protect your data. While we strive to safeguard information, no method of
          transmission over the Internet is 100% secure.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">7. User Rights</h2>
        <p>
          You may request access to your data, corrections, or deletion by contacting our support team. We will respond within a reasonable
          timeframe.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">8. Cookies & Tracking</h2>
        <p>
          We use cookies to analyze usage patterns, enhance performance, and improve your experience. You can manage cookie preferences
          through your browser settings.
        </p>
      </section>

      {/* Section 9 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">9. Updates to Policy</h2>
        <p>
          We may update this Privacy Policy occasionally. Changes will be posted on this page. Continued use of the platform constitutes
          acceptance of the revised policy.
        </p>
      </section>

      {/* Section 10 */}
      <section className="mb-5">
        <h2 className="font-medium text-orange-600 mb-2">10. Contact</h2>
        <p>
          If you have any questions or concerns about this policy, you can reach us at: 
          <span className="block mt-1 text-orange-700 font-medium">support@yourplatform.com</span>
        </p>
      </section>

      <p className="text-xs text-orange-700 text-center mt-6">
        Last updated: May 2025
      </p>
    </div>
  )
}

export default Privacy
