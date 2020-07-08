import React, { FC } from 'react';
import { Spin } from 'antd';
interface LoadingProps {
  className?: string;
}
const Loading: FC<LoadingProps> = ({ className = 'full-height' }) => <div className={className}>
  <Spin size="large" />
</div>;

export default Loading;