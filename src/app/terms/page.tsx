import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const Page = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Valentine Messages, you accept and agree to be bound by the terms and 
                provisions of this agreement. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p>
                Valentine Messages provides a platform for creating and sharing personalized valentine messages.
                We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Conduct</h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the service for any unlawful purpose</li>
                <li>Post inappropriate, offensive, or harmful content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with other users&apos; enjoyment of the service</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. User Content</h2>
              <p>
                By posting content on Valentine Messages, you grant us a non-exclusive, worldwide, royalty-free
                license to use, modify, publicly display, and distribute such content on our platform. You are
                solely responsible for the content you post.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
              <p>
                All content, features, and functionality of Valentine Messages are owned by us and are protected
                by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Disclaimer of Warranties</h2>
              <p>
                The service is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, either
                express or implied. We do not guarantee that the service will be uninterrupted, secure, or
                error-free.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p>
                We shall not be liable for any indirect, incidental, special, consequential, or punitive
                damages resulting from your use of or inability to use the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material
                changes by posting the new terms on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction],
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
              <p>
                For any questions about these Terms of Service, please contact us at:<br />
                Email: tonnykamau6@gmail.com<br />
                Address: Nakuru
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