import {createWSClient} from '@trpc/client';
import {type inferRouterInputs, type inferRouterOutputs} from '@trpc/server';
import {AppRouter} from '../../server/api/root';
import {createTRPCReact} from '@trpc/react-query';

export const getBaseApiUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const getBaseWsUrl = () => {
  if (process.env.NODE_ENV !== 'production') return 'ws://localhost:3001'; // browser should use relative url
  if (process.env.VERCEL_URL) return `ws://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `ws://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const wsClient = createWSClient({
  url: `${getBaseWsUrl()}/ws/trpc`,
});

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const api = createTRPCReact<AppRouter>();
