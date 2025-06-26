import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface Metric {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description?: string;
  decimals?: number;
}

interface MetricsCounterProps {
  metrics: Metric[];
  duration?: number; // Animation duration in ms
  className?: string;
}

export default function MetricsCounter({
  metrics,
  duration = 2000,
  className = "",
}: MetricsCounterProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          metric={metric}
          animate={hasAnimated}
          duration={duration}
          delay={index * 100} // Stagger animations
        />
      ))}
    </div>
  );
}

interface MetricCardProps {
  metric: Metric;
  animate: boolean;
  duration: number;
  delay: number;
}

function MetricCard({ metric, animate, duration, delay }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!animate) return;

    const startTime = Date.now() + delay;
    const endValue = metric.value;

    const updateValue = () => {
      const now = Date.now();
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out-cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      const currentValue = endValue * easeOutCubic;
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(updateValue);
      }
    };

    // Start animation after delay
    const timeoutId = setTimeout(() => {
      animationRef.current = requestAnimationFrame(updateValue);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, metric.value, duration, delay]);

  const formatValue = (value: number) => {
    const decimals = metric.decimals ?? 0;
    return value.toFixed(decimals);
  };

  return (
    <div
      className={`relative bg-card border border-border rounded-lg p-6 transition-all duration-300 ${
        isHovered ? "shadow-lg transform -translate-y-1" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-3xl font-bold text-primary mb-2">
        {metric.prefix && <span className="text-2xl">{metric.prefix}</span>}
        {formatValue(displayValue)}
        {metric.suffix && (
          <span className="text-2xl ml-1">{metric.suffix}</span>
        )}
      </div>

      <div className="text-heading font-medium mb-1">{metric.label}</div>

      {metric.description && isHovered && (
        <div className="absolute left-0 right-0 -bottom-2 transform translate-y-full z-10">
          <div className="bg-surface border border-border rounded-lg p-3 shadow-lg mx-2">
            <p className="text-sm text-body">{metric.description}</p>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="mt-3 h-1 bg-surface rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{
            width: `${(displayValue / metric.value) * 100}%`,
            transition: `width ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        />
      </div>
    </div>
  );
}

// Hook for external control
export function useMetricsCounter(initialValue: number = 0) {
  const [value, setValue] = useState(initialValue);
  const [isAnimating, setIsAnimating] = useState(false);

  const animateTo = (targetValue: number, duration: number = 1000) => {
    setIsAnimating(true);
    const startValue = value;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      const currentValue =
        startValue + (targetValue - startValue) * easeOutCubic;
      setValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

  return { value, animateTo, isAnimating };
}
