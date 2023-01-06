const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must be an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        messages: [],
        joinedChats: []
    }
)

userSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified(password)){
        const saltRounds = 10
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
})

userSchema.methods.isCorrectPassword = async function(password){
    return bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User