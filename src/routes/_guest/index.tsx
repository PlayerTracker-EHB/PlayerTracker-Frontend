import CallToAction from "@/components/landing/CallToAction";
import CoverSection from "@/components/landing/CoverSection";
import FeatureSection from "@/components/landing/FeatureSection";
import SplashScreen from "@/components/landing/SplashScreen";
import Info from "@/components/ui/info";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_guest/")({
  component: Index,
});

function Index() {
  const [splashFinished, setSplashFinished] = useState(false);

  return !splashFinished ? (
    <SplashScreen onFinish={() => setSplashFinished(true)} />
  ) : (
    <div>
      <Info />
      <CoverSection />
      <FeatureSection />
      <CallToAction />
    </div>
  );
}
