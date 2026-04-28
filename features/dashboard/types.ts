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
    weight: number | null
    height: number | null
  }
  active_conditions: UserCondition[]
  active_symptoms: Symptom[]
  active_allergies: Allergy[]
  active_surgeries?: Surgery[]
}
