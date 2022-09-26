import { subscriptionWithClientId } from "graphql-relay-subscription"
import { pubSub } from "../../../PubSub"

import TransactionModel from "../TransactionModel"
import TransactionType from "../TransactionType"

type newTransaction = {
  transactionId: string
  id: string
}

const TransactionNewSubscription = subscriptionWithClientId({
  name: "TransactionNew",
  inputFields: {},
  outputFields: {
    transaction: {
      type: TransactionType,
      resolve: async ({id}: newTransaction) => TransactionModel.findOne({_id: id})
    }
  },
  subscribe: () => {
    return pubSub.asyncIterator("NEW_TRANSACTION")
  },
  getPayload: (obj: newTransaction) => {
    return {
      id: obj.transactionId
    }

  }
})


export default TransactionNewSubscription;
