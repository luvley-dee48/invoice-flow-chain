import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'var(--gradient-primary)',
            left: mousePosition.x * 0.02,
            top: mousePosition.y * 0.02,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full opacity-30 right-0"
          style={{
            background: 'var(--gradient-secondary)',
            right: mousePosition.x * 0.01,
            top: mousePosition.y * 0.03,
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powered by Bitcoin & Internet Computer</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">Decentralized</span>
            <br />
            Invoice Financing
            <br />
            <span className="text-muted-foreground">for SMEs</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your unpaid invoices into tradable NFTs backed by Bitcoin and ICP. 
            Get instant access to capital with multi-chain DeFi security.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
          >
            <Link to="/signup">
              <Button className="hero-button group text-lg px-8 py-6">
                Start Financing
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button variant="outline" className="hover-ball border-border/50 backdrop-blur-sm text-lg px-8 py-6">
                Explore Marketplace
              </Button>
            </Link>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="feature-card hover-ball text-center">
              <div className="relative inline-block mb-4">
                <Shield className="h-12 w-12 text-primary mx-auto glow-effect" />
                <div className="pulse-ring w-12 h-12 top-0 left-1/2 transform -translate-x-1/2"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Multi-Chain Security</h3>
              <p className="text-muted-foreground">Built on Bitcoin and ICP for maximum security and transparency</p>
            </div>

            <div className="feature-card hover-ball text-center">
              <div className="relative inline-block mb-4">
                <Zap className="h-12 w-12 text-primary mx-auto glow-effect" />
                <div className="pulse-ring w-12 h-12 top-0 left-1/2 transform -translate-x-1/2"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Liquidity</h3>
              <p className="text-muted-foreground">Get immediate access to your invoice value</p>
            </div>

            <div className="feature-card hover-ball text-center">
              <div className="relative inline-block mb-4">
                <Globe className="h-12 w-12 text-primary mx-auto glow-effect" />
                <div className="pulse-ring w-12 h-12 top-0 left-1/2 transform -translate-x-1/2"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Global Access</h3>
              <p className="text-muted-foreground">Accessible to freelancers and SMEs worldwide</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;