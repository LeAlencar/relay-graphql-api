
import { GraphQLObjectType } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import { TransactionConnection } from '../modules/transaction/TransactionType';
import { UserType } from '../modules/user/UserType';
import { nodeField, nodesField } from '../modules/node/typeRegister';
import * as TransactionLoader from '../modules/transaction/TransactionLoader'
import * as UserLoader from '../modules/user/UserLoader'

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
        return await TransactionLoader.loadAll(context, args)
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
