"use client"

import { useState } from "react"

export default function LoginForm() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")

  async function handleSubmit(e:any){
    e.preventDefault()

    const form = new URLSearchParams()
    form.append("username", email)
    form.append("password", password)

    const res = await fetch("http://127.0.0.1:8000/auth/login",{
      method:"POST",
      body:form
    })

    const data = await res.json()

    if(!res.ok){
      setError(data.detail || "Error al iniciar sesión")
      return
    }

    localStorage.setItem("token",data.access_token)

    window.location.href="/dashboard"
  }

  return (

    <form onSubmit={handleSubmit} className="space-y-5">

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="w-full border rounded-lg px-4 py-3"
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="w-full border rounded-lg px-4 py-3"
        required
      />

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button className="w-full bg-teal-600 text-white py-4 rounded-lg font-bold">
        Iniciar sesión
      </button>

    </form>
  )
}