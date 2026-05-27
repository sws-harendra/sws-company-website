import { LoginForm } from "../components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-transparent flex min-h-svh flex-col items-center justify-center p-4 sm:p-6 md:p-0 md:justify-stretch md:items-stretch">
      <div className="w-full max-w-md md:max-w-none md:w-full md:flex md:flex-col md:justify-stretch">
        <LoginForm />
      </div>
    </div>
  );
}
