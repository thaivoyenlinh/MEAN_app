const Category = require('../models/category');
const baseURL = 'http://localhost:4100';

class CategoryController{

    storeCategory(req, res){
        setTimeout(() => {
            try {
                const pathToImage = `/images/categories/${req.file.filename}`;
                console.log(pathToImage);
                const data = {
                    category_name: req.body.category_name,
                    category_image: pathToImage
                };
                const category = new Category(data);
                category
                    .save()
                    .then(() => {
                        return res.status(200).json({ message: {title: "SUCCESS", content: "You have successfully inserted the category"},  status: 1});
                        //* test ERROR Message
                        // return res.status(200).json({ message: {title: "ERROR", content: "You have failed to insert the category"},  status: 0});
                    }) 
            } catch (error) {
                return res.status(500).json({ message: {title: "ERROR", content: "You have failed to insert the category"},  status: 0});
                //* test ERROR Message
                // return res.status(500).json({ message: {title: "SUCCESS", content: "You have successfully inserted the category"},  status: 1});
            }
        }, 500);   
    }
    
    //! get all categories
    /**
     * Function to get list of categories
     * @param {*} req : request from client
     * @param {*} res : response from server
     * @returns response object
     */
    getListOfCategories(req, res){
        setTimeout(() => {
            try {
                Category
                    .find({})
                    .then((data) => {
                        
                        data.forEach(category => {
                            category.category_image = baseURL + category.category_image;
                        }); 
                        return res.status(200).json({message: "Fetch successfully list of categories",  
                                                    status: 1, 
                                                    data: data});
                    }) 
            } catch (error) {
                return res.status(500).json({message: "ERROR: Fetch list of categories is failure!!",  
                                            status: 0});
            }
        }, 500)
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
        try {
            const categoryId = req.params.id;
            Category
                .remove({_id: categoryId})
                .then(() => {
                    return res.status(200).json({ message: {title: "SUCCESS", content: "You have successfully deleted the category"},  status: 1});
                    //* test ERROR message
                    // return res.status(200).json({ message: {title: "ERROR", content: "You have failed to delete the category"},  status: 0});
                }) 
        } catch (error) {
            return res.status(500).json({ message: {title: "ERROR", content: "You have failed to delete the category"},  status: 0});
            //* test ERROR message
            // return res.status(500).json({ message: {title: "SUCCESS", content: "You have successfully deleted the category"},  status: 1});
            
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
            return res.status(500).json({message: "ERROR: Fetch a category is failure!!",  
                                         status: 0});
        }
    }

    /**
     * Function to update a category by its category id
     * @param {*} req : request from client
     * @param {*} res : response from server
     * @returns response object
     */
    updateAllFieldCategory(req, res){
        setTimeout(() => {
            try {
                const categoryId = req.params.id;
                const pathToImage = `/images/categories/${req.file.filename}`;
                // console.log(categoryId);
                let newCategory = {
                    category_name: req.body.category_name,
                    category_image: pathToImage,
                };

                console.log("newCategory: ",newCategory);
                Category
                    .updateOne({_id: categoryId}, newCategory)
                    .then(() => {
                        return res.status(200).json( {message: {title: "SUCCESS", content: "You have successfully updated the category"}, status: 1});
                        // return res.status(200).json({ message: {title: "ERROR", content: "You have failed to update the category"}, status: 0});
                    }) 
            } catch (error) {
                return res.status(500).json({ message: {title: "ERROR", content: "You have failed to update the category"}, status: 0});
                // return res.status(500).json( {message: {title: "SUCCESS", content: "You have successfully updated the category"}, status: 1});
            }
        }, 500);
        
    }

    updateCategory(req, res){
        setTimeout(() => {
            try {
                const categoryId = req.params.id;
                let newCategory = {
                    category_name: req.body.category_name,
                };

                console.log("newCategory: ",newCategory);
                Category
                    .updateOne({_id: categoryId}, newCategory)
                    .then(() => {
                        return res.status(200).json( {message: {title: "SUCCESS", content: "You have successfully updated the category"}, status: 1});
                        // return res.status(200).json({ message: {title: "ERROR", content: "You have failed to update the category"}, status: 0});
                    }) 
            } catch (error) {
                return res.status(500).json({ message: {title: "ERROR", content: "You have failed to update the category"}, status: 0});
                // return res.status(500).json( {message: {title: "SUCCESS", content: "You have successfully updated the category"}, status: 1});
            }
        }, 500);
        
    }

}

module.exports = new CategoryController();
