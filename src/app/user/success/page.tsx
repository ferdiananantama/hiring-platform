import SuccesApplyImg from "@/assets/images/succes-apply.png";

export default function SuccesApply() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
