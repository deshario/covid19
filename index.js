const express = require('express');
const app = express();
const PORT = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const covidRoutes = require('./routes/covid');

app.use('/',covidRoutes); // Middleware

app.listen(PORT, () => {
    console.log(`=== Covid Server Running : ${PORT} ===`);
})