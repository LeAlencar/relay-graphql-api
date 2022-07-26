import { GraphQLObjectType } from 'graphql';

import TransactionMutations from '../modules/transaction/mutations';
import UserMutations from '../modules/user/mutations'

export default new GraphQLObjectType({
  name: 'Mutation',
  description: "Root of ... mutations",
  fields: () => ({
    ...TransactionMutations,
    ...UserMutations
  }),
});
