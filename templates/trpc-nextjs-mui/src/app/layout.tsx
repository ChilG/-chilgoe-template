import * as React from 'react';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../lib/mui/theme';
import TrpcProvider from '../app/provider/TRPCProvider';

export default function RootLayout(props: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <TrpcProvider>
          <AppRouterCacheProvider options={{enableCssLayer: true}}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {props.children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
