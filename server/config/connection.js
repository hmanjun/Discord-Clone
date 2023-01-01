const moongose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/chatDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = mongoose.connection