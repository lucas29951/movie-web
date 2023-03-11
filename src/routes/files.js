const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


router.get('/add', isLoggedIn, (req, res) => {
    res.render('files/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { title, years, released, genre, director, actors, plot, poster, data_type } = req.body;
    const newMedia = {
        title,
        years,
        released,
        genre,
        director,
        actors,
        plot,
        poster,
        data_type
    };
    await pool.query('INSERT INTO media set ?', [newMedia]);
    req.flash('success', 'Movie saved successfully');
    res.redirect('/');
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM media WHERE ID = ?', [id]);
    req.flash('success', 'Movie removed successfully');
    res.redirect('/dashboard');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const media = await pool.query('SELECT * FROM media WHERE id = ?', [id]);
    res.render('files/edit', { media: media[0] });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, years, released, genre, director, actors, plot, poster, data_type } = req.body;
    const newMedia = {
        title,
        years,
        released,
        genre,
        director,
        actors,
        plot,
        poster,
        data_type
    };
    await pool.query('UPDATE media set ? WHERE id = ?', [newMedia, id]);
    req.flash('success', 'Movie updated successfully');
    res.redirect('/dashboard');
});

module.exports = router;