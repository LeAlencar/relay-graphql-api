import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLString, GraphQLNonNull } from 'graphql';
import bcrypt from 'bcryptjs';

import UserModel from '../UserModel';
import { UserType } from '../UserType';

import { generateJwtToken } from '../../../auth';

export const userLogin = mutationWithClientMutationId({
  name: 'UserLogin',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ username, password }) => {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error('This user was not registered. Please, try again!');
    }


    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Password incorrect, please try again!');
    }

    const token = generateJwtToken(user._id);

    return {
      token,
      user,
    };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    me: {
      type: UserType,
      resolve: ({ user }) => user,
    },
  },
});
