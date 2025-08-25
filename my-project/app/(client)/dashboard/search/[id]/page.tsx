import { ProfileDetail } from "./_components/profile-detail"

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  console.log(params)
  return <ProfileDetail />
}
