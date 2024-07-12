'use client';

import React from 'react';
import {api} from '../utils/api';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

interface PageProps {}

const Page: React.FC<PageProps> = (props) => {
  const testQuery = api.test.one.useQuery();

  const addPost = api.test.add.useMutation();

  api.test.onAdd.useSubscription(undefined, {
    onData(data) {
      console.log('received', data);
    },
    onError(err) {
      console.error('error', err);
    },
  });

  return (
    <Container>
      <Button
        onClick={() => {
          addPost.mutate();
          testQuery.refetch();
        }}
      >
        click me
      </Button>
    </Container>
  );
};

export default Page;
