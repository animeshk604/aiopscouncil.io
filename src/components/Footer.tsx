import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-display font-bold gradient-text">∆</span>
            <span className="text-sm font-display font-semibold text-foreground tracking-wider">
              AI Ops Council
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            The private guild for real AI operators.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Navigate</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
            <Link to="/operators" className="hover:text-primary transition-colors">Operators</Link>
            <Link to="/join" className="hover:text-primary transition-colors">Join</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Contact Us</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href="mailto:contact@aiopscouncil.io" className="hover:text-primary transition-colors flex items-center gap-2">
              <Mail size={14} />
              contact@aiopscouncil.io
            </a>
            <a href="mailto:sales@aiopscouncil.io" className="hover:text-primary transition-colors flex items-center gap-2">
              <Mail size={14} />
              sales@aiopscouncil.io
            </a>
            <a href="mailto:support@aiopscouncil.io" className="hover:text-primary transition-colors flex items-center gap-2">
              <Mail size={14} />
              support@aiopscouncil.io
            </a>
          </div>
        </div>

        {/* Membership */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Members</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/login" className="hover:text-primary transition-colors">Member Login</Link>
            <Link to="/membership" className="hover:text-primary transition-colors">Membership</Link>
            <a href="mailto:membership@aiopscouncil.io" className="hover:text-primary transition-colors">
              membership@aiopscouncil.io
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} AI Ops Council. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Built by operators, for operators.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
