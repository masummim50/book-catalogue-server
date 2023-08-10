const ApiError = require("../../errors/apiError");
const userModel = require("../user/user.model");
const sendResponse = require("./../../shared/sendResponse");


const getLists = async(req, res, next)=> {
    try {
        const lists = await userModel.findOne({_id:req.user._id}).select("wishlist reading").populate("wishlist._id reading._id");
        if(!lists){
            throw new ApiError(400, "error retrieving the lists")
        }
        if(lists){
            sendResponse(res, 200, "list retrieved successfully", lists)
        }
    } catch (error) {
        next(error)
    }
}


const UserController = {
    getLists
};

module.exports = UserController;
