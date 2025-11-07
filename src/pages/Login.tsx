import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/GradientButton";
import { showSuccess } from "@/utils/toast";
import { Footer } from "@/components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login
    login();
    showSuccess("Login successful! Redirecting to dashboard.");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background">
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md page-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              Welcome Back to Expense Tracker
            </CardTitle>
            <CardDescription>
              Enter your credentials to access the Expense Tracker.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="user@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <GradientButton type="submit" className="w-full">
                Sign In
              </GradientButton>
              <div className="text-center text-sm text-muted-foreground">
                <p>Hint: Click Sign In to proceed (Authentication is simulated)</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;