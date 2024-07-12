import {inferAsyncReturnType, initTRPC} from '@trpc/server';
import {type CreateHTTPContextOptions} from '@trpc/server/adapters/standalone';
import {type CreateWSSContextFnOptions} from '@trpc/server/adapters/ws';
import {ZodError} from 'zod';
import superjson from 'superjson';

export const createTRPCContext = async (_opts: CreateHTTPContextOptions | CreateWSSContextFnOptions) => {
  return {};
};

export type Context = inferAsyncReturnType<typeof createTRPCContext>;

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({shape, error}) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
