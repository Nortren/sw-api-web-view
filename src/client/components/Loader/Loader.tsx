import { Alert, Space, Spin } from 'antd';
import React from 'react';

export const Loader = () => {
  return (
    <Space
      direction="vertical"
      style={{ width: '100%' }}
      data-testid="loader-space"
    >
      <Spin>
        <Alert
          message="Wait...That's The Way!"
          description="Expect the opening of the hole in the death star"
          type="info"
          data-testid="loader-alert"
        />
      </Spin>
    </Space>
  );
};
