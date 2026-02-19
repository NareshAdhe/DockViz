import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Network, Globe, Shield } from "lucide-react";

const NetworkNode = ({ data }) => {
  // 1. Normalize driver to lowercase to handle "NULL", "Null", "null" safely
  const driverType = (data.driver || "bridge").toLowerCase();

  // 2. Icon Logic: Choose icon based on driver type
  const getIcon = () => {
    switch (driverType) {
      case "host":
        return <Globe className="w-6 h-6 text-blue-600" />;
      case "none":
      case "null":
        return <Shield className="w-6 h-6 text-gray-600" />;
      default:
        return <Network className="w-6 h-6 text-orange-600" />;
    }
  };

  // 3. Style Logic: Returns a theme object for Blue (Host), Gray (Null), or Orange (Bridge)
  const getStyles = () => {
    switch (driverType) {
      case "host":
        return {
          border: "border-blue-400",
          hover: "hover:border-blue-600",
          bg: "bg-blue-100",
          handle: "bg-blue-500",
          text: "text-blue-500",
          label: "HOST",
        };
      case "none":
      case "null":
        return {
          border: "border-gray-400",
          hover: "hover:border-gray-600",
          bg: "bg-gray-200",
          handle: "bg-gray-500",
          text: "text-gray-500",
          label: "ISOLATION", // Better label than "NULL"
        };
      default: // Bridge and others
        return {
          border: "border-orange-300",
          hover: "hover:border-orange-500",
          bg: "bg-orange-100",
          handle: "bg-orange-500",
          text: "text-orange-500",
          label: driverType.toUpperCase(),
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`shadow-sm rounded-full bg-white border-2 ${styles.border} w-48 h-48 flex flex-col items-center justify-center transition-all ${styles.hover} hover:shadow-lg relative group`}
    >
      {/* Input Handle (Receives connections from Containers) */}
      <Handle
        type="target"
        position={Position.Top}
        className={`w-3 h-3 ${styles.handle}`}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        className={`w-3 h-3 ${styles.handle}`}
      />

      {/* Main Icon - Uses dynamic bg color */}
      <div
        className={`${styles.bg} p-3 rounded-full mb-2 transition-transform group-hover:scale-110`}
      >
        {getIcon()}
      </div>

      {/* Content */}
      <div className="text-center px-4 w-full">
        {/* Network Name */}
        <h3
          className="font-bold text-gray-800 text-sm truncate w-full"
          title={data.name}
        >
          {data.name}
        </h3>

        {/* Driver Badge - Uses dynamic text color & label */}
        <span
          className={`text-[10px] font-bold uppercase tracking-wider ${styles.text}`}
        >
          {styles.label}
        </span>
      </div>

      {/* Stats Pill */}
      <div className="mt-2 flex items-center gap-2 text-[10px] bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
        <span className="font-mono text-gray-600">
          {data.totalContainersCount !== undefined ? (
            <>
              <span
                className={
                  data.activeContainersCount > 0
                    ? "text-green-600 font-bold"
                    : "text-gray-400"
                }
              >
                {data.activeContainersCount || 0}
              </span>
              <span className="mx-1">/</span>
              <span>{data.totalContainersCount}</span>
            </>
          ) : (
            "0"
          )}
        </span>
        <span className="text-gray-400 text-[9px]">containers</span>
      </div>

      {/* Footer: Short ID */}
      <div className="absolute bottom-3 text-[9px] text-gray-400 font-mono">
        {data.id ? data.id.substring(0, 12) : ""}
      </div>
    </div>
  );
};

export default memo(NetworkNode);