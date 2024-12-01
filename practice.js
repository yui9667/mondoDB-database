// import express from 'express';
// import mongoose from 'mongoose';

// const app = express();
// app.use(express.json());

//  mongoose.connect('mongodb://localhost:27017/myfirstdatabase', {
//   useNewUrlParser: true,
//   useUnifiedToplogy: true,
// });

// mongoose
//   .connect('mongodb://localhost:27017/myfirstdatabase')
//   .then(() =>
//     console
//       .log('Connected to MongoDB')
//       .catch((err) => console.error('Could not connect to MongoDB', err))
//   );
// //* Schema which defines the structure of our data
// const itemSchema = new mongoose.Schema({
//   name: String,
//   quantity: Number,
// });

// //*Thinking as blueprint for creating, reading, updating, and deleting items in the database
// const Item = mongoose.model('Item', itemSchema);

// app.get('/items', async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to get items' });
//   }
// });

// //* why using asynchronous? because   await newItem.save(); waits for the items to be saved so that might take a little while
// app.post('/items', async (req, res) => {
//   try {
//     const newItem = new Item(req.body);
//     await newItem.save();
//     res.json(newItem);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to get items' });
//   }
// });

// app.put('/items/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;
//     const updatedItems = await Item.findByIdAndUpdate(id, updatedData, {
//       new: true,
//     });
//     if (!updatedItems) {
//       return res.status(404).json({ error: 'item not found!' });
//     }
//     res.json(updatedItems);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update items' });
//   }
// });

// app.delete('/items/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedItem = await Item.findByIdAndDelete(id);
//     if (!deletedItem) {
//       return res.status(404).json({ error: 'item not found!' });
//     }
//     res.json({ message: ' Item deleted', item: deletedItem });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete items' });
//   }
// });
// app.listen(3000, () => {
//   console.log('Server is running at http://localhost:3000');
// });
