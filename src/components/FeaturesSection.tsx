import { motion } from 'framer-motion';
import { 
  Coins, 
  ShoppingCart, 
  Zap, 
  Shield, 
  BarChart3, 
  Users,
  Clock,
  TrendingUp,
  Bitcoin
} from 'lucide-react';

const features = [
  {
    icon: Coins,
    title: 'Invoice Tokenization',
    description: 'Convert unpaid invoices into unique NFTs with blockchain verification and smart contract automation.',
  },
  {
    icon: ShoppingCart,
    title: 'Decentralized Marketplace',
    description: 'Buy and sell invoice NFTs in a transparent, liquid marketplace with real-time pricing.',
  },
  {
    icon: Zap,
    title: 'Instant Capital Access',
    description: 'Get immediate funds by selling invoice NFTs, improving cash flow without traditional lending.',
  },
  {
    icon: Shield,
    title: 'Multi-Chain Smart Contracts',
    description: 'Automated repayments through secure smart contracts on Bitcoin and ICP networks.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Track performance with detailed analytics on invoice status and investment returns.',
  },
  {
    icon: Bitcoin,
    title: 'Bitcoin Integration',
    description: 'Native Bitcoin support for payments, collateral, and cross-chain liquidity pools.',
  },
  {
    icon: Users,
    title: 'ICP Identity Integration',
    description: 'Seamless user management with Internet Computer identity system for security.',
  },
  {
    icon: Clock,
    title: 'Escrow Protection',
    description: 'Funds held in smart contract escrow until invoice payment confirmation.',
  },
  {
    icon: TrendingUp,
    title: 'Cross-Chain Trading',
    description: 'Trade invoice NFTs across Bitcoin and ICP networks for enhanced liquidity.',
  },
];

const FeaturesSection = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful <span className="gradient-text">Multi-Chain DeFi</span> Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the next generation of invoice financing with Bitcoin and ICP blockchain technology
            and seamless cross-chain functionality.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="feature-card hover-ball group"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="relative mb-6">
                <div className="relative inline-block">
                  <feature.icon className="h-12 w-12 text-primary glow-effect transition-transform group-hover:scale-110" />
                  <div className="pulse-ring w-12 h-12 top-0 left-0 opacity-0 group-hover:opacity-100"></div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="feature-card max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to revolutionize your <span className="gradient-text">cash flow</span>?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of businesses already using Twinvest to unlock the value of their invoices
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hero-button"
            >
              Start Your Journey
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;