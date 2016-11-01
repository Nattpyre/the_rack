import _ from 'lodash';
import Faker from 'faker';
import models from '../src/data/models';
import Brand from '../src/data/models/Brand';

/**
 * Add fake data to the database.
 */
models.sync({ force: true }).catch(err => console.error(err.stack)).then(() => {
  _.times(10, () => Brand.create({
    name: Faker.company.companyName(),
    description: Faker.company.catchPhrase(),
    logo: Faker.image.business(),
    vanityName: Faker.company.companySuffix(),
  }).then(brand => brand.createProduct({
    name: Faker.commerce.productName(),
    description: Faker.lorem.text(),
    gender: Faker.random.arrayElement(['male', 'female', 'unisex']),
    price: Faker.commerce.price(),
    size: Faker.random.arrayElement(['XS', 'S', 'M', 'L', 'XL']),
    color: Faker.commerce.color(),
    photos: _.range(5).map(() => Faker.image.fashion()),
    article: Faker.random.uuid(),
  })));
});
