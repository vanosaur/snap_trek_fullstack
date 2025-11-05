"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null; // render nothing until check finishes

  return <>{children}</>;
}
