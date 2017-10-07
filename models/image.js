const mongoose=require("mongoose");

var imageSchema=mongoose.Schema({
    user:String,
    private:String,
    dataURL: String,
    date: String
});


module.exports=mongoose.model("Image",imageSchema);