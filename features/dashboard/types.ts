export type Condition = {
  id: number
  condition: {
    name: string
  }
  treatments: Treatment[]
}

export type Treatment = {
  id: number
  medication: {
    name: string
  }
}

export type Symptom = {
  id: number
  symptom: {
    name: string
  }
}

export type Allergy = {
  id: number
  allergy: {
    name: string
  }
}

export type DashboardData = {
  profile: {
    full_name: string
    weight: number | null
    height: number | null
  }
  active_conditions: Condition[]
  active_symptoms: Symptom[]
  active_allergies: Allergy[]
}