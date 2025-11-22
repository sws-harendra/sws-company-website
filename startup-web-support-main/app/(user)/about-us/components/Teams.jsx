"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import teamService from "@/services/team.service";

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const res = await teamService.getAll();
        setTeamMembers(res);
      } catch (error) {
        console.error("Failed to load team:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTeam();
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#0298DE]/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0298DE]/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold bg-gradient-to-r from-[#0298DE] to-[#0298DE] bg-clip-text text-transparent"
        >
          Meet the Team
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-gray-600 max-w-2xl mx-auto"
        >
          Our passionate team works together to bring creative ideas to life and
          deliver meaningful results.
        </motion.p>
      </div>

      {/* Team Grid */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-6">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">Loading...</p>
        ) : teamMembers.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No team members found.
          </p>
        ) : (
          teamMembers.map((member, index) => (
            <motion.div
              key={member.id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="group overflow-hidden rounded-3xl border border-white/20 bg-white/70 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative">
                {/* pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_top_right,theme(colors.indigo.400),transparent_60%)]" />

                <CardContent className="flex flex-col items-center text-center p-8 relative z-10">
                  <motion.div
                    className="relative mb-5"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Avatar className="w-28 h-28 ring-4 ring-indigo-100 transition-all duration-300">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="text-2xl font-semibold">
                        {member.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#0298DE] font-medium mt-1">
                    {member.position}
                  </p>
                  {member.description && (
                    <p className="text-sm text-gray-600 mt-2">
                      {member.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
