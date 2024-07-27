const express = require('express');
const app = express();

app.post('/like', (req, res) => {
  const likes = req.body.likes;
  // Update the like count in the database
  db.query(`UPDATE blog_posts SET likes = ${likes} WHERE id = 1`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error updating like count' });
    } else {
      res.send({ message: 'Like count updated successfully' });
    }
  });
});

app.post('/dislike', (req, res) => {
  const dislikes = req.body.dislikes;
  // Update the dislike count in the database
  db.query(`UPDATE blog_posts SET dislikes = ${dislikes} WHERE id = 1`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error updating dislike count' });
    } else {
      res.send({ message: 'Dislike count updated successfully' });
    }
  });
});