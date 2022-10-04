import { createLoader } from "@entria/graphql-mongo-helpers";
import { registerLoader } from "../loader/loaderRegister";
import TransactionModel from "./TransactionModel";

const {
  Wrapper: Transaction,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: TransactionModel,
  loaderName: 'TransactionLoader'
})

export { getLoader, clearCache, load, loadAll }
export default Transaction

registerLoader('TransactionLoader', getLoader)
