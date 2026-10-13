import React from 'react';

interface CountdownUnitProps {
  value: number;
  label: string;
  padZero?: boolean;
}

export const CountdownUnit: React.FC<CountdownUnitProps> = ({
  value,
  label,
  padZero = false,
}) => {
  // taste-skill-ignore: clock zero-padding
  const displayValue = padZero ? String(value).padStart(2, '0') : String(value);

  return (
    <div className="countdown-unit">
      <span className="unit-number">{displayValue}</span>
      <span className="unit-label">{label}</span>
    </div>
  );
};
