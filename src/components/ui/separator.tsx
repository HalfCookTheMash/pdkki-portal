// src/components/ui/Separator.tsx

import React from 'react';

interface SeparatorProps extends React.ComponentPropsWithoutRef<'div'> {
    /** * Orientasi pemisah (horizontal atau vertical).
     * Default: horizontal.
     */
    orientation?: 'horizontal' | 'vertical';
}

const Separator: React.FC<SeparatorProps> = ({ 
    orientation = 'horizontal', 
    className, 
    ...props 
}) => {
    
    const baseClasses = "shrink-0 bg-border"; // bg-border menggunakan variabel CSS --border

    const orientationClasses = orientation === 'horizontal' 
        ? "h-[1px] w-full" // Garis horizontal tipis
        : "w-[1px] h-full"; // Garis vertikal tipis

    return (
        <div
            role="separator"
            className={`${baseClasses} ${orientationClasses} ${className}`}
            aria-orientation={orientation}
            {...props}
        />
    );
};

export default Separator;