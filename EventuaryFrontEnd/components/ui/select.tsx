import React, { useState, useRef, useEffect } from 'react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  children?: React.ReactNode;
}

export function Select({ value, onValueChange, placeholder, children }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative w-[180px]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border rounded-md px-3 py-2 cursor-pointer bg-white"
      >
        {value || placeholder || 'Select...'}
      </div>
      {isOpen && (
        <div className="absolute w-full mt-1 border rounded-md bg-white shadow-lg z-10">
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                onClick: () => {
                  onValueChange(child.props.value);
                  setIsOpen(false);
                }
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
}

export function SelectItem({ children, value, onClick }: { children: React.ReactNode; value: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
      {children}
    </div>
  );
}