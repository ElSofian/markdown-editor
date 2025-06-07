import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata: Metadata = {
  title: "Markdown Editor",
  description: "Markdown Editor is a website where you can edit your markdown files.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
			<head>
				<link rel="stylesheet" href="https://kit.fontawesome.com/a31e608af5.css" crossOrigin="anonymous" />
			</head>
      <body>
				<ToastContainer position="top-center" autoClose={2000} />
        {children}
      </body>
    </html>
  );
}
