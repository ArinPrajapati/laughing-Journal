"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins } from "lucide-react";
import coinImg from "@/public/coin_3665566.png";
import Image from "next/image";
export function CoinPurchaseModalComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [ownedCoins, setOwnedCoins] = useState(0);
  const [coins, setCoins] = useState(100);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<
    null | "success" | "error"
  >(null);

  const coinPrice = 0.1;
  const total = (coins * coinPrice).toFixed(2);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPurchasing(true);
    setPurchaseStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPurchaseStatus("success");
      setCoins(100);
      setOwnedCoins(ownedCoins + coins);
    } catch (error) {
      setPurchaseStatus("error");
    } finally {
      setTimeout(() => {
        setIsPurchasing(false);
        setPurchaseStatus(null);
        setIsOpen(false);
      }, 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="null">
          <Image src={coinImg} alt="coin" width={50} height={50} />
          <p className="text-slate-300 font-extrabold text-3xl">{`${ownedCoins}`}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-600 border-slate-900 ">
        <DialogHeader>
          <DialogTitle className="text-center text-white">
            Purchase Coins{" "}
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Buy coins to use for in-site transactions. The more you buy, the
            more you save!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handlePurchase}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="coins" className="text-right text-slate-300">
                Coins
              </Label>
              <Input
                id="coins"
                type="number"
                value={coins}
                onChange={(e) =>
                  setCoins(Math.max(1, parseInt(e.target.value) || 0))
                }
                className="col-span-3 text-slate-300"
                min="1"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 text-slate-300">
              <Label className="text-right">Total</Label>
              <div className="col-span-3 flex items-center gap-2">
                <span className="text-2xl font-bold">${total}</span>
                <span className="text-sm text-muted-foreground">
                  ({coins} coins)
                </span>
              </div>
            </div>
          </div>
          <DialogFooter className="text-blue-600">
            <Button
              type="submit"
              className="w-full my-3 bg-slate-500 hover:bg-slate-700"
              disabled={isPurchasing}
            >
              {isPurchasing ? (
                "Processing..."
              ) : (
                <>
                  <Coins className="mr-2 h-4 w-4" />
                  Purchase Coins
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
        {purchaseStatus === "success" && (
          <div className="mt-4 text-center text-green-300">
            Purchase successful! {coins} coins have been added to your account.
          </div>
        )}
        {purchaseStatus === "error" && (
          <div className="mt-4 text-center text-red-600">
            An error occurred. Please try again.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
