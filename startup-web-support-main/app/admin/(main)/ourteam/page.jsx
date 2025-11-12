"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ReusableModal from "../../components/ReusableModal";
import teamService from "@/services/team.service";
import TeamForm from "../../components/TeamForm";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const loadTeams = async () => {
    setLoading(true);
    try {
      const res = await teamService.getAll();
      setTeams(res);
    } catch (err) {
      toast.error("Failed to fetch teams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await teamService.remove(id);
      toast.success("Member deleted");
      loadTeams();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Team Members</h1>
        <Button
          onClick={() => {
            setSelected(null);
            setModalOpen(true);
          }}
        >
          <PlusCircle className="w-4 h-4 mr-2" /> Add Member
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((t) => (
          <Card key={t.id} className="shadow-sm">
            <CardContent className="p-4">
              {t.image && (
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
              )}
              <h2 className="text-lg font-semibold">{t.name}</h2>
              <p className="text-sm text-gray-500">{t.position}</p>
              {t.description && (
                <p className="text-sm mt-2 text-gray-600">{t.description}</p>
              )}

              <div className="flex justify-end gap-2 mt-3">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setSelected(t);
                    setModalOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(t.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reusable Modal */}
      <ReusableModal
        title={selected ? "Edit Member" : "Add Member"}
        open={modalOpen}
        onOpenChange={setModalOpen}
      >
        <TeamForm
          selected={selected}
          onClose={() => setModalOpen(false)}
          onSuccess={loadTeams}
        />
      </ReusableModal>
    </div>
  );
}
