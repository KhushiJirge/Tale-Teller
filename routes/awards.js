const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Serve the scraped awards data to the view
router.get('/awards', (req, res) => {
    // Read the JSON file containing the scraped data
    fs.readFile(path.join(__dirname, 'Book\StoryBook\public\awards_data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the JSON file:', err);
            return res.status(500).send('Internal Server Error');
        }

        const awards = JSON.parse(data);  // Parse the JSON data

        // Pass the awards data to the Handlebars view
        res.render('awards', { awards });
    });
});

module.exports = router;
