import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-primary-deep text-primary-foreground mt-20">
      <div className="container-academic py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="" width={44} height={44} className="h-11 w-11" />
            <div>
              <div className="font-serif font-bold">Shree Management</div>
              <div className="text-[11px] uppercase tracking-widest text-gold">Autonomous</div>
            </div>
          </div>
          <p className="text-sm text-primary-foreground/75 leading-relaxed">
            A premier autonomous institute dedicated to nurturing future business
            leaders through rigorous academics, research, and industry exposure.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/academics" className="hover:text-gold">Programs</Link></li>
            <li><Link to="/admissions" className="hover:text-gold">Admissions</Link></li>
            <li><Link to="/placements" className="hover:text-gold">Placements</Link></li>
            <li><Link to="/faculty" className="hover:text-gold">Faculty</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">Student</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/result" className="hover:text-gold">Check Result</Link></li>
            <li><Link to="/enquiry" className="hover:text-gold">Enquiry</Link></li>
            <li><Link to="/support" className="hover:text-gold">Support</Link></li>
            <li><Link to="/campus-life" className="hover:text-gold">Campus Life</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">Get in Touch</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold" /> Shree Campus Road, Pune, Maharashtra 411001</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-gold" /> +91 98765 43210</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0 text-gold" /><span>info@shreemanagement.edu.in</span></li>
          </ul>
          <div className="flex gap-3 mt-4">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-gold hover:text-gold-foreground transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-academic py-5 text-xs text-primary-foreground/70 flex flex-col md:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} Shree Management Autonomous Institute. All rights reserved.</p>
          <p>Approved by AICTE · Affiliated to UGC</p>
        </div>
      </div>
    </footer>
  );
}
