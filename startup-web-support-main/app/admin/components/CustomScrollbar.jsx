"use client";


export default function CustomScrollbar({ children, className = "", style = {} }) {
  return (
    <div
      className={`admin-scrollbar overflow-y-auto overflow-x-hidden ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
