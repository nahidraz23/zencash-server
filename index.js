const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5300;


// middlewares
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('ZenCash server is running.');
})

app.listen(port, () => {
    console.log(`ZenCash server is running on port: ${port}`);
})