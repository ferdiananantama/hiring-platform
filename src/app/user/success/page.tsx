import SuccesApplyImg from "@/assets/images/succes-apply.png";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SuccesApply() {
  const route = useNavigate();
  
  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <Button
        onClick={() => route('/dashboard/user/job-list')}
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 h-8 w-8"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <img
        src={SuccesApplyImg}
        alt="No data illustration"
        className="w-72 h-72 mb-4"
      />
      <div className="text-center flex flex-col gap-3">
        <p className="text-xl font-semibold text-foreground">
          🎉 Your application was sent!{" "}
        </p>
        <p className="text-slate-600">
          Congratulations! You've taken the first step towards a rewarding
          career at Rakamin. <br /> We look forward to learning more about you
          during the application process.
        </p>
      </div>
    </div>
  );
}
