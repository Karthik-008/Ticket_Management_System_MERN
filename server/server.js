const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./Routes/routes')
require('dotenv').config();

const PORT = 5000;

const app = express();
app.use(cors(
    {
        origin: ["https://ticket-management-system-mern-3xuhddo69.vercel.app"],
        methods: ["POST", "GET", "PUT"],
        credentials: true
    }
));
app.use(express.json());
app.use('/', routes);

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}
).then(() => {
    console.log('Database Connected Successfully! - TicketManager');
}).catch(error => {
    console.log(`Could'nt connect to Database - ${error}`);
    process.exit();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});