const sequelize = require("sequelize");
const cart = require("../../database/models/cart");
const orders = require("../../database/models/orders");
const payments = require("../../database/models/payments");
const products = require("../../database/models/products");
const { validationResult } = require("express-validator");
const { createMollieClient } = require("@mollie/api-client");

const { response } = require("express");

//Get All Carts
exports.getAllCarts = async (req, res, next) => {
  try {
    var cart_response = await cart.findAll();

    return res.status(200).json(cart_response);
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      message: "Error Adding items to cart",
      error: e,
    });
  }
};
//Get Cart by ID
exports.getCartByID = async (req, res, next) => {
  const errors = validationResult(req); //if errors from user_request.js
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  try {
    const { user_id, cart_id } = req.body;
    var cart_response = await cart.findOne({
      include: ["orders"],
      where: [
        {
          id: cart_id,
        },
        {
          user_id: user_id,
        },
      ],
    });

    return res.status(200).json(cart_response);
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      message: "Error Adding items to cart",
      error: e,
    });
  }
};

//add new item to cart
exports.addToCart = async (req, res, next) => {
  const errors = validationResult(req); //if errors from user_request.js
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  try {
    const { product_id, user_id } = req.body;
    var quantity = req.body.quantity ? req.body.quantity : 1;
    var cart_response = {};

    //Check if product exist in databse
    product_response = await products.findOne({ where: { id: product_id } });
    if (!product_response) {
      return res.status(422).json({
        message: "Invalid product ID",
      });
    }
    //End Check if product exist in databse
    console.log("calculated_price", parseFloat(product_response.price));
    var product_price = parseFloat(product_response.price);
    const data = {
      price: null,
      user_id: user_id,
      quantity: null,
    };
    //saving NULL because this will be update at the end of this function
    await cart
      .findOne({ where: { user_id: user_id } })
      .then(async (result) => {
        if (result) {
          //if cart found, update its items.
          cart_response = await result.update(data);
        } else {
          //if cart not found, create new cart record and add its items.
          cart_response = await cart.create(data);
        }
      })
      .error((err) => {});

    //cart added/update, now adding order items of the cart
    console.log("product_price", product_price);
    order_response = await orders.create({
      cart_id: cart_response.id,
      user_id: cart_response.user_id,
      product_id: product_id,
      quantity: quantity,
      price: product_price,
    });
    //cart.build().calculatePrice();
    await update_cart_calculations(cart_response.id);
    return res.status(200).json(order_response);
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      message: "Error Adding items to cart",
      error: e,
    });
  }
};

//update cart quantity
exports.updateCartQuantity = async (req, res, next) => {
  try {
    const errors = validationResult(req); //if errors from user_request.js
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    console.log(req.body);
    const { order_id, quantity, user_id } = req.body;
    const data = {
      quantity: quantity,
    };
    var order_response = await orders.findOne({
      where: [
        {
          id: order_id,
        },
        {
          user_id: user_id,
        },
      ],
    });
    if (order_response) {
      await orders
        .update(data, { where: { id: order_id } })
        .then(async (result) => {
          await update_cart_calculations(order_response.cart_id);
          return res.status(200).json({
            message: "Cart updated successfully.",
          });
        })
        .error((err) => {
          return res.status(401).json({
            message: "Error Updating quantity",
            error: err,
          });
        });
    } else {
      return res.status(422).json({
        message: "Invalid Order ID",
      });
    }
  } catch (e) {
    console.log("Error Updating quantity", e);
    return res.status(401).json({
      message: "Error Updating quantity",
      error: e,
    });
  }
};

//delete cart item
exports.deleteCartItem = async (req, res, next) => {
  try {
    // const errors = validationResult(req); //if errors from user_request.js
    // if (!errors.isEmpty()) {
    //   res.status(422).json({ errors: errors.array() });
    //   return;
    // }

    const { order_id, user_id } = req.body;
    //taking user id in params, so make sure user deletes from his own order
    var order_response = await orders.findOne({
      where: [
        {
          id: order_id,
        },
        {
          user_id: user_id,
        },
      ],
    });
    if (order_response) {
      var cart_id = order_response.cart_id;
      await orders
        .destroy({ where: { id: order_id } })
        .then(async (rowDeleted) => {
          if (rowDeleted === 1) {
            await update_cart_calculations(cart_id);
            return res.status(200).json({
              message: "Cart Item Deleted successfully.",
            });
          }
        })
        .error((err) => {
          return res.status(401).json({
            message: "Error deleting cart Item",
            error: err,
          });
        });
    } else {
      return res.status(422).json({
        message: "Invalid Order ID",
      });
    }
  } catch (e) {
    console.log("Error deleting cart item", e);
    return res.status(401).json({
      message: "Error deleting cart item",
      error: e,
    });
  }
};

