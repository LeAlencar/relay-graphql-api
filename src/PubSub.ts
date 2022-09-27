import { PubSub } from 'graphql-subscriptions'

export const SUBSCRIPTIONS = {
  NEW_TRANSACTION: 'NEW_TRANSACTION'
}

export const pubSub =  new PubSub()
