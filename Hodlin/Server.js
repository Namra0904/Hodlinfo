import express from 'express';
import fetchingData from './fetchData.js';
import getData from './routes/getData.js';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 5000
app.use(cors());

app.use(express.static("public"));
app.use('/api', getData);

fetchingData();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});