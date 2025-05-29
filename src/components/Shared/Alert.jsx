
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
    icon: <AiOutlineInfoCircle className="w-5 h-5 text-blue-500 mt-1" />,
  },
  success: {
    bg: "bg-green-100",
    border: "border-green-500",
    text: "text-green-800",
    icon: <AiOutlineCheckCircle className="w-5 h-5 text-green-500 mt-1" />,
  },
  warning: {
    bg: "bg-yellow-100",
    border: "border-yellow-500",
    text: "text-yellow-800",
    icon: <AiOutlineWarning className="w-5 h-5 text-yellow-500 mt-1" />,
  },
  error: {
    bg: "bg-red-100",
    border: "border-red-500",
    text: "text-red-800",
    icon: <AiOutlineCloseCircle className="w-5 h-5 text-red-500 mt-1" />,
  },
};

const Alert = ({ type = "info", message }) => {
  const style = typeStyles[type] || typeStyles.info;

  return (
    <div
      className={`flex items-start gap-3 rounded-md p-4 border-l-4 ${style.bg} ${style.border}`}
    >
      {style.icon}
      <p className={`text-sm font-medium ${style.text}`}>{message}</p>
    </div>
  );
};

export default Alert;
