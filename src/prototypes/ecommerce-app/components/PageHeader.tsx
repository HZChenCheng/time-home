import React from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
  rightIcon?: boolean;
  bgWhite?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, onBack, rightIcon = true, bgWhite = true }) => {
  return (
    <div className="ec-header" style={bgWhite ? {} : { background: 'transparent', border: 'none' }}>
      <div className="ec-header-back" onClick={onBack}>
        <ChevronLeft size={24} />
      </div>
      <div className="ec-header-title">{title}</div>
      <div className="ec-header-back" style={{ visibility: rightIcon ? 'visible' : 'hidden' }}>
        <MoreHorizontal size={20} />
      </div>
    </div>
  );
};
