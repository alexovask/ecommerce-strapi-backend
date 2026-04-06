// @ts-nocheck
'use strict';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


function calcDicountPrice(price, dicount) {
    if (!dicount) return price;
    const discountAmount = (price * dicount) / 100;
    const result = price - discountAmount;
    return result.toFixed(2);
}

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async paymentOrder(ctx) {
        const { token, products, idUser, addressShipping } = ctx.request.body;
        let totalPaymente = 0;
        products.forEach(product => {
            const priceTem = calcDicountPrice(product.price, product.discount);
            totalPaymente += Number(priceTem) * product.quantity;
        });

        const charge = await stripe.charges.create({
            amount: Math.round(totalPaymente * 100),
            currency: 'usd',
            source: token.id,
            description: `Payment for order of user: ${idUser}`,
            receipt_email: addressShipping.email,
        });

        const data = {
            products,
            user: idUser,
            totalPaymente,
            idPaument: charge.id,
            addressShipping,

        };

        const model = strapi.contentTypes('api::order.order');
        const validateData = await strapi.entityValidator.validateEntityCreation(
            model,
            data
        );

        const entry = await strapi.db.query('api::order.order').create({ data: validateData });
        return entry;
    },
}));

