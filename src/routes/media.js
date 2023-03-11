const express = require('express');
const router = express.Router();

const pool = require('../database');


router.get('/:title', async (req, res) => {
    const { title } = req.params;
    const media = await pool.query('SELECT * FROM media WHERE title LIKE ?', [title]);
    res.render('media/details', { media: media[0] });
});


module.exports = router;