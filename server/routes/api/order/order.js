import { Router } from 'express';
import express from 'express'
import mongoose from 'mongoose'
import { parseUserObj, validateIfAdmin, validateIfLoggedIn } from '../../../middlewares/authMiddlewares.js';
import product from '../../../models/product.js';
import order from '../../../models/order.js'
import customer from '../../../models/customer.js';
const router = Router();
router.use(express.json());
router.use(parseUserObj);
router.route('/').get(validateIfLoggedIn, async (req, res) => {
    const customerId = req.userObj?._id;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        //1. get cart of the customer and clear cart
        const customerData = await customer.findOne({ _id: customerId });
        const orderedProduct = customerData?.cart;
        if(orderedProduct.length == 0){
            return res.send({msg:"cart can not be empty"})
        }
        customerData.cart = [];
        await customerData.save();
        // console.log("cart",orderedProduct);

        //2. get product Ids for getting price
        let productIds = []
        for (let a of orderedProduct) {
            productIds.push(a.productId);
        }
        let products = await product.find({ _id: { $in: productIds } });

        //3. subtract the quantity of products
        let bulkOperations = orderedProduct.map((singleProduct) => ({
            updateOne: {
                filter: { _id: singleProduct.productId },
                update: { $inc: { quantity: -singleProduct.quantity } }
            }
        }))
        let a = await product.bulkWrite(bulkOperations, { session })

        let totalPrice = 0;
        //4. add price in orderedProduct
        const customOrderedProduct = orderedProduct.map((cartObj, index) => {
            totalPrice += products[index].price;
            return {
                productId: cartObj.productId,
                orderedQuantity: cartObj.quantity,
                productPrice: products[index].price,
                productName: products[index].productName,
                brand: products[index].brand,
                imgSrc: products[index].imgSrc,
            };
        });
        // for (let i = 0; i < orderedProduct.length; i++) {
        //     console.log(orderedProduct[i])
        //     orderedProduct[i].ok = 10;
        //     console.log(orderedProduct[i])
        // }
        console.log(customOrderedProduct);
        // create a order and save it in order
        let b = new order({
            customerId: customerId,
            products: customOrderedProduct,
            status: "order accepted",
            paymentType: "COD",
            billAmount: totalPrice
        });
        await b.save();
        res.redirect('/orders');

        await session.commitTransaction();
        session.endSession();
        console.log("updated");
    }
    catch (e) {
        await session.abortTransaction();
        session.endSession();
        console.log("transaction failed", e);
    }
})

export default router;
