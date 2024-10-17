import Image from "next/image";
import easyWritring from "@/public/easy_write.png";
import shareImg from "@/public/746202.png";
import safeImg from "@/public/15540138.png";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-slate-700 py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-300">
            Welcome to Laughing Journal
          </h1>
          <p className="mt-4 text-xl text-gray-100">
            Capture your travel adventures with joy and creativity!
          </p>
          <Button variant={"outline"} className="mt-8">
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-slate-300">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center flex items-center flex-col">
            <Image
              src={easyWritring}
              alt="Easy writing"
              width={150}
              height={150}
            />
            <h2 className="text-2xl font-semibold mt-4">Easy Writing</h2>
            <p className="mt-2 text-gray-600">
              Effortlessly document your journeys anywhere, anytime.
            </p>
          </div>
          <div className="text-center flex items-center flex-col">
            <Image
              src={shareImg}
              alt="Share memories"
              width={150}
              height={150}
            />
            <h2 className="text-2xl font-semibold mt-4">Share Memories</h2>
            <p className="mt-2 text-gray-600">
              Share your travel stories with friends and family.
            </p>
          </div>
          <div className="text-center flex flex-col items-center">
            <Image src={safeImg} alt="Secure" width={150} height={150} />
            <h2 className="text-2xl font-semibold mt-4">Secure</h2>
            <p className="mt-2 text-gray-600">
              Your memories are stored safely with us.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-700 py-16 text-center">
        <h2 className="text-4xl font-bold text-white">Ready to Start?</h2>
        <p className="mt-4 text-xl text-gray-300">
          Begin your travel writing journey now with Laughing Journal.
        </p>
        <button className="mt-8 px-6 py-3 bg-white text-gray-800 rounded-full hover:bg-gray-300 transition duration-300">
          Get Started
        </button>
      </section>
    </div>
  );
}
