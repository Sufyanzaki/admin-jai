import { notFound } from 'next/navigation';

export default function DashboardCatchAllPage() {
  notFound(); // This triggers dashboard/not-found.js
}
