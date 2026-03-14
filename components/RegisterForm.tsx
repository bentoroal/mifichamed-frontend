"use client"

import { useState } from "react"

export default function RegisterForm(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirm,setConfirm] = useState("")
  const [error,setError] = useState("")
  const [success,setSuccess] = useState("")

  async function handleSubmit(e:any){
    e.preventDefault()

    if(password !== confirm){
      setError("Las contraseñas no coinciden")
      return
    }

    if(password.length < 6){
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    const res = await fetch("http://127.0.0.1:8000/auth/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    })

    const data = await res.json()

    if(!res.ok){
      setError(data.detail || "Error al registrar usuario")
      return
    }

    setSuccess("Cuenta creada. Ahora puedes iniciar sesión.")
    setError("")
  }

  return(

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

      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirm}
        onChange={(e)=>setConfirm(e.target.value)}
        className="w-full border rounded-lg px-4 py-3"
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <button className="w-full bg-teal-600 text-white py-4 rounded-lg font-bold">
        Crear cuenta
      </button>

    </form>
  )
}