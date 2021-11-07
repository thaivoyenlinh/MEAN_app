const { base } = require('../models/item');
const Item = require('../models/item');
const baseURL = 'http://localhost:4100';

class ItemController{

    storeItem(req, res){
        setTimeout(() => {
            const files = req.files;
            const pathToImages = [];
            try {
                files.forEach(file => {
                    const path = `/images/items/${req.body.item_name}/${file.filename}`;
                    pathToImages.push(path);
                })
                //! [Object: null prototype] => user parse to transfer to object {}
                const obj = JSON.parse(JSON.stringify(req.body));
                const data = {
                    item_name: obj.item_name,
                    item_price:  obj.item_price,
                    item_category:  obj.item_category,
                    item_type: obj.item_type,
                    item_discription:  obj.item_discription,
                    item_image: pathToImages,
                };
                const item = new Item(data);
                item
                    .save()
                    .then(() => {
                        return res.status(200).json({ 
                            message: {title: "SUCCESS", content: "You have successfully inserted the item"},
                            status: 1
                        });
                        // return res.status(200).json({ 
                        //     message: {title: "ERROR", content: "You have failed to insert the item"},
                        //     status: 0
                        // });
                    }) 
            } 
            catch (error) {
                return res.status(500).json({ 
                    message: {title: "ERROR", content: "You have failed to insert the item"},
                    status: 0
                });
                // return res.status(500).json({ 
                //     message: {title: "SUCCESS", content: "You have successfully inserted the item"},
                //     status: 1
                // });
            }
        }, 500);
    }

    getListOfItems(req, res){
        // setTimeout(() => {
            try {
                Item
                    .find({})
                    .then((data) => {
                        data.forEach(item => {
                            /*can not use forEach in for array item_image this case 
                            because value of this variable cannot be get out of function in forEach. 
                            Need to directively impact to value in this case and get out*/
                            /*data.forEach(item => {
                                item.item_image.forEach(path => {
                                    path = baseURL + path;
                                }) 
                            }); */
    
                            for(let i=0; i<item.item_image.length; i++){
                                item.item_image[i] = baseURL + item.item_image[i];
                            }
                        })
                        // console.log(data);
                        return res.json({message: "Fetch list of items successful!!", 
                                        status: 1, 
                                        data: data});
                    })
            } catch (error) {
                return res.json({message: "Fetch list of items failure!!", 
                                status: 0});
                
            }
        // }, 500)
    }

    deleteItem(req, res){
        try {
            const itemId = req.params.id;
            Item
                .remove({_id: itemId})
                .then(() => {
                    return res.status(200).json({ 
                        message: {title: "SUCCESS", content: "You have successfully deleted the item"},  
                        status: 1
                    });
                    // return res.status(200).json({ 
                    //     message: {title: "ERROR", content: "You have failed to delete the item"},  
                    //     status: 0
                    // });
                })
        } catch (error) {
            return res.status(500).json({ 
                message: {title: "ERROR", content: "You have failed to delete the item"},  
                status: 0
            });
            // return res.status(500).json({ 
            //     message: {title: "SUCCESS", content: "You have successfully deleted the item"},  
            //     status: 1
            // });
        }
    }

    getItemBySearch(req, res){
        console.log("SEARCH ITEM CONTROLLER: ");
        // console.log(req.params);
        const text = req.params.search;
        console.log("text",text);
        try {
            Item
                .find(
                    {
                        item_name: {
                            // i: To match both lower case and upper case pattern in the string.
                            $regex: text, $options: "i"
                    }}, 
                )
                .then((data) => {
                    data.forEach(item => {
                        for(let i=0; i<item.item_image.length; i++){
                            item.item_image[i] = baseURL + item.item_image[i];
                        }
                    })
                    console.log("DATA",data);
                    return res.json({message: "get items by search successful!!", 
                                    status: 1, 
                                    data: data});
                })
        } catch (error) {
            return res.json({message: "Fetch list of items failure!!", 
                            status: 0});
        }
    }

    updateItem(req, res){
        setTimeout(() => {
            try {
                const itemId = req.params.id,
                        data = req.body;
                let newItem = {
                    item_name: data.item_name_replace,
                    item_price: data.item_price_replace,
                    item_category: data.item_category_replace,
                    item_type: data.item_type_replace,
                    item_discription: data.item_discription_replace,
                }
                Item    
                    .updateOne({_id: itemId}, newItem)
                    .then(() => {
                        return res.status(200).json({ 
                            message: {title: "SUCCESS", content: "You have successfully updated the item"},
                            status: 1
                        });
                        // return res.status(200).json({ 
                        //     message: {title: "ERROR", content: "You have failed to update the item"},
                        //     status: 0
                        // });
                    })
            } catch (error) {
                return res.status(500).json({ 
                    message: {title: "ERROR", content: "You have failed to update the item"},
                    status: 0
                });
                // return res.status(500).json({
                //     message: {title: "SUCCESS", content: "You have successfully updated the item"},
                //     status: 1
                // });
            }
        }, 500);
    }

    getItemsByCategory(req, res){
        try {
            const categoryName = req.params.name;
            Item
                .find({item_category: categoryName})
                .then((data) => {
                    data.forEach(item => {
                        for(let i = 0; i < item.item_image.length; i++){
                            item.item_image[i] = baseURL + item.item_image[i];
                        }
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

    getItemById(req, res){
        try {
            const itemId = req.params.id;
            Item
                .findOne({_id: itemId})
                .then((data) => { 
                    for(let i=0; i<data.item_image.length; i++){
                        data.item_image[i] = baseURL + data.item_image[i];
                    }   
                                  
                    return res.json({message: "Fetch item successful!!", 
                                    status: 1,
                                    data: data});
                })
        } catch (error) {
            return res.json({message: "Fetch item failure!!", 
                            status: 0});
        }
    }

    getItemBy(req, res){
        console.log(req.body);
        const filterKey = req.body.filter;
        const filterValue = req.body.filterValue;
        try{
            Item
                .find({ [filterKey] : {$regex: filterValue, $options: "i"}})
                .then((data) => {
                    data.forEach(item => {
                        for(let i=0; i<item.item_image.length; i++){
                            item.item_image[i] = baseURL + item.item_image[i];
                        }
                    })
                    console.log("DATA",data);
                    return res.json({message: "get items by search successful!!", 
                                    status: 1, 
                                    data: data});
                })
        }catch(error){
            return res.json({message: "Fetch list of items failure!!", 
                            status: 0});
        }   
    }

}

module.exports = new ItemController();