import { RadarComponent } from "@/components/radar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="p-4 grid content-center min-h-screen lg:px-40 xl:px-60 2xl:px-80">
      <RadarComponent/>
    </main>
  );
}
