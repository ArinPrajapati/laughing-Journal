import React from "react";
import Header from "./Header";

const RouteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default RouteLayout;
