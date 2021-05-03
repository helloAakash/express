const OrderItem = require('../model/order-itemModel')
const Order = require('../model/orderModel')

exports.postOrderItem = (req,res)=>{
  let newOrderItem = new OrderItem({
    quantity:req.body.quantity,
    product:req.body.product
  })

  newOrderItem.save((error,orderItem)=>{
    if(error || !orderitem){
      return res.status(400).json({error:"something went wrong"})
    }
    res.json({orderitem})
  })
}
