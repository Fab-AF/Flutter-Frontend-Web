import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import classNames from 'classnames';

const TotalClubs = () => {
  const { theme } = useTheme();
  
  const containerClass = classNames('text-m', {
    'text-black-700': theme === 'light',
    'text-gray-400': theme === 'dark',
  });

  return (
    <div className={containerClass}>TotalClubs</div>
  );
}

export default TotalClubs;