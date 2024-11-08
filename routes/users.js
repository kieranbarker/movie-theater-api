const express = require('express')
const { User, Show, Watched } = require('../models/index.js')

const router = express.Router()
router.use(express.json())

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.status(200).json(users)
})

router.get('/:userId', async (req, res) => {
  const user = await User.findByPk(req.params.userId)

  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }

  res.status(200).json(user)
})

router.get('/:userId/shows', async (req, res) => {
  const user = await User.findByPk(req.params.userId)

  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }

  const shows = await user.getShows()
  res.status(200).json(shows)
})

router.post('/:userId/shows/:showId', async (req, res) => {
  const user = await User.findByPk(req.params.userId)

  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }

  const show = await Show.findByPk(req.params.showId)

  if (!show) {
    res.status(404).json({ error: 'Show not found' })
    return
  }

  await user.addShow(show)

  const watched = await Watched.findOne({
    where: {
      userId: req.params.userId,
      showId: req.params.showId
    }
  })

  res.status(201).json(watched)
})

module.exports = router
