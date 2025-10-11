import React from 'react'
import AdminDashboard from './Board'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const DashPage =  async () => {
  const cookieStore = await cookies()
  const token =  cookieStore.get("token")?.value

  if(!token) redirect("/admin/auth")

  return (
    <div>
      <AdminDashboard/>
    </div>
  )
}

export default DashPage
