import { createFileRoute, redirect } from "@tanstack/react-router";

// A página de entrada é a apresentação unificada: Produto + Viabilidade.
export const Route = createFileRoute("/")({
  beforeLoad: () => { throw redirect({ to: "/projeto", replace: true }); },
});
