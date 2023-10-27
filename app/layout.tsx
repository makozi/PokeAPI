'use client';
import { Inter } from 'next/font/google';
import '../styles/index.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head />

      <body className={` dark:bg-black ${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import { Providers } from './providers';
import React from 'react';
