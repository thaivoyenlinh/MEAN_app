class CategoryController{

    // get all categories
    getListOfCategories(req, res){

        // console.log(req);
        //* object send to client
        const tempObj = {
            name: 'abc',
            avatar: 'nnn'
        }

        return res.status(200).json(tempObj);
    }
}

module.exports = new CategoryController();