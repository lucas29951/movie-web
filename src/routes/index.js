const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/', async (req, res) => {
    const media = await pool.query('SELECT * FROM media');
    res.render('index', { media });
});

router.post('/', async (req, res) => {
    const { media_search } = req.body;
    const media = await pool.query('SELECT * FROM media WHERE title LIKE ?', [media_search]);
    res.render('index', { media, media_search });
});

router.get('/movies', async (req, res) => {
    const media = await pool.query('SELECT * FROM media WHERE data_type LIKE "movie";');
    res.render('movies/list', { media });
});

router.get('/series', async (req, res) => {
    const media = await pool.query('SELECT * FROM media WHERE data_type LIKE "series";');
    res.render('series/list', { media });
});

router.get('/animes', async (req, res) => {
    const media = await pool.query('SELECT * FROM media WHERE data_type LIKE "anime";');
    res.render('animes/list', { media });
});

router.get('/profile', isLoggedIn, async (req, res) => {
    const files = await pool.query('SELECT * FROM media;');
    const movies = await pool.query('SELECT * FROM media WHERE data_type LIKE "movie";');
    const series = await pool.query('SELECT * FROM media WHERE data_type LIKE "series";');
    const anime = await pool.query('SELECT * FROM media WHERE data_type LIKE "anime";');
    res.render('profile', { files, movies, series, anime });
});

router.get('/dashboard', isLoggedIn, async (req, res) => {
    const media = await pool.query('SELECT * FROM media;');
    res.render('dashboard', { media });
});

router.post('/dashboard', isLoggedIn, async (req, res) => {
    const { media_search } = req.body;
    const media = await pool.query('SELECT * FROM media WHERE title LIKE ?', [media_search]);
    res.render('dashboard', { media, media_search });
});

router.get('/dashboard/:title', isLoggedIn, async (req, res) => {
    const { title } = req.params;
    const media = await pool.query('SELECT * FROM media WHERE title LIKE ?', [title]);
    res.render('media/details', { media: media[0] });
});

module.exports = router;