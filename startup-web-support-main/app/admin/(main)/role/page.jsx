import RoleForm from "../../components/RoleForm";

export default function RolesPage() {
  return (
    <div className="flex-1 flex flex-col gap-6 transition-colors duration-300">
      <h1 className="text-2xl font-bold">Manage Roles</h1>
      <RoleForm />
    </div>
  );
}
