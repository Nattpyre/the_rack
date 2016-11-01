/* eslint-disable new-cap */

import {
  GraphQLID as ID,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLEnumType as Enum,
} from 'graphql';
import Brand from '../../data/models/Brand';
import Product from '../../data/models/Product';

export const genderEnum = new Enum({
  name: 'Gender',
  values: {
    male: { value: 'male' },
    female: { value: 'female' },
    unisex: { value: 'unisex' },
  },
});

const sizeEnum = new Enum({
  name: 'Size',
  values: {
    XS: { value: 'XS' },
    S: { value: 'S' },
    M: { value: 'M' },
    L: { value: 'L' },
    XL: { value: 'XL' },
  },
});

const ProductType = new ObjectType({
  name: 'Product',
  fields: () => {
    const BrandType = require('./BrandType').default; // eslint-disable-line global-require

    return {
      id: { type: new NonNull(ID) },
      name: { type: new NonNull(StringType) },
      description: { type: StringType },
      gender: { type: new NonNull(genderEnum) },
      price: { type: new NonNull(FloatType) },
      size: { type: new NonNull(sizeEnum) },
      sizes: {
        type: new List(sizeEnum),
        resolve: model => Product.findAll({
          where: { article: model.article },
          raw: true,
          attributes: ['size'],
        }).then(results => results.map(product => product.size)),
      },
      color: { type: new NonNull(StringType) },
      photos: { type: new List(StringType) },
      article: { type: new NonNull(StringType) },
      brand: {
        type: new NonNull(BrandType),
        resolve: model => Brand.findById(model.brandId).then(results => results),
      },
    };
  },
});

export default ProductType;
