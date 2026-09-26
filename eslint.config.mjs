import nextVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextVitals,
  {
    rules: {
      // Data loading is intentionally kicked off from client effects in these
      // Supabase-backed screens.
      'react-hooks/set-state-in-effect': 'off',
      '@next/next/no-location-assign-relative-destination': 'off',
    },
  },
];

export default config;
