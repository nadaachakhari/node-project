const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema =  mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password : {type: String, required: true},
    lastName : {type: String ,required: true},
    firstName : {type: String ,required: true},
    role: { type: String,
            enum : ["user","admin"],
            default: 'user'
    }
})

userSchema.virtual('name').get(function () {
    // Concaténer le prénom et le nom pour former le champ virtuel "name"
    return this.firstName + ' ' + this.lastName;
});

userSchema.methods.toPublic = function () {
    const userObject = this.toObject();
    delete userObject.password;
    userObject.name = this.name; // Utiliser le champ virtuel "name"
    return userObject;
};

// Appliquer le plugin mongoose-unique-validator
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema)