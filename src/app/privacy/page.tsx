import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const Page = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p>
                Welcome to Valentine Messages. We respect your privacy and are committed to protecting your personal data.
                This privacy policy explains how we handle your information when you use our valentine message generator service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              <p className="mb-4">We collect and process the following information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and social media handles (when provided in comments)</li>
                <li>Message content and comments you create</li>
                <li>Technical data including browser type and IP address</li>
                <li>Usage data about how you interact with our service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Generate personalized valentine messages</li>
                <li>Display your comments and social media links</li>
                <li>Improve our service and user experience</li>
                <li>Ensure the security of our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Storage and Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information.
                Your data is stored securely and we regularly review our security practices to ensure your information remains safe.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request transfer of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Cookies</h2>
              <p>
                We use cookies to enhance your experience on our website. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:<br />
                Email: tonnykamau6@gmail.com<br />
                Address: Nakuru
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Updates to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. The latest version will always be posted on this page,
                with the last updated date clearly indicated.
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Last updated: February 14, 2025
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;