const Order = require('../models/order');
const baseURL = 'http://localhost:4100';

class OrderController{

    storeOrder(req, res){
        console.log("Order Controller!");
        try{
            const value = req.body;
            console.log(value);
            const data = {
                user_id: value.userId,
                item_id: [value.itemId],
                quatity_item: [1],
                total_price: value.totalPrice
            }
            const order = new Order(data);
            order
                .save()
                .then(() => {
                    return res.status(200).json({ 
                        message: {title: "SUCCESS", content: "You have ordered successfully"},  
                        status: 1
                    });
                })
        }catch(error){
            return res.status(500).json({ 
                message: {title: "ERROR", content: "You have ordered failure"},  
                status: 0
            });
        }
    }

}

module.exports = new OrderController();