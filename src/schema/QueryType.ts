
import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { connectionArgs, connectionFromArray } from 'graphql-relay';
import { TransactionConnection } from '../modules/transaction/TransactionType';
import { nodeField, nodesField } from '../modules/node/NodeInterface'
import TransactionModel from '../modules/transaction/TransactionModel';
import { UserType } from '../modules/user/UserType';
import UserModel from '../modules/user/UserModel';

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
      resolve: async (_, args) => {
        const data = await TransactionModel.find({})
        return connectionFromArray(data, args)
      }
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: async (_, args) => {

        const user = await UserModel.findOne({ _id: args.id })
        return user;

      }
    }
  })
})
export default QueryType
