import { motion } from 'framer-motion';
import { Check, Zap, Star, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pricingPlans = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses and freelancers',
    price: '2.5',
    period: 'per transaction',
    icon: Zap,
    features: [
      'Up to $10K invoice financing',
      'Basic marketplace access',
      'Standard processing (24-48h)',
      'Email support',
      'Basic analytics',
    ],
    popular: false,
  },
  {
    name: 'Business',
    description: 'Ideal for growing SMEs with regular invoicing',
    price: '1.8',
    period: 'per transaction',
    icon: Star,
    features: [
      'Up to $100K invoice financing',
      'Premium marketplace features',
      'Priority processing (12-24h)',
      'Priority support',
      'Advanced analytics',
      'API access',
      'Bulk tokenization',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For large businesses with high volume needs',
    price: 'Custom',
    period: 'volume pricing',
    icon: Crown,
    features: [
      'Unlimited invoice financing',
      'White-label marketplace',
      'Instant processing',
      'Dedicated account manager',
      'Custom analytics dashboard',
      'Full API integration',
      'Smart contract customization',
      'Bitcoin & ICP multi-chain support',
    ],
    popular: false,
  },
];

const PricingSection = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
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
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-secondary/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your business. No hidden fees, no complicated contracts.
            Pay only when you use our services.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`feature-card hover-ball group relative overflow-hidden ${
                plan.popular ? 'ring-2 ring-primary/50 scale-105' : ''
              }`}
              whileHover={{ 
                scale: plan.popular ? 1.08 : 1.03,
                transition: { duration: 0.2 }
              }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={`relative ${plan.popular ? 'pt-8' : ''}`}>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <plan.icon className="h-12 w-12 text-primary glow-effect transition-transform group-hover:scale-110 group-hover:rotate-12" />
                    <div className="pulse-ring w-12 h-12 top-0 left-0 opacity-0 group-hover:opacity-100"></div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2 text-center group-hover:text-primary transition-colors">
                  {plan.name}
                </h3>
                
                <p className="text-muted-foreground text-center mb-6">
                  {plan.description}
                </p>

                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold gradient-text group-hover:scale-110 transition-transform">
                      {plan.price === 'Custom' ? plan.price : `${plan.price}%`}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">{plan.period}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="relative">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 bg-primary/20 rounded-full scale-0 group-hover:scale-150 transition-transform opacity-0 group-hover:opacity-100"></div>
                      </div>
                      <span className="text-sm group-hover:text-foreground transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full transition-all duration-300 ${
                    plan.popular 
                      ? 'hero-button' 
                      : 'hover-ball bg-background border border-border hover:bg-primary hover:text-primary-foreground'
                  } group-hover:shadow-lg group-hover:-translate-y-1`}
                  size="lg"
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </Button>
              </div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional fee information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="feature-card max-w-4xl mx-auto hover-ball group">
            <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
              💡 Additional Fee Structure
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div className="group-hover:text-foreground transition-colors">
                <strong>Network Fees:</strong> 0.1% per transaction (covers Bitcoin/ICP gas costs)
              </div>
              <div className="group-hover:text-foreground transition-colors">
                <strong>Cross-Chain:</strong> 0.2% for Bitcoin ↔ ICP transfers
              </div>
              <div className="group-hover:text-foreground transition-colors">
                <strong>Currency Exchange:</strong> 0.3% for non-USD/BTC invoices
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 group-hover:text-foreground transition-colors">
              All fees are transparently displayed before transaction confirmation. No hidden charges.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;