import { ProfileDetail } from "./_components/profile-detail"

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params
  console.log(id)
  return <ProfileDetail />
}
