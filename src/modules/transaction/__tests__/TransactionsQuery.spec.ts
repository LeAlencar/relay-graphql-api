import { graphql } from 'graphql';

import { clearDbAndRestartCounters, connectMongoose, disconnectMongoose, sanitizeTestObject } from '../../../../test';
import { createUser } from '../../user/fixture/createUser';
import { schema } from '../../../schema/schema';
import { getContext } from '../../../getContext';
import { createTransaction } from '../fixture/createTransaction';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should return transaction from logged user only', async () => {
  const user = await createUser();

  await createTransaction({
    owner: user,
  });


  // language=GraphQL
  const query = `
    query Q {
      transactions(first: 10) {
        edges {
          node {
            name
            owner {
              id
              username
            }
            price
            category
          }
        }
      }
    }
  `;

  const rootValue = {};
  const contextValue = await getContext({ user });
  const variableValues = {};

  const result = await graphql({
    schema,
    source: query,
    rootValue,
    contextValue,
    variableValues,
  });

  expect(result.errors).toBeUndefined();

  // eslint-disable-next-line
  console.log('result: ', result.data.transactions.edges[0].node);
  expect(result.data.transactions.edges.length).toBe(1);
  expect(sanitizeTestObject(result.data)).toMatchSnapshot();
});
