var express = require('express');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require("./routes/studentRoutes")
const audit = require('express-requests-logger')
const helmet = require('helmet');


var app = express();
app.use(bodyParser.json());
// Use Helmet middleware to set the Referrer-Policy header
app.use(helmet({
    referrerPolicy: { policy: 'no-referrer-when-downgrade' }
}));

app.use(audit())




const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

// Apply to all requests
app.use(limiter);
connectDB();
const corsOptions = {
    origin: "http://127.0.0.1:5174",
    origin: "http://localhost:5174/",
};
app.options('*', cors());

//app.use(cors(corsOptions));
// Routes
app.use('/students', studentRoutes);

app.get('/', (req, res) => {
    // Simulate fetching data from MongoDB
    const data = { message: 'Hello, world!' };
   return res.json(data);
});
app.listen(3001, function () {
    console.log('Example app listening on port 3005!');
});