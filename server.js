const app = require('./app')
const dotenv = require('dotenv')

dotenv.config({path: './.env'})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`)
});