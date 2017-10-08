var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({

    local   : {
    username: String, ////{type: String, required: true},
    password: String, //{type: String, required: true},
    }

});

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", UserSchema);
