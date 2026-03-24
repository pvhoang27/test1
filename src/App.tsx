import React from 'react';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import { SWRConfig } from 'swr';
import AppRouter from './router/AppRouter';
import './styles/global.scss';

const swrConfig = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
  dedupingInterval: 5000,
};

const antdTheme = {
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 6,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
};

const App: React.FC = () => (
  <SWRConfig value={swrConfig}>
    <ConfigProvider locale={viVN} theme={antdTheme}>
      <AppRouter />
    </ConfigProvider>
  </SWRConfig>
);

export default App;
