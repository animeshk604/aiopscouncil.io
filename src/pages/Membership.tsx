import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Check, Crown, CreditCard, LogOut } from "lucide-react";
import {
  isLoggedIn,
  getProfile,
  getMembershipStatus,
  createCheckoutSession,
  createPortalSession,
  logout,
} from "@/lib/api";

const BENEFITS = [
  "Access to private Discord channels with top AI operators",
  "Exclusive war stories & architecture reviews",
  "Early access to council-built tools (ClawAPI, etc.)",
  "Network of production AI practitioners",
  "Monthly office hours with Council Fellows",
  "Priority support for your AI projects",
];

const Membership = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [membership, setMembership] = useState<any>(null);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [profileRes, membershipRes] = await Promise.all([
        getProfile(),
        getMembershipStatus(),
      ]);
      setUser(profileRes.user);
      setMembership(membershipRes);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load membership data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const { url } = await createCheckoutSession();
      window.location.href = url;
    } catch (error: any) {
      toast({
        title: "Checkout Failed",
        description: error.message,
        variant: "destructive",
      });
      setCheckoutLoading(false);
    }
  };

  const handleManageBilling = async () => {
    try {
      const { url } = await createPortalSession();
      window.location.href = url;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="cosmic-bg min-h-screen relative flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const isActive = membership?.status === "active";

  return (
    <div className="cosmic-bg min-h-screen relative">
      <div className="grid-overlay fixed inset-0 pointer-events-none" />
      <Navbar />

      <section className="relative z-10 py-20 px-4 pt-28">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl sm:text-4xl font-bold gradient-text mb-4">
              {isActive ? "Your Membership" : "Complete Your Membership"}
            </h1>
            <p className="text-muted-foreground">
              Welcome, {user?.name}!{" "}
              {isActive
                ? "You have full access to AI Ops Council."
                : "Join the exclusive community of AI operators."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Crown className={isActive ? "text-yellow-500" : "text-muted-foreground"} />
                <h2 className="font-display text-xl font-bold">Membership Status</h2>
              </div>

              <div className={`p-4 rounded-lg mb-6 ${isActive ? "bg-green-500/10 border border-green-500/30" : "bg-muted"}`}>
                <p className="font-semibold text-lg">
                  {isActive ? "Active Member" : "Not Yet Active"}
                </p>
                {membership?.expiresAt && (
                  <p className="text-sm text-muted-foreground">
                    Renews: {new Date(membership.expiresAt).toLocaleDateString()}
                  </p>
                )}
              </div>

              {isActive ? (
                <button
                  onClick={handleManageBilling}
                  className="w-full px-6 py-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Manage Billing
                </button>
              ) : (
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="glow-button w-full px-6 py-3 rounded-full bg-background text-primary font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {checkoutLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4" />
                      Activate Membership - $500/year
                    </>
                  )}
                </button>
              )}

              <button
                onClick={handleLogout}
                className="w-full mt-4 px-6 py-2 text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </motion.div>

            {/* Benefits Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="font-display text-xl font-bold mb-6">Membership Benefits</h2>
              <ul className="space-y-4">
                {BENEFITS.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isActive ? "text-green-500" : "text-muted-foreground"}`} />
                    <span className={isActive ? "text-foreground" : "text-muted-foreground"}>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Quick Links for Active Members */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12 glass-card rounded-2xl p-8"
            >
              <h2 className="font-display text-xl font-bold mb-6">Quick Access</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <a
                  href="https://discord.gg/aiopscouncil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-center"
                >
                  <p className="font-semibold">Discord</p>
                  <p className="text-sm text-muted-foreground">Join the conversation</p>
                </a>
                <a
                  href="https://dev.clawapi.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-center"
                >
                  <p className="font-semibold">ClawAPI</p>
                  <p className="text-sm text-muted-foreground">Council-built AI tools</p>
                </a>
                <a
                  href="mailto:contact@aiopscouncil.io"
                  className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-center"
                >
                  <p className="font-semibold">Support</p>
                  <p className="text-sm text-muted-foreground">Get help</p>
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Membership;
