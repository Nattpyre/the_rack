import sequelize from '../sequelize';
import Brand from './Brand';
import Product from './Product';

Brand.hasMany(Product, {
  foreignKey: 'brandId',
  as: 'products',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { Product, Brand };
