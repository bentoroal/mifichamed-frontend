export type TreatmentItem = {
  id: number
  medication_id?: number | null
  medication?: {
    id?: number
    name?: string | null
  } | null
  dosage?: string | null
  frequency?: string | null
  start_date?: string | null
  end_date?: string | null
  notes?: string | null
  user_condition_id?: number | null
  condition_id?: number | null
  conditionName?: string | null
  conditionStatus?: string | null
  created_at?: string | null
}

export type MedicationCatalogItem = {
  id: number
  name: string
  is_custom?: boolean
  created_at?: string
  created_by_user_id?: number | null
}

export type UserConditionOption = {
  id: number
  status?: string | null
  condition?: {
    id?: number
    name?: string | null
  } | null
  treatments?: TreatmentItem[]
}
