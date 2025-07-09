"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import logoImg from "@/public/2870556.png";
import { Button } from "./ui/button";
import { CoinPurchaseModalComponent } from "./coin-purchase-modal";

const Header = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  const [coins, setCoins] = React.useState(0);

  useEffect(() => {}, [isLogin]);

  return (
    <header className="sticky top-0 bg-slate-700 h-16 md:h-20 px-5 py-3 flex justify-between items-center text-white drop-shadow-xl">
      <div className="flex items-center">
        <Image
          src={logoImg}
          alt="logo"
          width={50}
          height={50}
          className="w-10 h-10 md:w-12 md:h-12"
        />
        <span className="text-2xl md:text-3xl font-bold ml-2">
          Laughing Journal
        </span>
        {isLogin && <CoinPurchaseModalComponent />}
      </div>

      {!isLogin ? (
        <Button
          className="ml-auto text-sm md:text-base"
          onClick={() => setIsLogin(true)}
        >
          Login
        </Button>
      ) : (
        <div className="flex items-center gap-3">
          <Button className="text-sm md:text-base">Write</Button>
          <Button
            className="text-sm md:text-base"
            onClick={() => setIsLogin(false)}
          >
            Logout
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
