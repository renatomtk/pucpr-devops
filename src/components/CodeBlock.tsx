import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language = "json" }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-md bg-background border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
          {language}
        </span>
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.95 }}
          className={`text-[11px] font-medium px-2.5 py-1 rounded-sm transition-all duration-200 ${
            copied
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground"
          }`}
          style={{ transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                Copied ✓
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <pre className="p-4 text-sm font-mono leading-relaxed text-foreground/90 overflow-x-auto tabular-nums">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
