import { AccountSettings } from "./_components/account-settings";
import { Suspense } from "react";
export default function AccountPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountSettings />
    </Suspense>
  );
}
