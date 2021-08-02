const Item = require('../models/item');

class ItemController{

    storeItem(req, res){
        // console.log(req);
        try {
            const data = req.body;
            const item = new Item(data);
            item
                .save()
                .then(() => {
                    return res.json({message: "Insert item successful!!", status: 1});
                })
        } catch (error) {
            return res.json({message: "Insert item failure!!", status: 0});
            
        }
    }

    getListOfItem(req, res){
        try {
            Item
                .find()
                .then((data) => {
                    return res.json({message: "Fetch list of items successful!!", 
                                    status: 1, 
                                    data: data});
                })
        } catch (error) {
            return res.json({message: "Fetch list of items failure!!", 
                            status: 0});
            
        }
    }

}

module.exports = new ItemController();