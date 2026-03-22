"use client"

import { useEffect, useState } from "react"
import ProfileForm from "@/features/profile/components/ProfileForm"
import { getDashboard } from "@/lib/dashboard"

export default function ProfilePage() {

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    async function load() {
      const data = await getDashboard()
      setProfile(data.profile)
    }

    load()
  }, [])

  if (!profile) return <p>Cargando...</p>

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        Editar perfil
      </h1>

      <ProfileForm mode="edit" initialData={profile} />
    </div>
  )
}