import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border py-12 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-display font-bold gradient-text">∆</span>
          <span className="text-sm font-display font-semibold text-foreground tracking-wider">
            AI Ops Council
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <Link to="/join" className="hover:text-primary transition-colors">Join</Link>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} AI Ops Council. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
