import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg border border-gray-200 ${
        hover
          ? "hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
