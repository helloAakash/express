const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE,{
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
})

.then(()=>console.log('database connected successfully'))