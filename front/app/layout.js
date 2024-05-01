"use client";

import '@radix-ui/themes/styles.css';
import '@radix-ui/themes/layout.css';
import './global.css';
import { Theme } from '@radix-ui/themes';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
