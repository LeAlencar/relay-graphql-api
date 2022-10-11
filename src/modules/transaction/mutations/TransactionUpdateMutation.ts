import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import { fromGlobalId, mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { GraphQLContext } from '../../../types/types';

import TransactionModel from '../TransactionModel';
import { TransactionEdge } from '../TransactionType';
import * as TransactionLoader from '../TransactionLoader'

const mutation = mutationWithClientMutationId({
  name: 'TransactionUpdate',
  description: 'Update a Transaction',
  inputFields: {
    transactionId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    category: {
      type: new GraphQLNonNull(GraphQLString),
    },
    price: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  mutateAndGetPayload: async ({ transactionId, name, category, price }, context: GraphQLContext) => {

    if(!context.user) {
      return {
        error: 'user not logged'
      }
    }

    const transaction = await TransactionLoader.load(context, fromGlobalId(transactionId).id);

    if (!transaction) {
      return {
        error: 'Transaction not found',
      };
    }

    await TransactionModel.updateOne(
      {
        _id: transaction.id
      },
      {
        $set: {
          name,
          category,
          price
        },
      },
    );

    return {
      id: transaction._id,
      error: null,
      success: 'Transaction updated /o/',
    };
  },

  outputFields: {
    transactionEdge: {
      type: TransactionEdge,
      resolve: async ({ id }, _, context) => {
        // Load new edge from loader
        const transaction = await TransactionLoader.load(context, id)
        if (!transaction) {
          return null;
        }

        return {
          cursor: toGlobalId('Transaction', transaction._id),
          node: transaction,
        };
      },
    },
    success: {
      type: GraphQLString,
      resolve: response => response.success
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  }
});

export default mutation;
