import { GraphQLObjectType } from 'graphql';

import TransactionMutations from '../modules/transaction/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: "Root of ... mutations",
  fields: () => ({
    ...TransactionMutations,
  }),
});