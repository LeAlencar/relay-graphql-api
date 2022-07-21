import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { generateJwtToken } from "../../../auth";
import UserModel from "../UserModel";



export default mutationWithClientMutationId({
  name: "UserRegister",
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({username, email, password}) => {
    const userExists = await UserModel.findOne({
      email: email.trim().toLowerCase()
    })

    if(userExists) {
      return {
        error: "User already exists"
      }
    }

    const user = await new UserModel({
      username,
      email,
      password
    }).save()

    return {
      token: generateJwtToken(user._id),
      error: null
    }
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  }
  
})