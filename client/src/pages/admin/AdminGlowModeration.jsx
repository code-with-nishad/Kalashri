import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { glowFeedService } from "../../services";
import { toast } from "sonner";
import { Check, X, ShieldAlert, Award, Star, Pin } from "lucide-react";
import { Badge } from "../../components/ui/Badge";

export default function AdminGlowModeration() {
  const queryClient = useQueryClient();

  const { data: queueData, isLoading } = useQuery({
    queryKey: ["glowfeed", "admin", "queue"],
    queryFn: glowFeedService.getModerationQueue
  });
  const posts = queueData?.data || [];

  const moderateMutation = useMutation({
    mutationFn: ({ id, data }) => glowFeedService.moderatePost(id, data),
    onSuccess: () => {
      toast.success("Post moderated successfully");
      queryClient.invalidateQueries({ queryKey: ["glowfeed", "admin", "queue"] });
      queryClient.invalidateQueries({ queryKey: ["glowfeed", "posts"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to moderate post");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: glowFeedService.deletePost,
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries({ queryKey: ["glowfeed", "admin", "queue"] });
      queryClient.invalidateQueries({ queryKey: ["glowfeed", "posts"] });
    }
  });

  const handleStatusChange = (id, status) => {
    moderateMutation.mutate({ id, data: { status } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          Community Moderation Queue <ShieldAlert className="w-6 h-6 text-rose-500" />
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">Review pending customer posts and transformations before they appear on the public feed.</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <span className="w-8 h-8 border-2 border-[var(--color-rose-500)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border p-8">
          <Check className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="font-semibold text-lg text-[var(--color-text-primary)]">All Caught Up!</h3>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">There are no pending posts requiring moderation at this time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.filter(post => post.user).map(post => (
            <div key={post._id} className="bg-white border rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm">
              <div className="p-5 space-y-4">
                {/* User details */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center font-bold text-sm overflow-hidden text-gray-700">
                    {post.user?.avatar ? (
                      <img src={post.user.avatar} alt={post.user?.firstName} className="w-full h-full object-cover" />
                    ) : (
                      post.user?.firstName?.[0] || "?"
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[var(--color-text-primary)]">
                      {post.user?.firstName || 'Unknown'} {post.user?.lastName || 'User'}
                    </h4>
                    <p className="text-xs text-[var(--color-text-muted)]">{post.user?.email || 'No email'} · {post.user?.phone || 'No phone'}</p>
                  </div>
                </div>

                {/* Caption */}
                <p className="text-sm text-[var(--color-text-secondary)] whitespace-pre-wrap bg-gray-50 p-3 rounded-xl">
                  {post.caption}
                </p>

                {/* Media */}
                {post.isBeforeAfter && post.beforeImage && post.afterImage ? (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block mb-1">BEFORE</span>
                      <img src={post.beforeImage} alt="Before" className="w-full aspect-[4/3] object-cover rounded-lg border" />
                    </div>
                    <div>
                      <span className="text-[10px] text-rose-500 font-bold block mb-1">AFTER</span>
                      <img src={post.afterImage} alt="After" className="w-full aspect-[4/3] object-cover rounded-lg border" />
                    </div>
                  </div>
                ) : post.images && post.images.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {post.images.map((img, i) => (
                      <img key={i} src={img} alt="Post preview" className="w-24 h-24 object-cover rounded-lg border" />
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Action buttons */}
              <div className="p-4 bg-gray-50 border-t flex items-center justify-between gap-3">
                <button
                  onClick={() => deleteMutation.mutate(post._id)}
                  className="px-3 py-1.5 border border-red-200 hover:bg-red-50 text-red-600 text-xs font-semibold rounded-xl transition-colors"
                >
                  Reject & Delete
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(post._id, "Approved")}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
