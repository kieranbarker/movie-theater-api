const express = require('express')
const { Show } = require('../models/index.js')

const router = express.Router()
router.use(express.json())

router.get('/', async (req, res) => {
  if (req.query.genre) {
    const shows = await Show.findAll({ where: { genre: req.query.genre } })
    res.status(200).json(shows)
    return
  }

  const shows = await Show.findAll()
  res.status(200).json(shows)
})

router.get('/:showId', async (req, res) => {
  const show = await Show.findByPk(req.params.showId)

  if (!show) {
    res.status(404).json({ error: 'Show not found' })
    return
  }

  res.status(200).json(show)
})

router.get('/:showId/users', async (req, res) => {
  const show = await Show.findByPk(req.params.showId)

  if (!show) {
    res.status(404).json({ error: 'Show not found' })
    return
  }

  const users = await show.getUsers()
  res.status(200).json(users)
})

router.patch('/:showId/available', async (req, res) => {
  let show = await Show.findByPk(req.params.showId)

  if (!show) {
    res.status(404).json({ error: 'Show not found' })
    return
  }

  show = await show.update({ available: !show.available })
  res.status(200).json(show)
})

router.delete('/:showId', async (req, res) => {
  const show = await Show.findByPk(req.params.showId)

  if (!show) {
    res.status(404).json({ error: 'Show not found' })
    return
  }

  await show.destroy()
  res.status(204).send()
})

module.exports = router
