const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const covidRoutes = require('./routes/covid');

app.use('/',covidRoutes); // Middleware

app.listen(3000, () => {
    console.log('=== Covid Server Running ===');
})