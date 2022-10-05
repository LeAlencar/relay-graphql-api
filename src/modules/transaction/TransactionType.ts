import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";
import { nodeInterface, registerTypeLoader } from "../node/typeRegister";
import { load } from "./TransactionLoader";

export const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  description: "Transaction",
  fields: () => ({
    id: globalIdField("Transaction"),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ name }) => name,
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
