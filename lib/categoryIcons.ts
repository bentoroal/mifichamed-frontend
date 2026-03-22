import {
  HeartPulse,
  Wind,
  Activity,
  Apple,
  Brain,
  Bone,
  Scan,
  ShieldAlert,
  Smile,
  Droplets,
  Ribbon,
  Bug,
  Eye,
  LucideIcon,
} from "lucide-react"

type CategoryKey =
  | "cardiovascular"
  | "respiratory"
  | "endocrine_metabolic"
  | "digestive"
  | "neurological"
  | "musculoskeletal"
  | "dermatological"
  | "immune_allergic"
  | "mental_health"
  | "genitourinary"
  | "oncological"
  | "infectious"
  | "sensory"

export const categoryIconMap: Record<CategoryKey, LucideIcon> = {
  cardiovascular: HeartPulse,       
  respiratory: Wind,                 
  endocrine_metabolic: Activity,     
  digestive: Apple,                  
  neurological: Brain,               
  musculoskeletal: Bone,             
  dermatological: Scan,              
  immune_allergic: ShieldAlert,      
  mental_health: Smile,              
  genitourinary: Droplets,           
  oncological: Ribbon,               
  infectious: Bug,                   
  sensory: Eye,                      
}

function normalizeCategory(category: string): CategoryKey {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") as CategoryKey
}

export function getCategoryIcon(category?: string): LucideIcon {
  if (!category) return Activity

  const normalized = normalizeCategory(category)

  return categoryIconMap[normalized] || Activity
}

