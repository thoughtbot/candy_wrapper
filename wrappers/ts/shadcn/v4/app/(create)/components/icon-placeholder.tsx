import React from "react";

const iconMap: Record<string, string> = {
  CheckIcon: "✓",
  ChevronDownIcon: "▾",
  ChevronUpIcon: "▴",
  ChevronLeftIcon: "◂",
  ChevronRightIcon: "▸",
  MoreHorizontalIcon: "⋯",
};

export const IconPlaceholder = ({
  lucide,
  ...props
}: Record<string, unknown>) => {
  const char = typeof lucide === "string" ? iconMap[lucide] || "" : "";
  return React.createElement(
    "span",
    { ...props, style: { fontSize: "0.75em", lineHeight: 1 } },
    char
  );
};
