import React from 'react';

interface ProductImageProps {
  emoji: string;
  bgGradient: string;
  size?: number;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ emoji, bgGradient, size, className = '' }) => {
  return (
    <div
      className={className}
      style={{
        background: bgGradient,
        width: size ? `${size}px` : '100%',
        height: size ? `${size}px` : '100%',
        aspectRatio: size ? 'auto' : '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size ? `${size * 0.5}px` : 'inherit',
        borderRadius: 'inherit',
      }}
    >
      {emoji}
    </div>
  );
};
