import { Link } from "react-router-dom";
import { GradientButton } from "@/components/GradientButton";
import { HomeHeader } from "@/components/HomeHeader";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HomeHeader />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center p-8 bg-card rounded-lg shadow-xl page-fade-in">
          <h1 className="text-5xl font-extrabold mb-4 text-card-foreground">
            Welcome to Home Expense Tracker
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Start managing your finances efficiently.
          </p>
          <Link to="/dashboard">
            <GradientButton>Go to Dashboard</GradientButton>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;