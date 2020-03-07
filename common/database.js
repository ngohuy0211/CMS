const mongoose = require('mongoose')
module.exports = ()=>{
    mongoose.connect(
        'mongodb://localhost:27017/Cms_database',
        {useNewUrlParser: true}
    )

    return mongoose
}