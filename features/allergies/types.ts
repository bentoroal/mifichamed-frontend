export type AllergyItem = {
  id: number
  allergy_id?: number | null
  status?: string | null
  start_date?: string | null
  end_date?: string | null
  notes?: string | null
  created_at?: string | null
  allergy?: {
    id?: number
    name?: string | null
  } | null
}

export type AllergyCatalogItem = {
  id: number
  name: string
  is_custom?: boolean
  created_by_user_id?: number | null
  created_at?: string
}
