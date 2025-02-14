'use client';   
import React, { useState, useEffect } from 'react';
import { Heart, Mail, Twitter, Instagram, Github, Phone } from 'lucide-react';
import Link from 'next/link';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-600 hover:text-pink-600 transition-colors duration-200"
  >
    {children}
  </a>
);

const Footer: React.FC = () => {
  const [year, setYear] = useState(2024); // Default year for SSR

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="mt-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-600" />
              Valentine Messages
            </h3>
            <p className="text-gray-600">
              Create beautiful, personalized Valentine&apos;s messages for your loved ones.
              Share the love with our easy-to-use message generator.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-pink-600 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-pink-600 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <FooterLink href="https://x.com/TonnyKamau3">
                <Twitter className="h-5 w-5" />
              </FooterLink>
              <FooterLink href="https://www.instagram.com/thetonnywith2n/">
                <Instagram className="h-5 w-5" />
              </FooterLink>
              <FooterLink href="https://github.com/TonnyKamau">
                <Github className="h-5 w-5" />
              </FooterLink>
              <FooterLink href="mailto:tonnykamau6@gmail.com">
                <Mail className="h-5 w-5" />
              </FooterLink>
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <span className="font-medium">Creator:</span> Tonny Kamau
              </p>
              <a
                href="tel:+254798428931"
                className="text-gray-600 hover:text-pink-600 transition-colors duration-200 flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                +254 7** *** ***
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {year} Valentine Messages. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-sm text-gray-600 flex items-center">
                Made with <Heart className="h-4 w-4 text-pink-600 mx-1" /> by Tonny Kamau
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
