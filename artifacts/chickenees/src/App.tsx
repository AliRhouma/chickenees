import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Homepage from "./pages/marketing/Homepage";
import MenuPage from "./pages/marketing/MenuPage";
import AboutPage from "./pages/marketing/AboutPage";
import BranchesPage from "./pages/marketing/BranchesPage";
import LocationsPage from "./pages/marketing/LocationsPage";

import AppSplash from "./pages/app/AppSplash";
import AppLogin from "./pages/app/AppLogin";
import AppProduct from "./pages/app/AppProduct";
import AppWelcome from "./pages/app/AppWelcome";
import AppHome from "./pages/app/AppHome";
import AppMenu from "./pages/app/AppMenu";
import AppCart from "./pages/app/AppCart";
import AppCheckout from "./pages/app/AppCheckout";
import AppTracking from "./pages/app/AppTracking";
import AppOrder from "./pages/app/AppOrder";
import AppOrders from "./pages/app/AppOrders";
import AppRewards from "./pages/app/AppRewards";
import AppProfile from "./pages/app/AppProfile";
import AppAddresses from "./pages/app/AppAddresses";
import AppBranches from "./pages/app/AppBranches";

import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

/* ── Route groups for targeted transition styles ───────── */
const APP_PREFIX = '/app';

function Router() {
  const [location] = useLocation();

  /* App routes slide in from the right; marketing routes fade gently */
  const isApp = location.startsWith(APP_PREFIX);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={{ opacity: 0, y: isApp ? 8 : 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: isApp ? -8 : -4 }}
        transition={{ duration: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Switch>
          {/* Marketing Routes */}
          <Route path="/" component={Homepage} />
          <Route path="/menu" component={MenuPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/locations" component={LocationsPage} />
          <Route path="/branches" component={BranchesPage} />

          {/* App Routes */}
          <Route path="/app" component={AppSplash} />
          <Route path="/app/login" component={AppLogin} />
          <Route path="/app/welcome" component={AppWelcome} />
          <Route path="/app/home" component={AppHome} />
          <Route path="/app/menu" component={AppMenu} />
          <Route path="/app/product/:id" component={AppProduct} />
          <Route path="/app/cart" component={AppCart} />
          <Route path="/app/checkout" component={AppCheckout} />
          <Route path="/app/order/:id" component={AppOrder} />
          <Route path="/app/tracking" component={AppTracking} />
          <Route path="/app/orders" component={AppOrders} />
          <Route path="/app/rewards" component={AppRewards} />
          <Route path="/app/profile" component={AppProfile} />
          <Route path="/app/addresses" component={AppAddresses} />
          <Route path="/app/branches" component={AppBranches} />

          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
