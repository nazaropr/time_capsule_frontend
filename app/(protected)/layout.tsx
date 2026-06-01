import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import React from "react";
import { redirect } from "next/navigation";
import { authService } from "@/services/authService";
import { UnauthorizedError } from "@/lib/errors";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    await authService.getMe();
  } catch (error) {
    if (error instanceof UnauthorizedError) redirect("/sign-in");
    throw error;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
