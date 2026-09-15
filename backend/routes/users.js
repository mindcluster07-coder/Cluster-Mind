import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { verifyToken, requireRole } from '../middleware/auth.js'

const router = Router()

router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').lean()
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }
    res.json({ user })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
})

router.patch('/me', verifyToken, async (req, res) => {
  try {
    const { name, email, contact, address, dob } = req.body
    const update = {}
    if (name !== undefined) update.name = name
    if (email !== undefined) update.email = String(email).toLowerCase()
    if (contact !== undefined) update.contact = contact
    if (address !== undefined) update.address = address
    if (dob !== undefined) {
      update.dob = dob
      const birth = new Date(dob)
      const now = new Date()
      let age = now.getFullYear() - birth.getFullYear()
      const monthDiff = now.getMonth() - birth.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) age -= 1
      update.age = age
    }

    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true }).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }
    res.json({ message: 'Profile updated.', user })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
})

router.put('/me/password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required.' })
    }
    if (String(newPassword).length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' })
    }
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }
    const ok = await bcrypt.compare(currentPassword, user.password)
    if (!ok) {
      return res.status(401).json({ message: 'Current password is incorrect.' })
    }
    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()
    res.json({ message: 'Password updated successfully.' })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
})

router.get('/', verifyToken, requireRole('admin', 'marketing'), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 }).lean()
    res.json({ users })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
})

router.get('/:id', verifyToken, requireRole('admin', 'marketing'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').lean()
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }
    res.json({ user })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
})

export default router
