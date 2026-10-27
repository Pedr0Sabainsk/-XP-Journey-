import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";


const NAV_LINKS = [
  { to: "/mapa", label: "Mapa" },
  { to: "/journey", label: "Journey" },
  { to: "/academy", label: "Academy" },
  { to: "/pass", label: "XP Pass" },
  { to: "/pass-premium", label: "Premium" },
  { to: "/objetivos", label: "Meus objetivos" },
  { to: "/projeto", label: "Produto e Viabilidade" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-navbar">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link to="/" className="flex shrink-0 items-center py-2" aria-label="XP Journey — início">
          <img src="/xp-journey-mark.png" alt="" className="h-9 w-9 object-contain" /><span className="ml-2 font-display text-lg font-extrabold tracking-tight">XP <span className="text-brand">Journey</span></span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-foreground lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="transition-colors duration-200 hover:text-brand"
              activeProps={{ className: "text-brand" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            to="/mapa"
            className="hidden rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground transition-colors duration-200 hover:bg-brand2 sm:inline-flex"
          >
            Começar
          </Link>
          <Button variant="ghost" size="icon"
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-line text-foreground lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="border-t border-line bg-navbar lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-card"
                activeProps={{ className: "text-brand" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/mapa"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-brand px-6 py-3 text-center text-sm font-semibold text-brand-foreground transition-colors duration-200 hover:bg-brand2"
            >
              Começar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background font-body text-foreground antialiased">
      <SiteNav />
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-70 hero-texture"></div>
        {children}
      </div>
      <footer className="relative z-10 border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-xs text-mist sm:px-8">
          <div className="flex items-center gap-4">
            <img src="/xp-journey-mark.png" alt="" className="h-6 w-6 object-contain" /><strong>XP Journey</strong>
            <span>Conceito de produto — não é uma oferta real</span>
          </div>
          <div className="flex gap-5">
            <Link to="/journey" className="transition-colors duration-200 hover:text-foreground">
              Journey
            </Link>
            <Link to="/academy" className="transition-colors duration-200 hover:text-foreground">
              Academy
            </Link>
            <Link to="/pass" className="transition-colors duration-200 hover:text-foreground">
              XP Pass
            </Link>
            <Link to="/pass-premium" className="transition-colors duration-200 hover:text-foreground">
              Premium
            </Link>
            <Link to="/projeto" className="transition-colors duration-200 hover:text-foreground">O projeto</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function SaveNotice() {
  return (
    <div className="mt-4 text-xs text-mist">
      <span>Progresso temporário · disponível durante esta sessão da aba.</span>
    </div>
  );
}
