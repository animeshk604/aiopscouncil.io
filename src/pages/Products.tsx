import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { Zap, GitBranch, Timer, DollarSign, Eye, Lock, RotateCcw } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const features = [
  { icon: <GitBranch />, title: "Multi-Model Routing", description: "Intelligently route requests across GPT-4, Claude, Gemini, Llama, and more based on cost, latency, and quality requirements." },
  { icon: <Timer />, title: "Latency Optimization", description: "Sub-100ms routing decisions with edge caching, request batching, and streaming-first architecture." },
  { icon: <DollarSign />, title: "Cost Efficiency", description: "Automatic model selection to reduce costs by up to 10x without sacrificing output quality." },
  { icon: <Eye />, title: "Observability", description: "Real-time dashboards for token usage, latency percentiles, error rates, and cost tracking per model." },
  { icon: <Lock />, title: "Secure API Access", description: "Enterprise-grade API key management, rate limiting, and audit logging for every request." },
  { icon: <RotateCcw />, title: "Fallback Logic", description: "Automatic failover between models with configurable retry strategies and circuit breakers." },
];

const Products = () => {
  return (
    <div className="cosmic-bg min-h-screen relative">
      <div className="grid-overlay fixed inset-0 pointer-events-none" />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 flex items-center justify-center min-h-[60vh] px-4 pt-20">
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
            Products
          </motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed">
            Tools built by operators, for operators. Born from real production pain points.
          </motion.p>
        </motion.div>
      </section>

      {/* ClawAPI Showcase */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 sm:p-12 text-center"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-secondary/30 bg-secondary/5 text-secondary mb-6">
              Coming Soon
            </span>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="text-primary" size={32} />
              <a
                href="https://clawapi.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-3xl sm:text-4xl font-bold text-foreground hover:text-primary transition-colors"
              >
                ClawAPI
              </a>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
              The unified AI gateway that handles multi-model routing, intelligent fallbacks, cost optimization,
              and real-time observability — so you can focus on building, not plumbing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-bold gradient-text text-glow-cyan text-center mb-12"
          >
            Core Features
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <FeatureCard key={feat.title} {...feat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Want Early Access?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join the council to be first in line when ClawAPI launches.
          </p>
          <Link
            to="/join"
            className="glow-button inline-flex items-center px-8 py-3 rounded-full bg-background text-primary font-semibold text-sm tracking-wide"
          >
            Apply to Join →
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
