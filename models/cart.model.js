const mongoose = require('mongoose');


const cartSchema = mongoose.Schema({
  userId: {
    type: "ObjectId",
    ref: 'users',
    required: true,
  },
  items: [
    {
        productId: {
            type: "ObjectId",
            ref: 'products',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            default: 1,
          }
    }
  ],
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = {CartModel};