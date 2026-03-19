import React, { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

// ----------------------------------------------------------------------
// Cyberpunk / Terminal Decrypt Text
// ----------------------------------------------------------------------
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export function DecryptText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || isDecrypting) return;

    let iteration = 0;
    setIsDecrypting(true);

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      // Speed up decryption as it goes
      iteration += 1 / 3; 
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, text, isDecrypting]);

  return (
    <span ref={ref} className={className}>
      {displayText || text.replace(/./g, "\u00A0")}
    </span>
  );
}

// ----------------------------------------------------------------------
// Universal Theme Text Wrapper
// ----------------------------------------------------------------------
export function ThemeText({ children, className = "" }: { children: string; className?: string }) {
  const { theme } = useTheme();

  // Futuristic gets decrypt text
  if (theme === "futuristic") {
    return <DecryptText text={children} className={className} />;
  }

  // Other themes get normal framer motion fade-up
  let activeVariants;
  switch (theme) {
    case "cameroonian":
      activeVariants = {
        hidden: { opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
        visible: { opacity: 1, clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)", transition: { duration: 0.8, ease: [0.85, 0, 0.15, 1] } }
      };
      break;
    case "rice":
      activeVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "circOut" } }
      };
      break;
    default:
      activeVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
      };
      break;
  }

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={activeVariants}
      className={className}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.span>
  );
}
