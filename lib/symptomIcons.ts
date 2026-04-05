import {
  Brain,
  Thermometer,
  Wind,
  Activity,
  Droplets,
  Soup,
  Bed,
  HeartPulse,
  AlertCircle,
  Moon,
  Frown,
  SmilePlus,
} from "lucide-react"

export const symptomIcons: Record<string, any> = {
  "Dolor de cabeza": Brain,
  "Fiebre": Thermometer,
  "Tos": Wind,
  "Dolor de garganta": Wind,
  "Congestión nasal": Wind,
  "Fatiga": Bed,
  "Náuseas": AlertCircle,
  "Vómitos": AlertCircle,
  "Diarrea": Droplets,
  "Dolor abdominal": Activity,
  "Mareos": Activity,
  "Dolor muscular": Activity,
  "Dolor articular": Activity,
  "Escalofríos": Thermometer,
  "Sudoración excesiva": Droplets,
  "Pérdida de apetito": Soup,
  "Dificultad para respirar": Wind,
  "Palpitaciones": HeartPulse,
  "Erupción cutánea": AlertCircle,
  "Picazón": AlertCircle,
  "Insomnio": Moon,
  "Ansiedad": Frown,
  "Depresión": SmilePlus,
}

export function getSymptomIcon(name: string) {
  return symptomIcons[name] || AlertCircle
}