const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide the password i.e node mongo.js <password> ");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://rammy:${password}@cluster0.r0yoc.mongodb.net/fullstackopen?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

if (name && number) {
  const phonebook = new Phonebook({
    name,
    number,
  });

  phonebook.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Phonebook.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((phone) => {
      console.log(phone.name, phone.number);
    });
    mongoose.connection.close();
  });
}
