/* eslint-disable new-cap */

import {
  GraphQLID as ID,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';
import Product from '../models/Product';

const BrandType = new ObjectType({
  name: 'Brand',
  fields: () => {
    const ProductType = require('./ProductType').default; // eslint-disable-line global-require

    return {
      id: { type: new NonNull(ID) },
      name: { type: new NonNull(StringType) },
      description: { type: StringType },
      logo: { type: StringType },
      vanityName: { type: new NonNull(StringType) },
      products: {
        type: new List(ProductType),
        resolve: model => Product.findAll({
          where: { brandId: model.id },
          raw: true,
        }).then(products => products),
      },
    };
  },
});

export default BrandType;
