import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { Bot, Brain, DollarSign, Shield, GitBranch, Activity, Zap, Linkedin } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const topics = [
  { icon: <Bot />, title: "Production Agent Orchestration", description: "Design, deploy, and manage multi-agent systems that actually work in production — not just demos." },
  { icon: <Brain />, title: "Prompt & Context Engineering", description: "Advanced techniques for prompt optimization, context window management, and retrieval-augmented generation." },
  { icon: <DollarSign />, title: "Cost & Latency Wars", description: "Strategies for reducing inference costs by 10x while maintaining quality. Real benchmarks, real savings." },
  { icon: <Shield />, title: "Jailbreak Defense & Red-Teaming", description: "Protect your AI systems from adversarial attacks, prompt injection, and data exfiltration." },
  { icon: <GitBranch />, title: "Multi-Model Routing", description: "Intelligent routing across GPT-4, Claude, Gemini, Llama, and open-source models for optimal cost/quality." },
  { icon: <Activity />, title: "Real-time Monitoring", description: "Observability, logging, and alerting for AI systems — from token usage to hallucination detection." },
];

const Index = () => {
  return (
    <div className="cosmic-bg min-h-screen relative">
      <div className="grid-overlay fixed inset-0 pointer-events-none" />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} className="animate-float inline-block mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium tracking-wide border border-primary/30 bg-primary/5 text-primary">
              Private Guild for AI Operators
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            <span className="gradient-text text-glow-cyan">Private Guild for</span>
            <br />
            <span className="gradient-text text-glow-cyan">Real AI Operators</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            An exclusive community of engineers who deploy, scale, and battle-test AI systems in production.
            No influencers. No hype. Just operators shipping real AI.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/join"
              className="glow-button inline-flex items-center px-8 py-3 rounded-full bg-background text-primary font-semibold text-sm tracking-wide"
            >
              Apply to Join →
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-3 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all text-sm font-medium"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Topics */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold gradient-text text-glow-cyan mb-4">
              What We Talk About
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Deep dives into the hardest problems in production AI — by the people solving them.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, i) => (
              <FeatureCard key={topic.title} {...topic} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Council Operators */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold gradient-text text-glow-cyan mb-4">
              Council Leadership
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Experienced operators guiding discussions and maintaining our signal-to-noise ratio.
            </p>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-8 text-center max-w-sm"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/30">
                <img
                  src="/edward.png"
                  alt="Edward Unthank"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1">
                Edward Unthank
              </h3>
              <p className="text-primary text-sm font-medium mb-3">Moderator</p>
              <p className="text-muted-foreground text-sm mb-4">
                AI infrastructure veteran helping operators scale production systems.
              </p>
              <a
                href="https://www.linkedin.com/in/edwardunthank/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={16} />
                Connect on LinkedIn
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center mt-12"
          >
            <Link
              to="/operators"
              className="inline-flex items-center px-6 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all text-sm font-medium"
            >
              View All Operators →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ClawAPI Tease */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 sm:p-12 text-center"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-secondary/30 bg-secondary/5 text-secondary mb-6">
              Coming Soon
            </span>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="text-primary" size={28} />
              <a
                href="https://clawapi.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-2xl sm:text-3xl font-bold text-foreground hover:text-primary transition-colors"
              >
                ClawAPI
              </a>
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              The AI gateway built by operators, for operators. Multi-model routing, intelligent fallbacks,
              cost optimization, and real-time observability — all in one API.
            </p>
            <Link
              to="/products"
              className="glow-button inline-flex items-center px-8 py-3 rounded-full bg-background text-primary font-semibold text-sm tracking-wide"
            >
              Learn More →
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
