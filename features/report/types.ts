export type ReportFilters = {
  includeProfile: boolean
  includeConditions: boolean
  includeTreatments: boolean
  includeSymptoms: boolean
  includeAllergies: boolean
  includeSurgeries: boolean
  dateFrom?: string
  dateTo?: string
}

export type ReportProfile = {
  full_name?: string | null
  weight?: number | null
  height?: number | null
  alcohol_consumption?: string | null
  smoking_habits?: string | null
  physical_activity?: string | null
}

export type ReportCondition = {
  id: number
  status?: string | null
  start_date?: string | null
  end_date?: string | null
  notes?: string | null
  condition?: {
    id?: number
    name?: string | null
  } | null
}

export type ReportTreatment = {
  id: number
  dosage?: string | null
  frequency?: string | null
  start_date?: string | null
  end_date?: string | null
  notes?: string | null
  medication?: {
    id?: number
    name?: string | null
  } | null
}

export type ReportSymptom = {
  id: number
  notes?: string | null
  symptom?: {
    id?: number
    name?: string | null
  } | null
}

export type ReportAllergy = {
  id: number
  status?: string | null
  start_date?: string | null
  end_date?: string | null
  notes?: string | null
  allergy?: {
    id?: number
    name?: string | null
  } | null
}

export type ReportSurgery = {
  id: number
  surgery_date?: string | null
  notes?: string | null
  surgery?: {
    id?: number
    name?: string | null
  } | null
}

export type ReportData = {
  profile?: ReportProfile | null
  conditions?: ReportCondition[]
  treatments?: ReportTreatment[]
  symptoms?: ReportSymptom[]
  allergies?: ReportAllergy[]
  surgeries?: ReportSurgery[]
  generatedAt: string
}
