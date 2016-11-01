import {
  GraphQLList as List,
  GraphQLString as String,
  GraphQLInt as Int,
} from 'graphql';
import ProductType, { genderEnum } from '../types/ProductType';
import Product from '../models/Product';

const products = {
  type: new List(ProductType),
  args: {
    article: { type: String },
    gender: { type: genderEnum },
    limit: { type: Int },
  },
  resolve(_, { article, gender, limit }) {
    if (article) {
      return Product.findAll({ where: { article }, raw: true, limit: 1 }).then(results => results);
    }

    if (gender) {
      return Product.findAll({ where: { gender }, raw: true }).then(results => results);
    }

    return Product.findAll({ raw: true, limit }).then(results => results);
  },
};

export default products;
