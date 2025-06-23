"use client";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function TopLoadingBar() {
  const { isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);

  return null;
}
