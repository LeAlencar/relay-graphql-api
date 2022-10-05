import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql'
import { connectionDefinitions, globalIdField } from 'graphql-relay'
import { registerTypeLoader, nodeInterface } from '../node/typeRegister'
import { load } from './UserLoader'

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
    }
  })
})

registerTypeLoader(UserType, load)

export const { connectionType: UserConnection, edgeType: UserEdge } = connectionDefinitions({
  nodeType: UserType
})
