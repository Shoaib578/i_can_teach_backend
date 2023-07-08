const express = require('express')
const app = express()
const connection = require('./config/connection')

connection()
const bodyParser = require('body-parser')
const cors = require('cors');
app.use(express.static("public"));
app.use(cors());

app.use(bodyParser.json())
bodyParser.urlencoded({ extended: true })


app.use(express.json());

const user = require('./routes/apis/user')
app.use('/apis/user',user)

const subscription = require('./routes/apis/subscription')
app.use('/apis/subscription',subscription)


const exam = require('./routes/apis/exam')
app.use('/apis/exam',exam)


const sub_exam = require('./routes/apis/sub_exam')

app.use('/apis/sub_exam',sub_exam)

const question = require('./routes/apis/question')
app.use('/apis/question',question)

const answer = require('./routes/apis/answer')
app.use('/apis/answer',answer)

const PORT = 5000
app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`)
})