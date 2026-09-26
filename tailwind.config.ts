import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink:'#071326', brand:'#2563eb' } } }, plugins: [] } satisfies Config;
