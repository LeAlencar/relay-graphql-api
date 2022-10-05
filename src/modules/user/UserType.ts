import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql'
import { connectionDefinitions, globalIdField, connectionArgs } from 'graphql-relay'
import { registerTypeLoader, nodeInterface } from '../node/typeRegister'
import { TransactionConnection } from '../transaction/TransactionType'
import { load } from './UserLoader'
import * as TransactionLoader from '../transaction/TransactionLoader'
import { withFilter } from '@entria/graphql-mongo-helpers'
import { GraphQLContext } from '../../types/types'

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  interfaces: () => [nodeInterface],
  fields: () => ({
    id: globalIdField('User'),
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's username`,
      resolve: user => user.username
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: `User's email`,
      resolve: user => user.email
    },
    transactions: {
      type: TransactionConnection,
      args: {
        ...connectionArgs
      },
      resolve: async (_, args, context: GraphQLContext) => {
        return await TransactionLoader.loadAll(
          context,
          withFilter(args, {
            owner: context.user._id
          })
        )
      }
    }
  })
})

registerTypeLoader(UserType, load)

export const { connectionType: UserConnection, edgeType: UserEdge } = connectionDefinitions({
  nodeType: UserType
})
