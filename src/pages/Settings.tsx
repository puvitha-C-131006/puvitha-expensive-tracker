import { Layout } from "@/components/Layout.tsx";
import { UserProfileForm } from "@/components/UserProfileForm";
import { BudgetSettingsForm } from "@/components/BudgetSettingsForm";
import { NotificationSettingsForm } from "@/components/NotificationSettingsForm";

const Settings = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Settings</h1>
      <div className="flex flex-col gap-8">
        <UserProfileForm />
        <BudgetSettingsForm />
        <NotificationSettingsForm />
      </div>
    </Layout>
  );
};

export default Settings;