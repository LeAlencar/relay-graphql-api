import { GraphQLObjectType } from 'graphql';
import TransactionNewSubscription from '../modules/transaction/subscriptions/newTransactionSubscription';



const SubscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    TransactionNew: TransactionNewSubscription as any ,
  },
});

export default SubscriptionType;
