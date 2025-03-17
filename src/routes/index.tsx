import { BridgeForm } from "@/components/bridge/bridge-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <BridgeForm />;
}
