"use client";

import Image from "next/image";
import Link from "next/link";
import { Header as HeaderType } from "@/lib/types";

interface HeaderProps {
  header?: HeaderType;
}

/**
 * Helper function to extract text from Contentstack rich text object
 */
function extractTextFromRichText(richText: any): string {
  if (!richText) return '';
  if (typeof richText === 'string') return richText;
  
  // If it's a rich text object with children
  if (richText.children && Array.isArray(richText.children)) {
    return richText.children
      .map((child: any) => {
        if (child.text) return child.text;
        if (child.children) return extractTextFromRichText(child);
        return '';
      })
      .join('');
  }
  
  return '';
}

/**
 * Header component that displays the site logo and navigation menu
 * @param header - The header data from Contentstack
 */
export default function Header({ header }: HeaderProps) {
  if (!header) return null;

  const announcementText = extractTextFromRichText(header.announcement_text);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Announcement Banner */}
      {announcementText && (
        <div 
          className="bg-blue-600 text-white py-2 px-4 text-center text-sm font-medium" 
          {...(header?.$ && header.$.announcement_text)}
        >
          {announcementText}
        </div>
      )}
      
      <div className="max-w-(--breakpoint-md) mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            {header.logo ? (
              <Link href="/">
                <Image
                  src={header.logo.url}
                  alt={header.logo.title || "Site Logo"}
                  width={250}
                  height={100}
                  className="h-12 w-auto"
                  {...(header.logo?.$ && header.logo.$.url)}
                />
              </Link>
            ) : (
              <Link href="/" className="text-2xl font-bold text-gray-900">
                {header.title}
              </Link>
            )}
          </div>

          {/* Navigation Menu */}
          {header.navigation_menu && header.navigation_menu.length > 0 && (
            <nav className="hidden md:flex space-x-8" {...(header?.$ && header.$.navigation_menu)}>
              {header.navigation_menu.map((item, index) => {
                // Skip items with empty titles
                if (!item.title || item.title.trim() === '') return null;
                
                return (
                  <Link
                    key={index}
                    href={item.url || '/'}
                    className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                    {...(item?.$ && item.$)}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Mobile Menu Button */}
          {header.navigation_menu && header.navigation_menu.length > 0 && (
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {header.navigation_menu && header.navigation_menu.length > 0 && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            {header.navigation_menu.map((item, index) => {
              // Skip items with empty titles
              if (!item.title || item.title.trim() === '') return null;
              
              return (
                <Link
                  key={index}
                  href={item.url || '/'}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  {...(item?.$ && item.$)}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}