const express = require('express')
const { User, Show } = require('../models/index.js')
const router = express.Router()

// GET /shows
router.get('/', async (req, res) => {
  const shows = await Show.findAll()
  res.json(shows)
})

// GET /shows/:showId
router.get('/:showId', async (req, res) => {
  const show = await Show.findByPk(req.params.showId)

  if (!show) {
    res.status(404).json({ error: 'Show not found' })
    return
  }

  res.json(show)
})

// GET /shows/:showId/users
router.get('/:showId/users', async (req, res) => {
  const show = await Show.findByPk(req.params.showId)

  if (!show) {
    res.json([])
    return
  }

  const users = await show.getUsers()
  res.json(users)
})

// PATCH /shows/:showId
// DELETE /shows/:showId
// GET /shows?genre= or GET /shows/genre/:genre

module.exports = router
