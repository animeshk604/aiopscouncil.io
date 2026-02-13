import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { Users, Server, Wrench, Sparkles, BookOpen, MessageSquare } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const audiences = [
  { icon: <Users />, title: "ML / AI Engineers", description: "Building and deploying models, agents, and AI pipelines in production environments. You've felt the pain of taking a demo to prod." },
  { icon: <Server />, title: "Platform Teams", description: "Designing the infrastructure that AI runs on — from GPU clusters to inference endpoints to vector databases." },
  { icon: <Wrench />, title: "DevOps / SRE", description: "Keeping AI systems reliable, observable, and cost-effective at scale. You know what 3 AM model failures look like." },
];

const benefits = [
  { icon: <Sparkles />, title: "Private Discord & Forums", description: "Direct access to operators at top companies. No noise, no self-promotion — just signal." },
  { icon: <BookOpen />, title: "Exclusive Content", description: "War stories, architecture reviews, and postmortems from real production AI deployments." },
  { icon: <MessageSquare />, title: "Early Product Access", description: "Be the first to try tools built by the council — including ClawAPI and future projects." },
];

const About = () => {
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
            About the Council
          </motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed">
            We're a private community of engineers who are done with AI hype and focused on what actually works in production.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 sm:p-12"
          >
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              The AI Ops Council exists to connect the people who actually build, deploy, and maintain AI systems at scale.
              We share hard-won knowledge about production challenges — from model serving and cost optimization to security
              and observability. No courses to sell. No followers to chase. Just operators helping operators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who Should Join */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-bold gradient-text text-glow-cyan text-center mb-12"
          >
            Who Should Join
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {audiences.map((item, i) => (
              <FeatureCard key={item.title} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-bold gradient-text text-glow-cyan text-center mb-12"
          >
            What Members Get
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((item, i) => (
              <FeatureCard key={item.title} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
