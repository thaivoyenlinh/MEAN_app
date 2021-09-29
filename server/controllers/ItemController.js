const Item = require('../models/item');
const baseURL = 'http://localhost:4100';

class ItemController{

    storeItem(req, res){
        console.log("Controller:");
        // console.log(req.files);
        // const files = req.files.length;
        const files = req.files;
        const pathToImages = [];
        // console.log(files);
        try {
            files.forEach(file => {
                // console.log(element);
                const path = `/images/items/${req.body.item_name}/${file.filename}`;
                pathToImages.push(path);
            })
            console.log("PathToImage:", pathToImages);
            const obj = JSON.parse(JSON.stringify(req.body));
            // console.log(obj);
            const data = {
                item_name: obj.item_name,
                item_price:  obj.item_price,
                item_category:  obj.item_category,
                item_discription:  obj.item_discription,
                item_image: pathToImages,
            };
            const item = new Item(data);
            item
                .save()
                .then(() => {
                    //? return message to notify, 
                    //? with status to set condition navigaion to different page 
                    return res.status(200).json({message: "Insert data successful!!!",  status: 1});
                }) 
        } 
        catch (error) {
            return res.status(200).json({message: "ERROR: Insert data is not successful!!!",  status: 0});
        }
    }

    getListOfItems(req, res){
        try {
            Item
                .find({})
                .then((data) => {

                    data.forEach(item => {
                        item.item_image.forEach(path => {
                            path = baseURL + path;
                        }) 
                    }); 
                    return res.json({message: "Fetch list of items successful!!", 
                                    status: 1, 
                                    data: data});
                })
        } catch (error) {
            return res.json({message: "Fetch list of items failure!!", 
                            status: 0});
            
        }
    }

    deleteItem(req, res){
        // console.log("REQ: ", req);
        try {
            const itemId = req.params.id;
            Item
                .remove({_id: itemId})
                .then(() => {
                    return res.json({message: "Delete item successful!!", 
                                    status: 1});
                })
        } catch (error) {
            return res.json({message: "Delete item failure!!", 
                            status: 0});
            
        }
    }

    getItem(req, res){
        try {
            const itemId = req.params.id;
            Item
                .findOne({_id: itemId})
                .then((data) => {
                    return res.json({message: "Fetch item successful!!", 
                                    status: 1,
                                    data: data});
                })
        } catch (error) {
            return res.json({message: "Fetch item failure!!", 
                            status: 0});
            
        }
    }

    getItemByName(req, res){
        try {
            const itemName = req.params.name;
            Item
                .find({item_name: itemName})
                .then((data) => {
                    return res.json({message: "Fetch item successful!!", 
                                    status: 1,
                                    data: data});
                })
        } catch (error) {
            return res.json({message: "Fetch item failure!!", 
                            status: 0});
            
        }
    }

    updateItem(req, res){
        try {
            const itemId = req.params.id,
                    data = req.body;
            // console.log(data);
            let newItem = {
                item_name: data.item_name_replace,
                item_price: data.item_price_replace,
                item_category: data.item_category_replace,
                item_discription: data.item_discription_replace,
            }
            Item    
                .updateOne({_id: itemId}, newItem)
                .then(() => {
                    return res.status(200).json({message: "Update new information of item is successful",  
                                                 status: 1});
                })
        } catch (error) {
            return res.status(200).json({message: "ERROR: Update a item is failure!!",  
                                         status: 0});
        }
    }

    getItemsByCategory(req, res){
        // console.log(req.params.name);
        try {
            const categoryName = req.params.name;
            Item
                .find({item_category: categoryName})
                .then((data) => {

                    data.forEach(item => {
                        item.item_image = baseURL + item.item_image;
                    }); 
                    return res.json({message: "Fetch item successful!!", 
                                    status: 1,
                                    data: data});
                })
        } catch (error) {
            return res.json({message: "Fetch item failure!!", 
                            status: 0});    
        }
    }

}

module.exports = new ItemController();