
import { GraphQLObjectType } from 'graphql';
import { connectionArgs, connectionFromArray } from 'graphql-relay';
import { TransactionConnection } from '../modules/transaction/TransactionType';
import { nodeField } from '../modules/node/NodeInterface'
import TransactionModel from '../modules/transaction/TransactionModel';

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'The root of all queries',
    fields: () => ({
        node: nodeField,
        transactions: {
            type: TransactionConnection,
            args: {
              ...connectionArgs
            },
            resolve: async (_, args) => {
                const data = await TransactionModel.find({})
                return connectionFromArray(data, args)
            }
        }
    })
})
export default QueryType