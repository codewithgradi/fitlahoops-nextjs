'use client'

import React, { useState } from 'react'
import Notification from '@/components/Notification'

const Login = () => {

  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      username: formData.username,
      password:formData.password,
    }

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (res.ok) {
        window.location.href="/admin/dashboard"
      } else {
        setError(data.message || 'Invalid credentials')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm px-8 py-6 bg-blue-50 shadow-2xl rounded-2xl flex flex-col gap-4 border border-orange-200"
      >
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          placeholder="Enter your username"
          className="border border-orange-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
        />

        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Enter your password"
          className="border border-orange-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition font-medium disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <Notification notification={error} />}
      </form>
    </div>
  )
}

export default Login
