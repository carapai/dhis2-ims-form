import React, { FC } from 'react';
interface LoadingProps {
  message?: string;
  className?: string;
}
export const ErrorMessage: FC<LoadingProps> = ({ className = 'height-48', message = '' }) => <div className={className}>
  {message}
</div>;

