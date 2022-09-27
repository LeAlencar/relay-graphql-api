/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import { fromGlobalId, mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import TransactionModel from "../TransactionModel"
import { TransactionEdge } from '../TransactionType';

const mutation = mutationWithClientMutationId({
  name: 'TransactionDelete',
  description: "Delete a Transaction",
  inputFields: {
    transactionId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ transactionId }) => {
    const transaction = await TransactionModel.findById({
      _id: fromGlobalId(transactionId).id
    });

    if (!transaction) {
      return {
        error: 'Transaction not found',
      };
    }

    await TransactionModel.deleteOne({
      _id: transaction.id
    });

    return {
      transaction,
      error: null,
      success: 'Transaction removed',
    };
  },

  outputFields: {
    transactionId: {
        type: GraphQLID,
        resolve: async (response) => {
          const transaction = response.transaction
          if (!transaction) {
            return null
          }

          return toGlobalId('Transaction', transaction._id)
        }
      },
      error: {
        type: GraphQLString,
        resolve: response => response.error
      }
    },
});

export default mutation;
