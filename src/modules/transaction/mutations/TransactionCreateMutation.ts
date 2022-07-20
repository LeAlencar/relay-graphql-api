import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import TransactionModel from '../TransactionModel';

import TransactionType from '../TransactionType';

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

    return {
      error: null,
      success: 'Transaction created \o/',
      transaction
    };
  },

  outputFields: {
    transaction: {
      type: TransactionType,
      resolve: response => response.transaction
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  },
  
});

export default mutation;