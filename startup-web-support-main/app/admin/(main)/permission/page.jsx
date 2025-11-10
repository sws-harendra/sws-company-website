import PermissionForm from "../../components/PermissionForm";

export default function PermissionsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Permissions</h1>
      <PermissionForm />
    </div>
  );
}
