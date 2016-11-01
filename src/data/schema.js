import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import brands from './queries/brands';
import products from './queries/products';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      brands,
      products,
    },
  }),
});

export default schema;
