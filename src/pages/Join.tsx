import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Target, Gift } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const Join = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    company: "",
    experience: "",
    warStory: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Received",
      description: "We'll review your application and get back to you soon.",
    });
    setForm({ name: "", email: "", role: "", company: "", experience: "", warStory: "" });
  };

  const inputClasses =
    "w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all";

  return (
    <div className="cosmic-bg min-h-screen relative">
      <div className="grid-overlay fixed inset-0 pointer-events-none" />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 flex items-center justify-center min-h-[50vh] px-4 pt-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h1
            variants={fadeUp}
            className="font-display text-3xl sm:text-5xl font-bold gradient-text text-glow-cyan mb-6"
          >
            Join the Council
          </motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed">
            Applications are reviewed by current members. Tell us about your experience deploying AI in production.
          </motion.p>
        </motion.div>
      </section>

      {/* Form + Info */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass-card rounded-2xl p-8"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-6">Application</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  className={inputClasses}
                  placeholder="Full Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  className={inputClasses}
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  className={inputClasses}
                  placeholder="Role / Title"
                  required
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
              <select
                className={inputClasses}
                required
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
              >
                <option value="" disabled>Experience with Production AI</option>
                <option value="1-2">1–2 years</option>
                <option value="3-5">3–5 years</option>
                <option value="5+">5+ years</option>
              </select>
              <textarea
                className={`${inputClasses} min-h-[120px] resize-none`}
                placeholder="Tell us a production AI war story — a deployment that went wrong, a scaling challenge you solved, or a hard lesson learned."
                required
                value={form.warStory}
                onChange={(e) => setForm({ ...form, warStory: e.target.value })}
              />
              <button
                type="submit"
                className="glow-button w-full px-8 py-3 rounded-full bg-background text-primary font-semibold text-sm tracking-wide"
              >
                Submit Application →
              </button>
            </form>
          </motion.div>

          {/* Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-primary" size={22} />
                <h3 className="font-display text-base font-semibold text-foreground">What We're Looking For</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Hands-on production AI/ML experience</li>
                <li>• Currently deploying or maintaining AI systems</li>
                <li>• Willingness to share knowledge and help others</li>
                <li>• No influencers, no recruiters, no sales pitches</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Gift className="text-secondary" size={22} />
                <h3 className="font-display text-base font-semibold text-foreground">What You Get</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Access to private channels with top AI operators</li>
                <li>• Exclusive war stories & architecture reviews</li>
                <li>• Early access to council-built tools (<a href="https://clawapi.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors">ClawAPI</a>)</li>
                <li>• A network that actually understands your work</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Join;
