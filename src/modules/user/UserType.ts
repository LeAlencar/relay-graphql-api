import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputFieldConfig,
  ThunkObjMap
} from 'graphql'
import { connectionDefinitions, globalIdField } from 'graphql-relay'
import { nodeInterface } from '../node/NodeInterface'
import { registerTypeLoader } from '../node/typeRegister'
import { load } from './UserLoader'


export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  interfaces: () => [nodeInterface],
  fields: () => ({
    id: globalIdField('User', user => user._id),
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

export const userInputType: ThunkObjMap<GraphQLInputFieldConfig> = {
  email: {
    type: new GraphQLNonNull(GraphQLString),
    description: `User's email`
  },
  username: {
    type: new GraphQLNonNull(GraphQLString),
    description: `User's username`
  },
  password: {
    type: new GraphQLNonNull(GraphQLString),
    description: `User's password`
  }
}

registerTypeLoader(UserType, load)

export const { connectionType: UserConnection, edgeType: UserEdge } = connectionDefinitions({
  nodeType: UserType
})
