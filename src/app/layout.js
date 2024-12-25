import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import ClientWrapper from "@/components/common/ClientWrapper";
import { SidebarProvider } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";
import { Variable } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Grand Todo",
  description: "Todo App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          inter.variable
        )}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <SidebarProvider>
            <ClientWrapper>{children}</ClientWrapper>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
