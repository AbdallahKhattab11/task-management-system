import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineCheckCircle,
  AiOutlineWarning,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const typeStyles = {
  info: {
    bg: "bg-blue-100",
    border: "border-blue-500",
    text: "text-blue-800",
    icon: <AiOutlineInfoCircle className="size-6 text-info " />,
  },
  success: {
    bg: "bg-green-100",
    border: "border-green-500",
    text: "text-green-800",
    icon: <AiOutlineCheckCircle className="size-6 text-success " />,
  },
  warning: {
    bg: "bg-yellow-100",
    border: "border-yellow-500",
    text: "text-yellow-800",
    icon: <AiOutlineWarning className="size-6 text-warning" />,
  },
  error: {
    bg: "bg-red-100",
    border: "border-red-500",
    text: "text-red-800",
    icon: <AiOutlineCloseCircle className="size-6 text-error" />,
  },
};

const Alert = ({ type = "info", message, isDisplayed }) => {
  const style = typeStyles[type] || typeStyles.info;

  return (
    <AnimatePresence>
      {isDisplayed && (
        <motion.div
          key={"alert"}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center justify-start gap-3 rounded-md p-3 border-l-4 mb-6 ${style.bg} ${style.border} `}
        >
          <div className="icon cursor-pointer">
            {style.icon}
          </div>
          <p className={`text-base font-medium text-wrap ${style.text}`}>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
