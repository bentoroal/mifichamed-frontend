"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { validateToken } from "@/lib/auth"

export default function ProtectedRoute({
  children
}: {
  children: React.ReactNode
}) {

  const router = useRouter()
  const [loading,setLoading] = useState(true)

  useEffect(() => {

    async function checkAuth(){

      const valid = await validateToken()

      if(!valid){
        router.push("/login")
        return
      }

      setLoading(false)
    }

    checkAuth()

  },[])

  if(loading){
    return <p className="p-10 text-center">Cargando sesión...</p>
  }

  return <>{children}</>
}