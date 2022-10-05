import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";
import { nodeInterface, registerTypeLoader } from "../node/typeRegister";
import { UserType } from "../user/UserType";
import { load } from "./TransactionLoader";
import * as UserLoader from '../user/UserLoader'
import { ITransaction } from "./TransactionModel";
import { GraphQLContext } from "../../types/types";

export const TransactionType = new GraphQLObjectType<ITransaction, GraphQLContext>({
  name: "Transaction",
  description: "Transaction",
  fields: () => ({
    id: globalIdField("Transaction"),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ name }) => name,
    },
    owner: {
      type: UserType,
      resolve: (transaction, _, context) => UserLoader.load(context, transaction.owner)
    },
    category: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ category }) => category,
    },
    price: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ price }) => price,
    },
  }),
  interfaces: () => [nodeInterface]
});

registerTypeLoader(TransactionType, load)

export const { connectionType: TransactionConnection, edgeType: TransactionEdge } = connectionDefinitions({
  name: "Transaction",
  nodeType: TransactionType,
});

export default TransactionType
