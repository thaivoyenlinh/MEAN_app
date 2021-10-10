const User = require('../models/user');
const baseURL = 'http://localhost:4100';

class UserController{

    storeUser(req, res){
        console.log("This is Controller: ");
        // console.log(req.body);

        try{
            const value = req.body;
            const data = {
                user_name: value.name,
                user_phoneNumber: value.phoneNumber,
                user_address: value.address,
            }
            console.log("data",data);
            const user = new User(data);
            user
                .save()
                .then(() => {
                    return res.status(200).json({message: "Insert USER data successful!!!",  status: 1});
                })
        } catch (error) {
            return res.status(500).json({message: "ERROR: insert USER data successful!!!",  status: 0});
        }
        
    }

}

module.exports = new UserController();