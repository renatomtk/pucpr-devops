import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MethodBadge from "./MethodBadge";
import CodeBlock from "./CodeBlock";

interface ApiCardProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  responseCode: string;
}

const spring = { type: "spring" as const, stiffness: 300, damping: 30 };

const ApiCard = ({ method, path, description, responseCode }: ApiCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={spring}
      className="rounded-lg border border-border bg-card/50 overflow-hidden cursor-pointer"
      style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.03)" }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="px-5 py-4 flex items-center gap-4">
        <MethodBadge method={method} />
        <span className="text-sm font-mono font-medium text-foreground">{path}</span>
        <span className="ml-auto text-sm text-muted-foreground hidden sm:block">{description}</span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={spring}
          className="text-muted-foreground text-xs"
        >
          ▾
        </motion.span>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 pt-1">
              <p className="text-sm text-muted-foreground mb-3 sm:hidden">{description}</p>
              <div className="p-1">
                <CodeBlock code={responseCode} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ApiCard;
