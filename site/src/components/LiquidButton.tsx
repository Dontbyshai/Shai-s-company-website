import React from 'react';
import './LiquidButton.css';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function LiquidButton({ children, ...props }: LiquidButtonProps) {
  return (
    <button className="liquid-btn" {...props}>
      <div className="inner-liquid"></div>
      <span className="btn-text">{children}</span>
    </button>
  );
}
