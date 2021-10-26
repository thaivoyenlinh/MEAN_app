const User = require('../models/user');
const baseURL = 'http://localhost:4100';

class UserController{

    storeUser(req, res){
        setTimeout(() => {
            console.log("This is Store Controller: ");
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
                        return res.status(200).json({ 
                            message: {title: "SUCCESS", content: "You have successfully inserted the user"},  
                            status: 1
                        });
                    })
            } catch (error) {
                return res.status(500).json({ 
                    message: {title: "ERROR", content: "You have failed to insert the user"},  
                    status: 0
                });
            }
        }, 2000)    
    }

    getLatestUser(req, res){
        try {
            console.log("This is Get Latest User Controller: ");
            User
                .findOne({})
                .sort({_id:-1})
                .then((data) => {             
                    return res.status(200).json({ 
                        message: {title: "SUCCESS", content: "You have successfully fetched the user"},  
                        status: 1
                    });
                })
        } catch (error) {
            return res.status(500).json({ 
                message: {title: "ERROR", content: "You have failed to fetch the user"},  
                status: 0
            });
        }
    }

}

module.exports = new UserController();