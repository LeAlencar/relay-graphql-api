import { getCounter, getOrCreate } from '../../../../test';
import { DeepPartial } from '../../../../test/deepPartial';
import Transaction, { ITransaction } from '../TransactionModel';
import User from '../../user/UserModel';
import { createUser } from '../../user/fixture/createUser';

export const createTransaction = async (args: DeepPartial<ITransaction> = {}) => {
  const i = getCounter('transaction');

  let { owner } = args;

  if (!owner) {
    owner = await getOrCreate(User, createUser);
  }

  return new Transaction({
    name: `Transaction#${i}`,
    owner,
    price: "100.00",
    category: `Category ${i}`
  }).save();
};
