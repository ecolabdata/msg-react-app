/* eslint-disable no-undef */
import { FC } from 'react';

export interface AlerteProps {
  message: string;
  type?: 'warning' | 'error' | 'success' | 'info';
}

const convertTypeToClass = (type: 'warning' | 'error' | 'success' | 'info') => {
  switch (type) {
    case 'warning':
      return 'fr-alert--warning';
    case 'error':
      return 'fr-alert--error';
    case 'success':
      return 'fr-alert--success';
    case 'info':
      return 'fr-alert--info';
    default:
      return 'fr-alert--info';
  }
};

const Alerte: FC<AlerteProps> = ({ message, type = 'info' }) => {
  const classType = convertTypeToClass(type);
  return (
    <div className={`fr-alert fr-alert--sm mt-5 max-w-md ${classType}`} role="alert">
      <p>{message}</p>
    </div>
  );
};

export default Alerte;
