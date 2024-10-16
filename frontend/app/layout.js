import "./globals.css";
import { Poppins } from "next/font/google";

// Import Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '700'], // Specify weights if needed
  variable: "--font-poppins", // Optional: assign a CSS variable if you need
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
