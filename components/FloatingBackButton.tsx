"use client";

import { useRouter } from "next/navigation";

type FloatingBackButtonProps = {
  fallbackHref?: string;
};

export default function FloatingBackButton({ fallbackHref = "/" }: FloatingBackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (document.referrer) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button className="floating-back-btn" onClick={handleBack} title="回到上一頁" type="button">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      <span>点我回上页</span>
    </button>
  );
}
