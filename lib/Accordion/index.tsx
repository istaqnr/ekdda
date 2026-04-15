import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const Accordion = ({
  title,
  children,
  isOpen,
  onClick,
}: AccordionItemProps) => (
  <div className="cursor-pointer mb-4">
    <motion.h2
      initial={false}
      className="text-lg"
      id={`accordion-title-${title.replace(/\s+/g, "-")}`}
    >
      <div
        role="button"
        tabIndex={0}
        className="flex justify-between items-center w-full p-6 font-semibold text-left text-primary bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 border border-gray-200 rounded-t-md shadow-sm focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onClick();
          }
        }}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title.replace(/\s+/g, "-")}`}
      >
        <div className="flex items-center gap-2">
          <span>{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowDropDown />
        </motion.div>
      </div>
    </motion.h2>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.section
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="overflow-hidden border-l border-r border-b border-gray-200 rounded-b-md shadow-sm bg-white"
          id={`accordion-content-${title.replace(/\s+/g, "-")}`}
          aria-labelledby={`accordion-title-${title.replace(/\s+/g, "-")}`}
        >
          <div className="p-2 text-slate-600">{children}</div>
        </motion.section>
      )}
    </AnimatePresence>
  </div>
);
export default Accordion;
