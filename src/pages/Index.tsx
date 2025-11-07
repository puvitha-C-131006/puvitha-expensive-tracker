import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
          Welcome to Expense Tracker
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Start managing your finances efficiently.
        </p>
        <Link to="/dashboard">
          <Button size="lg">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;