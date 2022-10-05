import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { GraphQLContext } from '../../../types/types';
import TransactionModel from "../TransactionModel"
import * as TransactionLoader from '../TransactionLoader'

const mutation = mutationWithClientMutationId({
  name: 'TransactionDelete',
  description: "Delete a Transaction",
  inputFields: {
    transactionId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ transactionId }, context: GraphQLContext) => {

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

    await TransactionModel.deleteOne({
      _id: transaction.id
    });

    return {
      id: transaction.id,
      error: null,
      success: 'Transaction removed',
    };
  },

  outputFields: {
    transactionId: {
        type: GraphQLID,
        resolve: async ({ id }, _, context) => {
          const transaction = await TransactionLoader.load(context, id)

          if (!transaction) {
            return null
          }

          return toGlobalId('Transaction', transaction._id)
        }
      },
      error: {
        type: GraphQLString,
        resolve: response => response.error
      },
      success: {
        type: GraphQLString,
        resolve: response => response.success
      }
    },
});

export default mutation;
