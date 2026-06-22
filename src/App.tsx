import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import ResetScroll from "@/components/ResetScroll";

// Route-level code splitting — the landing page ships eagerly for instant LCP,
// every other route loads on demand.
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const ToshibaHiWallAC = lazy(() => import("./pages/ToshibaHiWallAC"));
const ToshibaCassetteAC = lazy(() => import("./pages/ToshibaCassetteAC"));
const ToshibaDuctedAC = lazy(() => import("./pages/ToshibaDuctedAC"));
const ToshibaVRFSystem = lazy(() => import("./pages/ToshibaVRFSystem"));
const CarrierWindowAC = lazy(() => import("./pages/CarrierWindowAC"));
const CarrierHiWallAC = lazy(() => import("./pages/CarrierHiWallAC"));
const CarrierDuctedAC = lazy(() => import("./pages/CarrierDuctedAC"));
const CarrierCassetteAC = lazy(() => import("./pages/CarrierCassetteAC"));
const CarrierSlimpakAC = lazy(() => import("./pages/CarrierSlimpakAC"));
const CarrierPackagedAC = lazy(() => import("./pages/CarrierPackagedAC"));
const CarrierVRFSystem = lazy(() => import("./pages/CarrierVRFSystem"));
const MideaWindowAC = lazy(() => import("./pages/MideaWindowAC"));
const MideaHomeAppliances = lazy(() => import("./pages/MideaHomeAppliances"));
const MideaHiWallAC = lazy(() => import("./pages/MideaHiWallAC"));
const Services = lazy(() => import("./pages/Services"));
const Clients = lazy(() => import("./pages/Clients"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Minimal route fallback — dark to match the fixed glass header, with a
// subtly rotating brand mark so longer chunk loads don't feel inert.
const RouteFallback = () => (
  <div className="min-h-[60vh] bg-cinema flex items-center justify-center" aria-busy="true">
    <img
      src="/images/logo/ca_snowflake.webp"
      alt=""
      aria-hidden="true"
      width={316}
      height={190}
      className="h-14 w-auto object-contain opacity-80 animate-spin-slow will-change-transform"
    />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MotionConfig reducedMotion="user">
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/carrier">
          <ResetScroll />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route
                  path="/products/toshiba/hi-wall-ac"
                  element={<ToshibaHiWallAC />}
                />
                <Route
                  path="/products/toshiba/cassette-ac"
                  element={<ToshibaCassetteAC />}
                />
                <Route
                  path="/products/toshiba/ducted-ac"
                  element={<ToshibaDuctedAC />}
                />
                <Route
                  path="/products/toshiba/vrf-system"
                  element={<ToshibaVRFSystem />}
                />
                <Route
                  path="/products/carrier/window-ac"
                  element={<CarrierWindowAC />}
                />
                <Route
                  path="/products/carrier/hi-wall-ac"
                  element={<CarrierHiWallAC />}
                />
                <Route
                  path="/products/carrier/ducted-ac"
                  element={<CarrierDuctedAC />}
                />
                <Route
                  path="/products/carrier/cassette-ac"
                  element={<CarrierCassetteAC />}
                />
                <Route
                  path="/products/carrier/slimpak-ac"
                  element={<CarrierSlimpakAC />}
                />
                <Route
                  path="/products/carrier/packaged-ac"
                  element={<CarrierPackagedAC />}
                />
                <Route
                  path="/products/carrier/vrf-system"
                  element={<CarrierVRFSystem />}
                />
                <Route
                  path="/products/midea/window-ac"
                  element={<MideaWindowAC />}
                />
                <Route
                  path="/products/midea/home-appliances"
                  element={<MideaHomeAppliances />}
                />
                <Route
                  path="/products/midea/hi-wall-ac"
                  element={<MideaHiWallAC />}
                />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/services" element={<Services />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </MotionConfig>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
