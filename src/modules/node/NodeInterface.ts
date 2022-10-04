import { fromGlobalId, nodeDefinitions } from "graphql-relay";

import TransactionModel from "../transaction/TransactionModel";
import TransactionType from "../transaction/TransactionType";
import UserModel from "../user/UserModel";
import { UserType } from "../user/UserType";

export const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
  async (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Transaction') {
      return await TransactionModel.find();
    }

    if (type === 'User') {
      return await UserModel.findOne({ _id: id })
    }

    return null;
  },
  (obj) => {
    if (obj instanceof TransactionModel) {
      return TransactionType;
    }

    if (obj instanceof UserModel) {
      return UserType;
    }

    return null;
  }
);
