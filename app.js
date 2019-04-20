const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser: true});


const fruitSchema = new mongoose.Schema({
  name: String,
  rating:{
    type:Number,
    min:1,
    max:10
  },
  review:String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Apple",
  rating:7,
  review: "pretty solid as a fruit"
});

//fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
  name: "Mango",
  score: 8,
  review: "This is a decent fruit."
});
mango.save();

Person.updateOne({name: "John"}, {favouriteFruit: mango}, function(err){
  if(err){
    console.log("there is an error in updating john");
  }else{
    console.log("Succesfully updated John");
  }
});

// const person = new Person ({
//   name: "Amy",
//   age: 12,
//   favouriteFruit: pineapple
// });
//
// person.save();


const kiwi = new Fruit({
  name:"Kiwi",
  score: 10,
  review: "The best fruit ever tasted"
});

const orange = new Fruit({
  name:"orange",
  score: 5,
  review: "Too sour for me"
});

const banana = new Fruit({
  name:"banana",
  score: 9,
  review: "One of the best fruit ever eaten"
});

// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Succesfully saved all the fruits to the fruitsDB");
//   }
// });

Fruit.find(function(err,fruits){
  if(err){
    console.log(err);
  }else{
    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
})

// Fruit.updateOne({_id:"5c5f0b7c5dce120c98cb0e47"},{name: "Peach"}, function(err){
//   if(err){
//     console.log("there is an error");
//   }else{
//     console.log("Succesfully updated the document");
//   }
//
//
// });


// Fruit.deleteOne({name: "Peach"}, function(err){
//   if(err){
//     console.log("there is an error");
//   }else{
//     console.log("Succesfully deleted the document");
//   }
//
//
// });

//
// Person.deleteMany({name: "John"}, function(err){
//   if(err){
//     console.log("there is an error");
//   }else{
//     console.log("Succesfully deleted the document");
//   }
//
//
// });


















const findDocuments = function(db, callback){
   // get the document collection
  const collection = db.collection('fruits');
  //Find some documents
  collection.find({}).toArray(function(err, fruits){
    assert.equal(err,null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
}
