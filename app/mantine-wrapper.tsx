// Path: app/mantine-wrapper.tsx
'use client';

import { MantineProvider } from '@mantine/core';

export default function MantineWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={{ primaryColor: 'blue' }}>
      {children}
    </MantineProvider>
  );
}
