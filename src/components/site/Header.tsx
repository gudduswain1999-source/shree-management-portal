import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/admissions", label: "Admissions" },
  { to: "/placements", label: "Placements" },
  { to: "/faculty", label: "Faculty" },
  { to: "/campus-life", label: "Campus Life" },
  { to: "/result", label: "Result" },
  { to: "/enquiry", label: "Enquiry" },
  { to: "/support", label: "Support" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border shadow-sm">
      {/* Top utility bar */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="container-academic flex h-9 items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /><span>+91 98765 43210</span></span>
            <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" /><span>info@shreemanagement.edu.in</span></span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <Link to="/result" className="hover:text-gold transition-colors">Check Result</Link>
            <Link to="/admissions" className="hover:text-gold transition-colors">Apply Now</Link>
          </div>
        </div>
      </div>

      <div className="container-academic flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Shree Management Autonomous logo" width={48} height={48} className="h-12 w-12" />
          <div className="leading-tight">
            <div className="font-serif text-lg font-bold text-primary">Shree Management</div>
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Autonomous Institute</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md"
              activeProps={{ className: "px-3 py-2 text-sm font-semibold text-primary rounded-md bg-accent" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <button
          className="lg:hidden p-2 text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-academic flex flex-col py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium text-foreground/80 border-b border-border/50 last:border-0"
                activeProps={{ className: "py-2.5 text-sm font-semibold text-primary border-b border-border/50 last:border-0" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
