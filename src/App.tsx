import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import ToshibaHiWallAC from "./pages/ToshibaHiWallAC";
import ToshibaCassetteAC from "./pages/ToshibaCassetteAC";
import ToshibaDuctedAC from "./pages/ToshibaDuctedAC";
import ToshibaVRFSystem from "./pages/ToshibaVRFSystem";
import CarrierWindowAC from "./pages/CarrierWindowAC";
import CarrierHiWallAC from "./pages/CarrierHiWallAC";
import CarrierDuctedAC from "./pages/CarrierDuctedAC";
import CarrierCassetteAC from "./pages/CarrierCassetteAC";
import CarrierSlimpakAC from "./pages/CarrierSlimpakAC";
import CarrierPackagedAC from "./pages/CarrierPackagedAC";
import CarrierVRFSystem from "./pages/CarrierVRFSystem";
import MideaWindowAC from "./pages/MideaWindowAC";
import MideaHomeAppliances from "./pages/MideaHomeAppliances";
import MideaHiWallAC from "./pages/MideaHiWallAC";
import Services from "./pages/Services";
import Clients from "./pages/Clients";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import ResetScroll from "@/components/ResetScroll";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ResetScroll />
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
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
