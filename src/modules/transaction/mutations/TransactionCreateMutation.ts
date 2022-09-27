import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { pubSub, SUBSCRIPTIONS } from '../../../PubSub';
import { nodeInterface } from '../../node/NodeInterface';

import TransactionModel from '../TransactionModel';

import TransactionType, { TransactionEdge } from '../TransactionType';

const mutation = mutationWithClientMutationId({
  name: 'TransactionCreate',
  description: "Create a new Transaction",
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
  mutateAndGetPayload: async ({ transactionId, name, category, price }) => {

    const transaction = await new TransactionModel({transactionId, name, category, price}).save();


    if (!transaction) {
      return {
        error: 'Transaction not found',
      };
    }

    await pubSub.publish(SUBSCRIPTIONS.NEW_TRANSACTION, { transactionId: transaction._id})

    return {
      error: null,
      success: 'Transaction created',
      transaction
    };



  },

  outputFields: {
  transactionEdge: {
      type: TransactionEdge,
      resolve: async (response) => {
        // Load new edge from loader
        const transaction = response.transaction

        // Returns null if no node was loaded
        if (!transaction) {
          return null;
        }

        return {
          cursor: toGlobalId('Transaction', transaction._id),
          node: transaction,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  },


});

export default mutation;
