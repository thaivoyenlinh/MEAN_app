const Category = require('../models/category');

class CategoryController{

    /**
     * Function to insert a category to the database
     * @param {*} req : request from client
     * @param {*} res : response from server
     * @returns : response object
     */
    //! handle to save data receive from client
    storeCategory(req, res){
        // console.log("REQUEST FROM CREATE CATEGORY: ",req);
        try {
            const data = req.body;
            const category = new Category(data);
            category
                .save()
                .then(() => {
                    //? return message to notify, 
                    //? with status to set condition navigaion to different page 
                    return res.status(200).json({message: "Insert data successful!!!",  status: 1});
                }) 
        } catch (error) {
            return res.status(200).json({message: "ERROR: insert data successful!!!",  status: 0});
        }

        
    }
    
    //! get all categories
    /**
     * Function to get list of categories
     * @param {*} req : request from client
     * @param {*} res : response from server
     * @returns response object
     */
    getListOfCategories(req, res){
        try {
            Category
                .find({})
                .then((data) => {
                    //? return message to notify, 
                    //? with status to set condition navigaion to different page 
                    //? transmis data from Server to Client
                    return res.status(200).json({message: "Fetch successfully list of categories",  
                                                 status: 1, 
                                                 data: data});
                }) 
        } catch (error) {
            return res.status(200).json({message: "ERROR: Fetch list of categories is failure!!",  
                                         status: 0});
        }
    }
}

module.exports = new CategoryController();