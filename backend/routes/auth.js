import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Admin from '../models/Admin.js'
import MarketingTeam from '../models/MarketingTeam.js'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'shopsmart-dev-secret'

function calcAge(dob) {
  const birth = new Date(dob)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const monthDiff = now.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age -= 1
  }
  return age
}

router.post('/register', async (req, res) => {
  try {
    const { name, contact, address, dob, password } = req.body

    if (!name || !contact || !address || !dob || !password) {
      return res.status(400).json({ message: 'All fields are required.' })
    }
    if (!/^\d{10}$/.test(contact.replace(/\D/g, ''))) {
      return res.status(400).json({ message: 'Enter a valid 10-digit contact number.' })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' })
    }

    const age = calcAge(dob)
    if (!age) {
      return res.status(400).json({ message: 'Enter a valid date of birth.' })
    }

    const exists = await User.findOne({ contact })
    if (exists) {
      return res.status(409).json({ message: 'This mobile number is already registered.' })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      contact,
      address,
      dob,
      age,
      password: hashed,
    })

    res.status(201).json({
      message: 'Registration successful.',
      user: { id: user._id, name: user.name, contact: user.contact, age: user.age },
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body

    if (!identifier || !password) {
      return res.status(400).json({ message: 'Mobile number/username and password are required.' })
    }

    const [user, admin, marketing] = await Promise.all([
      User.findOne({ contact: identifier }),
      Admin.findOne({ username: identifier }),
      MarketingTeam.findOne({ username: identifier }),
    ])

    const account = user || admin || marketing
    if (!account) {
      return res.status(404).json({ message: 'No account found with this mobile number/username.' })
    }

    const ok = await bcrypt.compare(password, account.password)
    if (!ok) {
      return res.status(401).json({ message: 'Incorrect password. Please try again.' })
    }

    const role = user ? 'customer' : admin ? 'admin' : 'marketing'
    const token = jwt.sign({ id: account._id, role }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      token,
      role,
      user: { id: account._id, name: account.name || account.username, contact: account.contact },
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
})

router.post('/forgot-password', async (req, res) => {
  try {
    const { contact, password } = req.body

    if (!contact || !password) {
      return res.status(400).json({ message: 'Mobile number and new password are required.' })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' })
    }

    const user = await User.findOne({ contact })
    if (!user) {
      return res.status(404).json({ message: 'No account found with this mobile number.' })
    }

    user.password = await bcrypt.hash(password, 10)
    await user.save()

    res.json({ message: 'Password updated successfully. You can login now.' })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
})

export default router
