import PermissionForm from "../../components/PermissionForm";

export default function PermissionsPage() {
  return (
    <div className="flex-1 flex flex-col space-y-6 transition-colors duration-300">
      <h1 className="text-2xl font-bold">Manage Permissions</h1>
      <PermissionForm />
    </div>
  );
}
