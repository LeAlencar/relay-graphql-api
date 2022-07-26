import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';

import TransactionModel from '../TransactionModel';


import TransactionType from '../TransactionType';

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
  mutateAndGetPayload: async ({ transactionId, name, category, price }) => {
    const transaction = await TransactionModel.findById({
      _id: fromGlobalId(transactionId).id,
      name,
      category,
      price
    });

    if (!transaction) {
      return {
        error: 'Transaction not found',
      };
    }

    await TransactionModel.updateOne(
      {
        _id: transaction._id
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
    transaction: {
      type: TransactionType,
      resolve: response => response.transaction
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  }
});

export default mutation;
