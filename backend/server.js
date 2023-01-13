const express = require('express');
const cors = require('cors');
// const bodyParser = require("body-parser"); /* deprecated */

const app = express();

var corsOptions = {
	origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
	express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to velox application.' });
});

app.use('/api/users', require('./app/routes/user.routes.js'));
app.use('/api/purchases', require('./app/routes/purchase.routes.js'));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
