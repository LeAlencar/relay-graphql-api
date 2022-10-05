
import { GraphQLObjectType } from 'graphql';
import { TransactionConnection } from '../modules/transaction/TransactionType';
import { UserType } from '../modules/user/UserType';
import { nodeField, nodesField } from '../modules/node/typeRegister';
import * as TransactionLoader from '../modules/transaction/TransactionLoader'
import * as UserLoader from '../modules/user/UserLoader'
import { connectionArgs, withFilter } from '@entria/graphql-mongo-helpers';
import { userInfo } from 'os';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    transactions: {
      type: TransactionConnection,
      args: {
        ...connectionArgs
      },
      resolve: async (_, args, context) => {
        if(!context.user) {
          return null
        }
        return await TransactionLoader.loadAll(context, withFilter(args, {
          owner: context.user._id
        }))
      }
    },
    user: {
      type: UserType,
      resolve: async (_, args, context) => {
        return await UserLoader.load(context, context.user?._id)
      }
    }
  })
})
export default QueryType
