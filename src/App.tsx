import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router";
import { Layout } from "./components/layout/Layout";
import { CaseStudiesPage } from "./pages/CaseStudiesPage";
import { CollectivePage } from "./pages/CollectivePage";
import { ContactPage } from "./pages/ContactPage";
import { CustomPackagesPage } from "./pages/CustomPackagesPage";
import { HomePage } from "./pages/HomePage";
import { PerspectivesPage } from "./pages/PerspectivesPage";
import { PricingPage } from "./pages/PricingPage";
import { ServicesPage } from "./pages/ServicesPage";
import { TestimoniesPage } from "./pages/TestimoniesPage";

const PAGES = [
  { path: "collective", element: <CollectivePage /> },
  { path: "perspectives", element: <PerspectivesPage /> },
  { path: "services", element: <ServicesPage /> },
  { path: "case-studies", element: <CaseStudiesPage /> },
  { path: "testimonies", element: <TestimoniesPage /> },
  { path: "pricing", element: <PricingPage /> },
  { path: "custom-packages", element: <CustomPackagesPage /> },
  { path: "contact", element: <ContactPage /> },
];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          {PAGES.map((page) => (
            <Route key={page.path} path={page.path} element={page.element} />
          ))}
          {/* The old static site used .html addresses; keep those links working */}
          <Route path="index.html" element={<LegacyRedirect to="/" />} />
          {PAGES.map((page) => (
            <Route key={`${page.path}.html`} path={`${page.path}.html`} element={<LegacyRedirect to={`/${page.path}`} />} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function LegacyRedirect({ to }: { to: string }) {
  const { hash } = useLocation();
  return <Navigate to={to + hash} replace />;
}
