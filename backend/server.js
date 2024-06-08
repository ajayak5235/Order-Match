const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
require('dotenv').config();
const sequelize = require('./utility/database');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors()); 
app.use(bodyParser.json());
app.use('/api', orderRoutes);

sequelize.sync().then(result => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
}).catch(err => {
    console.log(err);
});
