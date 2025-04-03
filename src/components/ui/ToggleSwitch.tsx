import React from 'react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  onLabel?: string;
  offLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

export function ToggleSwitch({ 
  enabled, 
  onChange, 
  onLabel = 'ON', 
  offLabel = 'OFF',
  size = 'sm',
  showLabels = true
}: ToggleSwitchProps) {
  const sizes = {
    sm: {
      switch: 'w-11 h-6',
      circle: 'h-5 w-5',
      translate: 'translate-x-5',
      text: 'text-xs',
    },
    md: {
      switch: 'w-12 h-7',
      circle: 'h-6 w-6',
      translate: 'translate-x-5',
      text: 'text-sm',
    },
    lg: {
      switch: 'w-14 h-8',
      circle: 'h-7 w-7',
      translate: 'translate-x-6',
      text: 'text-base',
    },
  };

  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      {showLabels && (
        <span className={`${sizes[size].text} text-gray-700 min-w-[60px] text-right`}>
          {enabled ? onLabel : offLabel}
        </span>
      )}
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={enabled}
          onChange={() => onChange(!enabled)}
        />
        <div className={`
          ${sizes[size].switch}
          bg-gray-200 
          peer-focus:outline-none 
          peer-focus:ring-4 
          peer-focus:ring-[#404B5A]/20
          rounded-full 
          peer 
          peer-checked:bg-[#404B5A]
          relative
        `}>
          <div className={`
            absolute
            ${sizes[size].circle}
            bg-white 
            rounded-full
            shadow-sm
            transition-all
            duration-300
            top-[50%]
            translate-y-[-50%]
            left-0.5
            ${enabled ? sizes[size].translate : ''}
          `}></div>
        </div>
      </div>
    </label>
  );
}