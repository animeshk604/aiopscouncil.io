import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, PartyPopper } from "lucide-react";

const MembershipSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to membership page after 5 seconds
    const timer = setTimeout(() => {
      navigate("/membership");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="cosmic-bg min-h-screen relative">
      <div className="grid-overlay fixed inset-0 pointer-events-none" />
      <Navbar />

      <section className="relative z-10 flex items-center justify-center min-h-[80vh] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-green-500" />
          </motion.div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold gradient-text mb-4 flex items-center justify-center gap-3">
            Welcome to the Council!
            <PartyPopper className="text-yellow-500" />
          </h1>

          <p className="text-muted-foreground text-lg mb-8">
            Your membership is now active. You have full access to AI Ops Council resources, channels, and tools.
          </p>

          <div className="glass-card rounded-2xl p-6 mb-8 text-left">
            <h2 className="font-semibold mb-4">What's Next?</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                Check your email for the Discord invite
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                Introduce yourself in #introductions
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                Explore ClawAPI at dev.clawapi.io
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                Join the next office hours session
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigate("/membership")}
            className="glow-button px-8 py-3 rounded-full bg-background text-primary font-semibold"
          >
            Go to Membership Dashboard →
          </button>

          <p className="text-sm text-muted-foreground mt-4">
            Redirecting automatically in 5 seconds...
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default MembershipSuccess;
