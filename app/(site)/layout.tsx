import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Inter } from 'next/font/google'
import { theme } from "@/theme";
import '@mantine/code-highlight/styles.css';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Robert's portfolio",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark"/>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={inter.className} style={{backgroundColor: "rgb(11, 11, 13)"}}>
        <MantineProvider theme={theme} forceColorScheme="dark">{children}</MantineProvider>
      </body>
    </html>
  );
}
