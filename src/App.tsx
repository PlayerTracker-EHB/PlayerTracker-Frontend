import Carousel2 from "@/components/carousel2";
import CoverSection from "@/components/cover-section";
import About from "@/components/about";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-screen min-h-screen">
      <CoverSection />
            <hr className="w-full border-t-2 border-gray-300" />
      <div className="bg-white flex items-center justify-center overflow-hidden">
        <Carousel2 />
      </div>
                  <hr className="w-full border-t-2 border-gray-300" />
            <About />
            <Footer/>
    </div>
  );
}
