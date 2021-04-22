const PORT = process.env.PORT || 3001;
const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();
const users = require('./routes/users')
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/api/users',users);


// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/api/home", (req, res) => {
    res.json({ message: "Hello from server (api/home)!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

