import { BrowserRouter, Route, Routes } from "react-router-dom";
import Carousel2 from "@/components/carousel2";
import CoverSection from "@/components/cover-section";
import About from "@/components/about";
import Footer from "@/components/footer";
import Uploader from "@/pages/Uploader";
import Team from "@/pages/Team";
import Statistics from "@/pages/Statistics";
import Accounts from "@/pages/Accounts";
import Login from "@/pages/Login";
import MyAdmin from "@/pages/MyAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* Contenu principal */}
        <div className="flex-grow">
          <Routes>
            {/* Route pour la page d'accueil */}
            <Route
              path="/"
              element={
                <div>
                  <CoverSection />
                  <hr className="w-full border-t-2 border-gray-300" />
                  <div className="bg-white flex items-center justify-center overflow-hidden">
                    <Carousel2 />
                  </div>
                  <hr className="w-full border-t-2 border-gray-300" />
                  <About />
                </div>
              }
            />
            {/* Autres routes */}
            <Route path="/uploader" element={<Uploader />} />
            <Route path="/team" element={<Team />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<MyAdmin />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
