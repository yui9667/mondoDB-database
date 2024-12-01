import express from 'express';
import mongoose from 'mongoose';
const app = express();
app.use(express.json());
const PORT = 3000;

mongoose
  .connect('mongodb://localhost:27017/myinfodatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB', error));

const infoSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  hobby: String,
});

const Item = mongoose.model('Item', infoSchema);

app.get('/info', async (req, res) => {
  try {
    const information = await Item.find();
    res.json(information);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get info' });
  }
});

app.post('/info', async (req, res) => {
  try {
    const newInfo = new Item(req.body);
    await newInfo.save();
    res.json(newInfo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add info' });
  }
});

app.put('/info/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedItems = await Item.findByIdAndUpdate(id, updatedData);
    if (!updatedItems) {
      return res.status(404).json({ Error: 'item not found!' });
    }
    res.json(updatedItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update info' });
  }
});

app.delete('/info/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id).lean();
    if (!deletedItem) {
      return res.status(404).json({ Error: 'item not found!' });
    }
    res.status(200).json({ message: 'Item deleted', item: deletedItem });
  } catch (error) {
    res.status(500).json({ Error: 'Failed to delete info' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running port on ${PORT}`);
});
