import UserForm from "../../components/UserForm";

export default function UsersPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Users</h1>
      <UserForm />
    </div>
  );
}
