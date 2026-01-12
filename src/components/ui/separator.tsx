import React from 'react';

interface SeparatorProps extends React.ComponentPropsWithoutRef<'div'> {
    orientation?: 'horizontal' | 'vertical';
}

const Separator: React.FC<SeparatorProps> = ({ 
    className, 
    ...props 
}) => {
    return (
        <div 
            className={`h-8 md:h-12 lg:h-16 ${className || ''}`} 
            {...props} 
        />
    );
};

export default Separator;