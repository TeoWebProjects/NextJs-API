import Order from '../models/orderModel.js'
import nodemailer from 'nodemailer'
import { orderEmail } from '../emails/orderEmail.js'

// async..await is not allowed in global scope, must use a wrapper
async function main(email, items) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //   let testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'nodejseshop@outlook.com', // generated ethereal user
      pass: '2541025410aA', // generated ethereal password
    },
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'nodejseshop@outlook.com', // sender address
    to: email, // list of receivers
    subject: 'Παραγγελεία απο MyEshop', // Subject line
    html: orderEmail(items), // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, shippingPrice, totalPrice, user_id } = req.body

    if (orderItems && orderItems.length === 0) {
      res.status(400)
      res.json({ message: 'No orders...' })
      return
    } else {
      const order = new Order({
        user_id,
        orderItems,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        totalPrice,
      })

      const createdOrder = await order.save()

      res.status(201).json(createdOrder)
      // main(shippingAddress.email, orderItems)
    }
  } catch (error) {
    console.log(error.message)
  }
}

const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.params.id }).populate('user_id')
    !orders ? res.status(404).json({ message: 'Orders Not Found!' }) : res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { addOrderItems, getOrdersByUserId }
