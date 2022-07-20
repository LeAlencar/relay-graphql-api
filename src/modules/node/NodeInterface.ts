import { fromGlobalId, nodeDefinitions } from "graphql-relay";

import TransactionModel from "../transaction/TransactionModel";
import TransactionType from "../transaction/TransactionType";

export const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
    async (globalId) => {
        const { type } = fromGlobalId(globalId);
        if (type === 'Transaction') {
            return await TransactionModel.find();
        }

        return null;
    },
    (obj) => {
        if (obj instanceof TransactionModel) {
            return TransactionType;
        }

        return null;
    }
);