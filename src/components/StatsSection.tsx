import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const stats = [
  { value: 10000, label: 'Invoices Tokenized', prefix: '', suffix: '+' },
  { value: 2.5, label: 'Million USD Processed', prefix: '$', suffix: 'M+' },
  { value: 500, label: 'Active Users', prefix: '', suffix: '+' },
  { value: 98, label: 'Success Rate', prefix: '', suffix: '%' },
];

const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return <span>{count}</span>;
};

const StatsSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Join the growing community of businesses revolutionizing their cash flow
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              className="feature-card hover-ball text-center group"
            >
              <div className="relative">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 gradient-text">
                  {stat.prefix}
                  <AnimatedCounter value={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
                
                {/* Pulse effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="pulse-ring w-full h-full top-0 left-0 rounded-2xl"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Elements */}
        <div className="relative mt-16">
          <motion.div
            className="absolute left-1/4 w-32 h-32 rounded-full opacity-20 float-animation"
            style={{ background: 'var(--gradient-primary)' }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="absolute right-1/4 w-24 h-24 rounded-full opacity-30"
            style={{ 
              background: 'var(--gradient-secondary)',
              animationDelay: '2s'
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.3, scale: 1 }}
            viewport={{ once: true }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;