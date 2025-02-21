// app.js
const express = require('express');
const connectDB = require('./databases/db');
const Item = require('./models/item');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
// MongoDB 연결
connectDB();


// POST
app.post('/movies', async (req, res) => {
    try {
      const { title, author, year, genre, summary } = req.body;
      const newItem = new Item({ title, author, year, genre, summary });

      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (error) {
      res.status(500).json({ error: "작품 등록 중 오류가 발생했습니다.", details: error.message });
    }
  });


// GET
app.get('/movies', async (req, res) => {
  try {
    const { title, genre, author } = req.query;
    // 검색을 위한 filter 객체
    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }
    if (genre) {
      filter.genre = genre;
    }
    if (author) {
      filter.author = { $regex: author, $options: 'i' };
    }
    
    const items = await Item.find(filter);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "작품 조회 중 오류가 발생했습니다.", details: error.message });
  }
});



// 개별 영화 조회 (id값)

app.get('/movies/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findById(id);
      if (!item) {
        return res.status(404).json({ error: "작품을 찾을 수 없습니다." });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "작품 조회 중 오류가 발생했습니다.", details: error.message });
    }
});


// 개별 영화 수정

app.put('/movies/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      const updatedItem = await Item.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!updatedItem) {
        return res.status(404).json({ error: "작품을 찾을 수 없습니다." });
      }
      res.json({ message: "수정 성공", item: updatedItem });
    } catch (error) {
      res.status(500).json({ error: "작품 수정 중 오류가 발생했습니다.", details: error.message });
    }
});

  
// 영화 삭제

app.delete('/movies/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedItem = await Item.findByIdAndDelete(id);
      if (!deletedItem) {
        return res.status(404).json({ error: "작품을 찾을 수 없습니다." });
      }
      res.json({ message: "삭제 성공", item: deletedItem });
    } catch (error) {
      res.status(500).json({ error: "작품 삭제 중 오류가 발생했습니다.", details: error.message });
    }
});
  

// 서버 리스닝

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});