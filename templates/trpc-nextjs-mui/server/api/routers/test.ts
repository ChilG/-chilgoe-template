import EventEmitter from 'events';
import {createTRPCRouter, publicProcedure} from '../trpc';
import {observable} from '@trpc/server/observable';

const ee = new EventEmitter();

export const testRouter = createTRPCRouter({
  one: publicProcedure.query(() => {
    return ['hello', 'world'];
  }),
  onAdd: publicProcedure.subscription(() => {
    return observable<any>((emit) => {
      const onAdd = (data: any) => {
        emit.next(data);
      };
      ee.on('add', onAdd);
      return () => {
        ee.off('add', onAdd);
      };
    });
  }),
  add: publicProcedure.mutation(async (opts) => {
    ee.emit('add', {});
    return {};
  }),
});
