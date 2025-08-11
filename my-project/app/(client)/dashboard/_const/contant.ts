import {
  dashboardEnvelopIcon,
  dashboardLocationIcon,
  dashboardUserIcon,
} from "@/lib/icons";

export function getCardData(user: any) {
  return [
    {
      icon: dashboardUserIcon,
      title: "My Username",
      value: user?.username ?? "N/A",
    },
    {
      icon: dashboardLocationIcon,
      title: "My Location",
      value: user?.location ?? "N/A",
    },
    {
      icon: dashboardEnvelopIcon,
      title: "My Email",
      value: user?.email ?? "N/A",
    },
  ];
}
