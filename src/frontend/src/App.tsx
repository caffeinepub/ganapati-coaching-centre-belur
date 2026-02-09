import { RouterProvider, createRouter, createRoute, createRootRoute, Link } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/LandingPage';
import FeesPage from './pages/FeesPage';

const queryClient = new QueryClient();

// Root route with outlet
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen">
      <div id="root-outlet" />
    </div>
  ),
});

// Landing page route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

// Fees page route
const feesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/fees',
  component: FeesPage,
});

// Create router
const routeTree = rootRoute.addChildren([indexRoute, feesRoute]);
const router = createRouter({ routeTree });

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