calculate_product_price = async (product_id, quantity) => {};

/*****THIS FUNCTION IS USED TO UPDATE CART TABLE WHEN EVER CHANGES (INSERT UPDATE DELETE) IN ORDER TABLE ENTRIES. IT CALCULATE CART TOTAL BASE ON ORDER ITEMS.****/
update_cart_calculations = async (cart_id) => {
  var cart_object = await cart.findOne({
    where: { id: cart_id },
    include: ["orders"],
  });
  if (cart_object) {
    // var orders_object = await orders.findAll({
    //   attributes: [
    //     [sequelize.fn("sum", sequelize.col("price")), "total_price"],
    //     [sequelize.fn("sum", sequelize.col("quantity")), "total_quantity"],
    //   ],
    //   where: {
    //     cart_id: cart_object.id,
    //   },
    //   raw: true,
    // });
    // total_price = orders_object[0].total_price;
    // total_quantity = orders_object[0].total_quantity;

    //console.log("cart_object.orders",cart_object.orders);
    var total_quantity = 0;
    var total_price = 0;
    cart_object.orders.forEach((order) => {
      total_price += order.price * order.quantity;
      total_quantity += order.quantity;
    });

    /*var query=`select sum(price) from order`
    var total_price=await sequelize
    .query(query, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {
      console.log(records);
      result = records[0];
    })
    .catch((err) => {});*/
    console.log("sum", total_price);
    console.log("total_quantity", total_quantity);
    var update_response = await cart.update(
      {
        quantity: total_quantity,
        price: total_price,
      },
      { where: { id: cart_id } }
    );
    console.log("cart_id", cart_id);
    console.log("update_response", update_response);
  }
};

exports.checkout = async (req, res) => {
  const errors = validationResult(req); //if errors from user_request.js
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  console.log("checkout called");
  const mollieClient = createMollieClient({
    apiKey: "test_bv74rGDe9wC22EcHdyw3d7C9BgQtRw",
  });
  console.log("checkout object created");

  // cart id to get cart. And from cart object we will get order price.
  //first validate if cart id exists
  var cart_id = req.body.cart_id;
  //var cart_id = 12;
  cart_response = await cart.findOne({
    include: ["orders"],
    where: [
      {
        id: cart_id,
      },
    ],
  });

  if (!cart_response) {
    return res.status(422).json({
      message: "Invalid Cart ID",
    });
  }
  console.log("cart_response", cart_response.price);

  mollieClient.payments
    .create({
      amount: {
        value: cart_response.price.toFixed(2),
        currency: "EUR",
      },
      description: "Order #" + cart_id,
      method: "creditcard",
      redirectUrl: "https://backend.develop.pdt.agifly.cloud/cart/completed_process",
      webhookUrl:
        "https://backend.develop.pdt.agifly.cloud/cart/receive-payment-response",
      //webhookUrl: "https://pdt.requestcatcher.com/",
      metadata: {
        order_id: "Order #" + cart_id,
        cart_id: cart_id,
      },
    })
    .then((payment) => {
      //console.log("payment", payment);
      res.status(200).json({
        payment_link: payment._links.checkout.href,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json({
        error: error,
        message: "error in processing your payment.",
      });
    });
};

exports.receivePaymentResponse = (req, res) => {
  console.log("getting payment details");
  //console.log("req",req);
  //console.log("body", req.body);
  var transaction_id = req.body.id;

  //return res.send(transaction_id);
  //return;
  // var amount = req.body.amount.value;
  // var status = req.body.status;
  // console.log("transaction_id", transaction_id);
  //res.status(200).json(transaction_id);

  const mollieClient = createMollieClient({
    apiKey: "test_bv74rGDe9wC22EcHdyw3d7C9BgQtRw",
  });

  mollieClient.payments
    .get(transaction_id)
    .then(async (payment_response) => {
      //console.log("transaction details", payment_response);
      var payment_data = {
        cart_id: payment_response.metadata.cart_id,
        transaction_id: transaction_id,
        amount: payment_response.amount.value,
        status: payment_response.status,
        card: payment_response.details.cardNumber,
      };
      //console.log("payment data before creating model entry: ",payment_data);
      payment_model_response = await payments.create(payment_data);
      //res.redirect('localhost:3000/cart' );
      res.status(301).redirect("http://localhost:3000/complete");
      //window.location.href=""
      //res.status(200).json(payment_response);
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json({
        error: error,
        message:
          "error in getting transaction details. Check your transaction id.",
      });
    });
};
