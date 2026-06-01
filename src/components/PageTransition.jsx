"use client";

export default function PageTransition({ navbar, children }) {
  return (
    <div className="flex-1 flex flex-col w-full min-h-screen">
      {navbar}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}