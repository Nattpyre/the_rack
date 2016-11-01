import {
  GraphQLList as List,
  GraphQLInt as Int,
  GraphQLString as String,
} from 'graphql';
import BrandType from '../types/BrandType';
import Brand from '../models/Brand';

const brands = {
  type: new List(BrandType),
  args: {
    name: { type: String },
    limit: { type: Int },
  },
  resolve(_, { name, limit }) {
    if (name) {
      return Brand.findAll({ where: { vanityName: name }, raw: true }).then(results => results);
    }

    return Brand.findAll({ raw: true, limit }).then(results => results);
  },
};

export default brands;
