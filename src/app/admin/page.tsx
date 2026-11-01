"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center p-4">
      <AdminDashboard isOpen={true} onClose={() => router.push("/")} />
    </div>
  );
}
