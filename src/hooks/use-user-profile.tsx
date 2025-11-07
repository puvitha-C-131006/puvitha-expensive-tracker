import React from "react";
import { getUserProfile, subscribeToProfileChanges, UserProfile } from "@/lib/types";

export function useUserProfile() {
  const [profile, setProfile] = React.useState<UserProfile>(getUserProfile());

  React.useEffect(() => {
    const unsubscribe = subscribeToProfileChanges(setProfile);
    return () => unsubscribe();
  }, []);

  return profile;
}