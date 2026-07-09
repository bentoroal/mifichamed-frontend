export type UserCondition = {
  id: number
  status: string
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

export type DashboardTreatment = Treatment & {
  conditionId: number
  conditionName: string
  conditionStatus: string
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

export type Surgery = {
  id: number
  surgery: {
    id?: number
    name: string
  } | null
  surgery_date: string | null
  notes?: string | null
}

export type DashboardData = {
  profile: {
    full_name: string
    birth_date?: string | null
    weight: number | null
    height: number | null
    alcohol_consumption: string | null
    smoking_habits: string | null
    physical_activity: string | null
  }
  active_conditions: UserCondition[]
  active_symptoms: Symptom[]
  active_allergies: Allergy[]
  active_surgeries?: Surgery[]
}
