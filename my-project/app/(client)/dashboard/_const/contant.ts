import {
  dashboardEnvelopIcon,
  dashboardLocationIcon,
  dashboardUserIcon,
} from "@/lib/icons";
export function getCardData(user: any) {
  const location = `${user?.living?.city &&  user?.living?.city}, ${user?.living?.state && user?.living?.state}, ${user?.living?.country && user?.living?.country}`

  return [
    {
      icon: dashboardUserIcon,
      title: "My Username",
      value: user?.username ?? "N/A",
    },
    {
      icon: dashboardLocationIcon,
      title: "My Location",
      value: location ?? "N/A",
    },
    {
      icon: dashboardEnvelopIcon,
      title: "My Email",
      value: user?.email ?? "N/A",
    },
  ];
}
