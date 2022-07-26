/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLNonNull, GraphQLID } from 'graphql';

import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';

import TransactionModel from "../TransactionModel"

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
      id: transactionId._id,
      error: null,
      success: 'Transaction removed',
    };
  },

  outputFields: {
    transactionId: {
      type: GraphQLID,
      resolve: ({ id }: any) => id,
    },
  },
});

export default mutation;
