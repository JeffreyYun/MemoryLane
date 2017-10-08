var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

// TODO: Record # of photographs
var UserSchema = mongoose.Schema({

    local   : {
    username: {type: String, required: true},
    password: {type: String, required: true},
    },

    info    : {
    first_name: {type: String, default: ""},
    last_name: {type: String, default: ""},
    joined_date: {type: Date, default: Date.now},
    }

});

// generate hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", UserSchema);
