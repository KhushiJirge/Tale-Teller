const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const fs = require('fs')
const path = require('path')

const Story = require('../models/Story')

router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({user:req.user.id}).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

router.get('/awards', (req, res) => {
    // Correct file path to the public directory
    fs.readFile(path.join(__dirname, '..', 'public', 'awards_data.json'), 'utf-8', (err, data) => {
        if (err) {
            console.error("Error reading awards data:", err)
            return res.render('error/500')
        }

        const awardsData = JSON.parse(data)  // Parse the JSON data
        res.render('awards', { awards: awardsData })
    })
})

module.exports = router