const mongoose=require("mongoose");


function connect(){
    mongoose.connect('mongodb+srv://dsubham257sd:qwerty1234@cluster0.h65ltjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected!'));
}
module.exports=connect;