const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0-xuvv3.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
})

const Person = mongoose.model('Person', personSchema)

const generateId = () => {
    return Math.floor(Math.random() * 1001)
}

if (process.argv.length === 3) {
    Person.find({}).then(res => {
        console.log('phonebook:')
        res.forEach(person => {
            console.log(person.name + ' ' + person.number)
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        id: generateId(),
    })
    person.save().then(res => {
        console.log('added ' + person.name + ' number ' + person.number + ' to phonebook')
        mongoose.connection.close()
    })
}

