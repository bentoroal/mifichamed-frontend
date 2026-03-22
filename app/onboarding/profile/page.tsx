// app/onboarding/profile/page.tsx

import ProfileForm from "@/features/profile/components/ProfileForm"

export default function OnboardingProfilePage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        Completa tu perfil
      </h1>

      <ProfileForm mode="onboarding" />
    </div>
  )
}