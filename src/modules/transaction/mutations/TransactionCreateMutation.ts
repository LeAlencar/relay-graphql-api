import { GraphQLNonNull, GraphQLString } from 'graphql';

import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { pubSub, SUBSCRIPTIONS } from '../../../PubSub';
import { GraphQLContext } from '../../../types/types';
import TransactionModel from '../TransactionModel';
import { TransactionEdge } from '../TransactionType';
import * as TransactionLoader from '../TransactionLoader'

const mutation = mutationWithClientMutationId({
  name: 'TransactionCreate',
  description: "Create a new Transaction",
  inputFields: {
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
  mutateAndGetPayload: async ({ name, category, price }, context: GraphQLContext) => {

    if (!context.user) {
      return {
        error: 'user not logged'
      }
    }

    const transaction = await new TransactionModel({
      name,
      owner: context.user._id,
      category,
      price
    }).save();

    await pubSub.publish(SUBSCRIPTIONS.NEW_TRANSACTION, { transactionId: transaction._id})

    return {
      error: null,
      success: 'Transaction created',
      id: transaction._id
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
