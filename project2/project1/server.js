//start server

const app = require('./app.js')

app.listen(5000 ,() => {
    console.log("Server running at port 5000")
})