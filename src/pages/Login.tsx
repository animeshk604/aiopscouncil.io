import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { login, register } from "@/lib/api";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
    company: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        await login(form.email, form.password);
        toast({ title: "Welcome back!" });
      } else {
        await register(form);
        toast({ title: "Account created successfully!" });
      }
      navigate("/membership");
    } catch (error: any) {
      toast({
        title: mode === "login" ? "Login Failed" : "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all";

  return (
    <div className="cosmic-bg min-h-screen relative">
      <div className="grid-overlay fixed inset-0 pointer-events-none" />
      <Navbar />

      <section className="relative z-10 flex items-center justify-center min-h-[80vh] px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="glass-card rounded-2xl p-8">
            <h1 className="font-display text-2xl font-bold gradient-text text-center mb-2">
              {mode === "login" ? "Member Login" : "Create Account"}
            </h1>
            <p className="text-muted-foreground text-center text-sm mb-6">
              {mode === "login"
                ? "Access your AI Ops Council membership"
                : "Register to complete your membership"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <>
                  <input
                    className={inputClasses}
                    placeholder="Full Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      className={inputClasses}
                      placeholder="Role / Title"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    />
                    <input
                      className={inputClasses}
                      placeholder="Company"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                </>
              )}

              <input
                className={inputClasses}
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                className={inputClasses}
                type="password"
                placeholder="Password"
                required
                minLength={8}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <button
                type="submit"
                disabled={loading}
                className="glow-button w-full px-8 py-3 rounded-full bg-background text-primary font-semibold text-sm tracking-wide disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {mode === "login" ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  mode === "login" ? "Sign In" : "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              {mode === "login" ? (
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setMode("register")}
                    className="text-primary hover:underline"
                  >
                    Register
                  </button>
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-primary hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>

            <div className="mt-4 text-center">
              <Link to="/join" className="text-sm text-muted-foreground hover:text-primary">
                Not a member yet? Apply to join →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
