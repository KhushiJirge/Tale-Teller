const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get('/awards', (req, res) => {
    fs.readFile(path.join(__dirname, 'Book\StoryBook\public\awards_data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the JSON file:', err);
            return res.status(500).send('Internal Server Error');
        }

        const awards = JSON.parse(data);

        res.render('awards', { awards });
    });
});

module.exports = router;
