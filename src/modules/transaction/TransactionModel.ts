import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITransaction extends Document{
  name: string;
  category: string;
  price: string;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    }
  },
  {
    collection: 'Transaction',
    timestamps: true,
  },
);

const TransactionModel: Model<ITransaction> = mongoose.model('Transaction', TransactionSchema);

export default TransactionModel;