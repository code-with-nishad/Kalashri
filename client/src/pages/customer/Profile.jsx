import { useAuthStore } from "../../store/authStore";
import { motion } from "framer-motion";
import { User, Mail, Phone, Sparkles, Calendar, Edit2, Check, X, Camera, LogOut, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService, uploadService, journeyService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { formatDate, getMembershipColor, getInitials } from "../../utils";
import { Badge } from "../../components/ui/Badge";
import { useState } from "react";
import { toast } from "sonner";
import { useLogout } from "../../hooks/useAuth";
import BeautyJourneyPanel from "../../components/journey/BeautyJourneyPanel";

function ProfileSidebar({ user, formData, setFormData, isEditing, setIsEditing, isPending, isUploading, handleSubmit, handleImageUpload, onLogout }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-[var(--color-surface-card)] to-[var(--color-surface-2)] border p-6 text-center transition-all"
        style={{
          borderColor: `${getMembershipColor(user.membership)}50`,
          boxShadow: `0 10px 40px ${getMembershipColor(user.membership)}15`,
        }}
      >
        <div className="relative w-20 h-20 mx-auto mb-4 group cursor-pointer">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="avatar-upload" disabled={isUploading} />
          <label htmlFor="avatar-upload" className="w-full h-full rounded-full flex items-center justify-center overflow-hidden cursor-pointer bg-gradient-to-br from-[var(--color-rose-600)] to-[var(--color-rose-400)] text-[var(--color-text-primary)] text-2xl font-bold border-2 border-transparent hover:border-[var(--color-rose-300)] transition-all">
            {formData.avatar || user.avatar ? (
              <img src={formData.avatar || user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              getInitials(user.firstName, user.lastName)
            )}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
              {isUploading ? (
                <span className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              ) : (
                <Camera className="w-5 h-5 text-white" />
              )}
            </div>
          </label>
        </div>
        <h2 className="font-display text-xl font-bold text-[var(--color-text-primary)]">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">{user.email}</p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <Badge
            style={{
              color: getMembershipColor(user.membership),
              borderColor: `${getMembershipColor(user.membership)}40`,
              background: `${getMembershipColor(user.membership)}15`,
            }}
          >
            {user.membership} Member
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-[var(--color-border)]">
          <div className="text-center">
            <p className="font-display text-xl font-bold text-gradient-rose">{user.glowPoints || 0}</p>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">Glow Points</p>
          </div>
          <div className="text-center">
            <p className="font-display text-xl font-bold text-[var(--color-text-primary)]">{user.lifetimeGlowPoints || 0}</p>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">Lifetime</p>
          </div>
          <div className="text-center">
            <p className="font-display text-xl font-bold text-[var(--color-rose-500)]">{user.monthlyGlowPoints || 0}</p>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">Monthly</p>
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-[var(--color-border)]">
          <Link to="/rewards" className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-[var(--color-rose-500)] to-[var(--color-rose-600)] hover:opacity-90 text-white text-xs font-semibold rounded-xl transition-all shadow-md">
            <Gift className="w-4 h-4" /> Go to Rewards Store 🎁
          </Link>
        </div>
      </motion.div>

      <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-5 space-y-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[var(--color-text-primary)]">Account Details</h3>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 hover:bg-[var(--color-surface-2)] rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-rose-400)] transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone || "",
                    instagram: user.instagram || "",
                    avatar: user.avatar || "",
                  });
                }}
                className="p-2 hover:bg-[var(--color-surface-2)] rounded-lg text-[var(--color-text-muted)] hover:text-red-400 transition-colors"
                disabled={isPending}
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="p-2 hover:bg-[var(--color-surface-2)] rounded-lg text-[var(--color-text-muted)] hover:text-emerald-400 transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
                className="w-full px-3 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-sm"
                required
              />
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
                className="w-full px-3 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-sm"
                required
              />
            </div>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
              className="w-full px-3 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-sm"
              required
            />
            <input
              type="url"
              value={formData.instagram}
              onChange={(e) => setFormData((p) => ({ ...p, instagram: e.target.value }))}
              placeholder="Instagram URL"
              className="w-full px-3 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl text-sm"
            />
          </form>
        ) : (
          <div className="space-y-3">
            {[
              { icon: User, label: "Full Name", value: `${user.firstName} ${user.lastName}` },
              { icon: Mail, label: "Email", value: user.email },
              { icon: Phone, label: "Phone", value: user.phone || "Not provided" },
              { icon: Camera, label: "Instagram", value: user.instagram || "Not provided", isLink: !!user.instagram },
              { icon: Calendar, label: "Member Since", value: formatDate(user.createdAt) },
              { icon: Sparkles, label: "Membership", value: user.membership },
            ].map(({ icon: Icon, label, value, isLink }) => (
              <div key={label} className="flex items-center gap-3 py-1.5 border-b border-[var(--color-border)] last:border-0">
                <Icon className="w-3.5 h-3.5 text-[var(--color-rose-400)] flex-shrink-0" />
                <span className="text-xs text-[var(--color-text-muted)] w-24">{label}</span>
                {isLink ? (
                  <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--color-rose-400)] hover:underline flex-1 truncate">
                    {value}
                  </a>
                ) : (
                  <span className="text-xs text-[var(--color-text-primary)] flex-1">{value}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Link
        to="/rewards"
        className="block rounded-2xl bg-gradient-to-r from-[var(--color-rose-500)]/10 to-purple-500/10 border border-[var(--color-rose-500)]/20 p-4 hover:border-[var(--color-rose-500)]/40 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-rose-500)]/15 flex items-center justify-center">
            <Gift className="w-5 h-5 text-[var(--color-rose-500)]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">Book more, Glow more!</p>
            <p className="text-xs text-[var(--color-text-muted)]">Explore Rewards →</p>
          </div>
        </div>
      </Link>

      <button
        onClick={onLogout}
        className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-red-500 bg-red-50 hover:bg-red-100 transition-colors font-medium border border-red-100"
      >
        <LogOut className="w-5 h-5" /> Log Out
      </button>
    </div>
  );
}

export default function Profile() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    instagram: user?.instagram || "",
    avatar: user?.avatar || "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const { mutate: logout } = useLogout();

  const { data: journeyData, isLoading: journeyLoading } = useQuery({
    queryKey: QUERY_KEYS.MY_JOURNEY,
    queryFn: journeyService.getMyJourney,
    enabled: !!user,
  });

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: authService.updateMe,
    onSuccess: (res) => {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setUser(res.data);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ME });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update profile");
    },
  });

  if (!user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const res = await uploadService.uploadImage(file);
      setFormData((prev) => ({ ...prev, avatar: res.data.url }));
      toast.success("Profile picture updated! Please save changes.");
      setIsEditing(true);
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const journey = journeyData?.data;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-4 xl:col-span-4">
          <ProfileSidebar
            user={user}
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isPending={isPending}
            isUploading={isUploading}
            handleSubmit={handleSubmit}
            handleImageUpload={handleImageUpload}
            onLogout={() => logout()}
          />
        </div>

        <div className="lg:col-span-8 xl:col-span-8">
          <BeautyJourneyPanel journey={journey} isLoading={journeyLoading} />
        </div>
      </div>
    </div>
  );
}
