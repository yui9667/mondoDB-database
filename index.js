import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/myfirstdatabase', {
//   useNewUrlParser: true,
//   useUnifiedToplogy: true,
// });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));
//* Schema which defines the structure of our data
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  quantity: { type: Number, required: true, min: 1 },
});

//*Thinking as blueprint for creating, reading, updating, and deleting items in the database
const Item = mongoose.model('Item', itemSchema);

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get items' });
  }
});

app.get('/items/filter', async (req, res) => {
  try {
    const filteredItems = await Item.find({ name: 'banana' });
    res.json(filteredItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter items' });
  }
});

app.get('/items/quantity', async (req, res) => {
  try {
    //*gt greater lt less
    const items = await Item.find({ quantity: { $gt: 5 } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get items by quantity' });
  }
});

app.get('/items/sorted', async (req, res) => {
  try {
    const items = await Item.find().sort({ name: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to sort items' });
  }
});

app.get('/items/grouped', async (req, res) => {
  try {
    const groupedItems = await Item.aggregate([
      { $group: { _id: '$name', totalQuantity: { $sum: '$quantity' } } },
    ]);
    res.json(groupedItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to group items' });
  }
});

app.get('/items/count', async (req, res) => {
  try {
    const count = await Item.countDocuments();
    res.json({ totalItems: count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to count items' });
  }
});
//* why using asynchronous? because   await newItem.save(); waits for the items to be saved so that might take a little while
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get items' });
  }
});

app.post('/items/bulk', async (req, res) => {
  try {
    const items = [
      { name: 'apple', quantity: 10 },
      { name: 'banana', quantity: 5 },
      { name: 'orange', quantity: 8 },
      { name: 'grape', quantity: 15 },
      { name: 'watermelon', quantity: 2 },
      { name: 'kiwi', quantity: 12 },
      { name: 'mango', quantity: 7 },
      { name: 'pineapple', quantity: 4 },
      { name: 'strawberry', quantity: 20 },
      { name: 'blueberry', quantity: 30 },
      { name: 'peach', quantity: 6 },
      { name: 'plum', quantity: 14 },
      { name: 'cherry', quantity: 25 },
      { name: 'pear', quantity: 9 },
      { name: 'fig', quantity: 3 },
      { name: 'pomegranate', quantity: 11 },
      { name: 'cantaloupe', quantity: 13 },
      { name: 'raspberry', quantity: 18 },
      { name: 'blackberry', quantity: 22 },
      { name: 'apricot', quantity: 16 },
    ];
    const result = await Item.insertMany(items);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add info' });
  }
});

app.patch('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Item.updateOne(
      { _id: id },
      { $set: { quantity: 20 } }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update items' });
  }
});

app.put('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedItems = await Item.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedItems) {
      return res.status(404).json({ error: 'item not found!' });
    }
    res.json(updatedItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update items' });
  }
});
app.delete('/items/deleteMany', async (req, res) => {
  try {
    const result = await Item.deleteMany({ quantity: { $lt: 5 } });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete items' });
  }
});
app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'item not found!' });
    }
    res.json({ message: ' Item deleted', item: deletedItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete items' });
  }
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
