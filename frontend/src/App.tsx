import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Team from '@/pages/Team';
import Book from '@/pages/Book';
import Admin from '@/pages/Admin';
import Gallery from '@/pages/Gallery';

// Root route with Layout wrapper
const rootRoute = createRootRoute({
    component: () => (
        <Layout>
            <Outlet />
        </Layout>
    ),
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
});

const servicesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/services',
    component: Services,
});

const teamRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/team',
    component: Team,
});

const bookRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/book',
    component: Book,
});

const adminRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin',
    component: Admin,
});

const galleryRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/gallery',
    component: Gallery,
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    servicesRoute,
    teamRoute,
    bookRoute,
    adminRoute,
    galleryRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

export default function App() {
    return <RouterProvider router={router} />;
}
