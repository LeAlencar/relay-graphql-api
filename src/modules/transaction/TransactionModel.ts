import mongoose, { Document, Model, Schema, Types } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types
export interface ITransaction extends Document{
  name: string;
  owner: Types.ObjectId
  category: string;
  price: string;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: ObjectId,
      ref: 'User',
      required: true
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
