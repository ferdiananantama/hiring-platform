import { LoginForm1 } from "./components/login-form-1";
import Logo from "@/assets/images/logo-rakamin.png";

export default function Page() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-lg flex-col gap-4">
        <a href="/">
          <img src={Logo} alt="Rakamin Academy" className="h-14" />
        </a>
        <LoginForm1 />
      </div>
    </div>
  );
}
