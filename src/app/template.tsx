'use client'

import { SnackbarProvider } from 'notistack';
import { NotificationSnack } from '@/components/SnackBar';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';

declare module 'notistack' {
  interface VariantOverrides {
    notification: {
      notification?: {}
    }
  }
}

function Template({ children }:{ children: React.ReactNode }) {
  const theme = useMemo(() => createTheme({
    palette: {
      primary: {
          main: '#1B1464',
          contrastText: "#ffffff"
      },
    }
  }),[]);

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider style={{ maxWidth: 450 }} maxSnack={3} Components={{ notification: NotificationSnack }}>
          {children}
        </SnackbarProvider>
    </ThemeProvider>
  )
}

export default Template