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

    /**
     * Function to delete a category by its category id  (use remove method)
     * This function just already to delete, 
     * not update this auto reload to update content, handle in client side
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    deleteCategory(req, res) {
        // console.log("RES: ",req); //? id in params
        //* router.delete('/:id', CategoryController.deleteCategory) => id in terminal
        
        try {
            const categoryId = req.params.id;
            Category
                .remove({_id: categoryId})
                .then(() => {
                    //? return message to notify, 
                    //? with status to set condition navigaion to different page 
                    return res.status(200).json({message: "Delete is successful",  
                                                 status: 1});
                }) 
        } catch (error) {
            return res.status(200).json({message: "ERROR: Delete is failure!!",  
                                         status: 0});
        }
    }

    //TODO EDIT FEATURE
    /**
     * Function to get a category by its category id
     * @param {*} req : request from client
     * @param {*} res : response from server
     * @returns response object
     */
    getCategory(req, res){
        try {
            const categoryId = req.params.id;
            Category
                .findOne({_id: categoryId})
                .then((data) => {
                    //? return message to notify, 
                    //? with status to set condition navigaion to different page 
                    //? transmis data from Server to Client
                    return res.status(200).json({message: "Fetch successfully a category",  
                                                 status: 1, 
                                                 data: data});
                }) 
        } catch (error) {
            return res.status(200).json({message: "ERROR: Fetch a category is failure!!",  
                                         status: 0});
        }
    }

    /**
     * Function to update a category by its category id
     * @param {*} req : request from client
     * @param {*} res : response from server
     * @returns response object
     */
    updateCategory(req, res){
        try {
            const categoryId = req.params.id,
                  data = req.body;
            // console.log(newCategory);
            let newCategory = {
                category_name: data.category_name_replace,
                category_image: data.category_image_replace
            };
            Category
                .updateOne({_id: categoryId}, newCategory)
                .then(() => {
                    //? return message to notify, 
                    //? with status to set condition navigaion to different page 
                    return res.status(200).json({message: "Update new information is successful",  
                                                 status: 1});
                }) 
        } catch (error) {
            return res.status(200).json({message: "ERROR: Update a category is failure!!",  
                                         status: 0});
        }
    }

}

module.exports = new CategoryController();