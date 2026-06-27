import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { cmsService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { SALON_NAME } from "../../constants";
import { Award, Sparkles } from "lucide-react";

export default function About() {
  const { data } = useQuery({ queryKey: QUERY_KEYS.SETTINGS, queryFn: cmsService.getSettings });
  const { data: achievementsData } = useQuery({ queryKey: QUERY_KEYS.ACHIEVEMENTS, queryFn: cmsService.getAchievements });
  const { data: certData } = useQuery({ queryKey: QUERY_KEYS.CERTIFICATES, queryFn: cmsService.getCertificates });
  const settings = data?.data;
  const achievements = achievementsData?.data || [];
  const certificates = certData?.data || [];

  return (
    <div className="min-h-screen bg-[var(--color-surface)] pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl font-bold text-[var(--color-text-primary)] mb-4">About <span className="text-gradient-rose">{SALON_NAME}</span></motion.h1>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">{settings?.general?.about || "A premium beauty studio dedicated to bringing out your natural beauty."}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {[
            { label: "Our Mission", content: settings?.general?.mission || "To provide world-class beauty treatments in a welcoming environment." },
            { label: "Our Vision", content: settings?.general?.vision || "To be the most trusted beauty destination in the region." },
            { label: "Our Values", content: "Quality, Care, Innovation — everything we do is for you." },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-6">
              <h3 className="font-display font-semibold text-[var(--color-rose-400)] mb-2">{item.label}</h3>
              <p className="text-sm text-[var(--color-text-muted)]">{item.content}</p>
            </div>
          ))}
        </div>

        {achievements.length > 0 && (
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)] mb-8 text-center">Our <span className="text-gradient-rose">Journey</span></h2>
            <div className="relative border-l border-[var(--color-border)] ml-4 space-y-8">
              {achievements.sort((a, b) => a.year - b.year).map((ach, i) => (
                <motion.div key={ach._id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="relative pl-8"
                >
                  <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-[var(--color-rose-600)] border-2 border-[var(--color-surface)]" />
                  <span className="text-xs text-[var(--color-rose-400)] font-semibold">{ach.year}</span>
                  <h3 className="font-semibold text-[var(--color-text-primary)] mt-0.5">{ach.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{ach.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {certificates.length > 0 && (
          <div>
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)] mb-8 text-center">Our <span className="text-gradient-gold">Certificates</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {certificates.map((cert) => (
                <div key={cert._id} className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-4 text-center">
                  {cert.certificateImage && <img src={cert.certificateImage} alt={cert.title} className="w-full h-32 object-cover rounded-xl mb-3" />}
                  <h4 className="font-semibold text-[var(--color-text-primary)] text-sm">{cert.title}</h4>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{cert.organization}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
