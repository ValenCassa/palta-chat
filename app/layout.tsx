import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Main } from "./__shared/transition-provider";
import { cn } from "@/utils/cn";
import { DialogManager } from "@/components/dialog-manager";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import favicon from "./favicon.png";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Palta",
  description: "Your hub for LLMs",
  icons: {
    icon: favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(inter.className, "flex flex-col overflow-hidden")}>
          <Toaster richColors />
          <DialogManager>
            <Main>{children}</Main>
          </DialogManager>
        </body>
      </html>
    </ClerkProvider>
  );
}
