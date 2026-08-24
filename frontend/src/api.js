const BASE = '/api'

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const contentType = res.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    throw new Error('Backend not available')
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong. Please try again.')
  }
  return data
}

export function registerUser(payload) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

const MOCK_USERS = [
  { username: 'admin', password: 'admin123', role: 'admin', user: { name: 'Admin', email: 'admin@shopsmart.com' } },
  { username: 'marketing', password: 'marketing123', role: 'marketing', user: { name: 'Marketing', email: 'marketing@shopsmart.com' } },
  { username: 'aiml', password: 'aiml123', role: 'marketing', user: { name: 'AI/ML', email: 'aiml@shopsmart.com' } },
  { username: '9876543210', password: 'user123', role: 'customer', user: { name: 'Rahul Sharma', contact: '9876543210' } },
]

export async function loginUser(identifier, password) {
  try {
    return await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    })
  } catch {
    const match = MOCK_USERS.find(
      (u) => u.username === identifier && u.password === password
    )
    if (match) {
      return { token: 'mock-token-' + match.role, role: match.role, user: match.user }
    }
    throw new Error('Something went wrong. Please try again.')
  }
}

export function resetPassword(contact, password) {
  return request('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ contact, password }),
  })
}
