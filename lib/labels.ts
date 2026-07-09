export type HabitKind = "alcohol" | "smoking" | "physicalActivity"

const HABIT_LABELS: Record<HabitKind, Record<string, string>> = {
  alcohol: {
    none: "No",
    social: "Socialmente",
    regular: "Regular",
    heavy: "Fuerte",
  },
  smoking: {
    none: "No",
    social: "Socialmente",
    regular: "Regular",
    heavy: "Fuerte",
  },
  physicalActivity: {
    none: "Nada",
    light: "Poco",
    moderate: "Moderado",
    intense: "Intenso",
  },
}

const STATUS_LABELS: Record<string, string> = {
  active: "Activa",
  chronic: "Crónica",
  resolved: "Resuelta",
  remission: "Remisión",
}

export function normalizeBackendValue(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return ""
  }

  if (typeof value === "string") {
    return value.trim().toLowerCase()
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value)
  }

  if (typeof value === "object") {
    const maybeValue = value as { value?: unknown; label?: unknown }

    if (typeof maybeValue.value === "string") {
      return normalizeBackendValue(maybeValue.value)
    }

    if (typeof maybeValue.label === "string") {
      return normalizeBackendValue(maybeValue.label)
    }
  }

  return String(value).trim().toLowerCase()
}

export function getTranslatedValue(
  value: unknown,
  labels: Record<string, string>,
  fallback = "Sin registro"
) {
  const normalizedValue = normalizeBackendValue(value)

  if (!normalizedValue) {
    return fallback
  }

  return labels[normalizedValue] ?? (typeof value === "string" ? value : fallback)
}

export function getHabitLabel(
  value: unknown,
  kind: HabitKind,
  fallback = "Sin registro"
) {
  return getTranslatedValue(value, HABIT_LABELS[kind], fallback)
}

export function getStatusLabel(value: unknown, fallback = "Sin estado") {
  return getTranslatedValue(value, STATUS_LABELS, fallback)
}
