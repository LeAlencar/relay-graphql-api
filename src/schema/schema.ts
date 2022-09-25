import { GraphQLSchema } from 'graphql';

import QueryType from './QueryType';
import MutationType from './MutationType';
import TransactionNewSubscription from './SubscriptionType';

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  subscription: TransactionNewSubscription
});
