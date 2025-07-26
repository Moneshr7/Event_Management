const express = require('express');
const connectdb=require('./db')
const eventRoutes =require('./routes/eventRoutes');
const cors=require('cors');

const app = express();
const PORT = 5000;
connectdb();
app.use(express.json());
app.use(cors());
app.use('/api',eventRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
