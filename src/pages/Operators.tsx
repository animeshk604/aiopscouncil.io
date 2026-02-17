import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Linkedin, Shield, Users } from "lucide-react";

const operators = [
  {
    name: "Edward Unthank",
    role: "Moderator",
    image: "/edward.png",
    bio: "AI infrastructure veteran with extensive experience scaling production systems. Guides discussions on multi-model orchestration, cost optimization, and real-world deployment challenges.",
    linkedin: "https://www.linkedin.com/in/edwardunthank/",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Operators = () => {
  return (
    <div className="cosmic-bg min-h-screen relative">
      <div className="grid-overlay fixed inset-0 pointer-events-none" />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 py-20 px-4 pt-28">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border border-primary/30 bg-primary/5 text-primary mb-6"
          >
            <Users size={14} />
            Council Leadership
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold gradient-text text-glow-cyan mb-6"
          >
            Meet the Operators
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Experienced AI practitioners who guide discussions, share war stories,
            and maintain our community's signal-to-noise ratio.
          </motion.p>
        </div>
      </section>

      {/* Operators Grid */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {operators.map((operator) => (
              <motion.div
                key={operator.name}
                variants={fadeUp}
                className="glass-card rounded-2xl p-8 text-center"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/30">
                  <img
                    src={operator.image}
                    alt={operator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  {operator.name}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Shield size={14} className="text-primary" />
                  <span className="text-primary text-sm font-medium">{operator.role}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {operator.bio}
                </p>
                <a
                  href={operator.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                >
                  <Linkedin size={16} />
                  Connect on LinkedIn
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 sm:p-12 text-center"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Want to Become an Operator?
            </h2>
            <p className="text-muted-foreground mb-8">
              Active members with significant contributions may be invited to join the leadership team.
              Start by becoming a member and engaging with the community.
            </p>
            <Link
              to="/join"
              className="glow-button inline-flex items-center px-8 py-3 rounded-full bg-background text-primary font-semibold text-sm tracking-wide"
            >
              Apply to Join →
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Operators;
