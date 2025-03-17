import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { BackgroundBeams } from "@/components/aceternity/background-beams";

export const Route = createRootRoute({
  component: () => (
    <main className="w-full overflow-hidden">
      <Header />
      <Outlet />
      <Footer />
      <BackgroundBeams />
    </main>
  ),
});
