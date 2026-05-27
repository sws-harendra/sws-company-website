import UserForm from "../../components/UserForm";

export default function UsersPage() {
  return (
    <div className="flex-1 flex flex-col space-y-6 transition-colors duration-300">
      <h1 className="text-2xl font-bold">Manage Users</h1>
      <UserForm />
    </div>
  );
}
