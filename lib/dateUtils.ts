/**
 * Convierte una fecha YYYY-MM-DD a formato DD/MM/YYYY
 */
export const formatDateDDMMYYYY = (dateString: string | null | undefined): string => {
  if (!dateString) return "--"
  
  try {
    const [year, month, day] = dateString.split("-")
    return `${day}/${month}/${year}`
  } catch {
    return dateString
  }
}

/**
 * Convierte una fecha YYYY-MM-DD a formato más legible
 */
export const formatDateLocale = (dateString: string | null | undefined): string => {
  if (!dateString) return "--"
  
  try {
    const date = new Date(`${dateString}T00:00:00`)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return dateString
  }
}
