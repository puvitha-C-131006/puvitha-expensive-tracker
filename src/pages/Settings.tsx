import { Layout } from "@/components/Layout.tsx";
import { UserProfileForm } from "@/components/UserProfileForm";

const Settings = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Settings</h1>
      <div className="flex flex-col gap-8">
        <UserProfileForm />
        {/* Future settings sections can go here */}
      </div>
    </Layout>
  );
};

export default Settings;