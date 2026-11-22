import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  ThumbsUp,
  AlertTriangle,
  Lightbulb,
  Edit3,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CollaborativeStudio: React.FC = () => {
  const { peerComments, addPeerComment, currentUser, setCurrentAnswerDraft, setCurrentTab } = useApp();
  const [collabDraft, setCollabDraft] = useState(`In my previous role leading the payments service, our checkout API experienced 500ms p99 latency spikes during holiday campaigns.
To resolve this, I profiled our database query plans and identified N+1 queries on merchant inventory checks.
I redesigned the data retrieval layer by introducing Redis caching with a write-through strategy and implemented distributed idempotency keys.
As a result, p99 latency dropped by 64% (from 510ms down to 180ms) and checkout conversion increased by 3.4% without any payment discrepancies.`);

  const [commentText, setCommentText] = useState('');
  const [commentType, setCommentType] = useState<'suggestion' | 'praise' | 'critique'>('suggestion');
  const [copiedLink, setCopiedLink] = useState(false);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addPeerComment(commentText.trim(), commentType);
    setCommentText('');
  };

  const handlePushToInterview = () => {
    setCurrentAnswerDraft(collabDraft);
    setCurrentTab('room');
  };

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DFE1D8] dark:border-[#35443D]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">
              Real-Time Collaborative Peer & Mentor Studio
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBE9DF] text-[#172D29] dark:bg-[#24362F] dark:text-[#C6D58A] border border-[#DFE1D8] dark:border-[#35443D]">
              Live Co-Pilot
            </span>
          </div>
          <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-1">
            Pair with peers or mentors to refine STAR responses, annotate architecture diagrams, and practice collaborative rubric grading.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyInvite}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#1B2B26] text-[#172D29] dark:text-[#F4F0E7] hover:bg-[#F4F0E7] dark:hover:bg-[#24362F] transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-[#C6D58A]" /> : <Copy className="w-3.5 h-3.5 text-[#C47759]" />}
            <span>{copiedLink ? 'Invite Copied!' : 'Copy Peer Invite Link'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Collaborative Shared Answer Workspace */}
        <div className="lg:col-span-7 bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-6 shadow-xs space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-[#DFE1D8] dark:border-[#35443D]">
            <div className="flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-[#C47759]" />
              <h3 className="font-bold text-sm text-[#172D29] dark:text-[#F4F0E7] font-display">
                Collaborative Answer Drafting Canvas
              </h3>
            </div>
            
            {/* Active peer badges */}
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1.5 text-[11px] text-[#172D29] dark:text-[#C6D58A] font-medium bg-[#C6D58A]/20 px-2.5 py-1 rounded-full border border-[#C6D58A]/40">
                <span className="w-2 h-2 rounded-full bg-[#C6D58A] animate-ping"></span>
                David Vance (Staff Mentor) Active
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#727A73] dark:text-[#B6C0B8] flex items-center justify-between">
              <span>Shared Response Text (STAR Structured):</span>
              <span className="text-[11px] font-mono">{collabDraft.split(/\s+/).length} words</span>
            </label>
            <textarea
              value={collabDraft}
              onChange={(e) => setCollabDraft(e.target.value)}
              rows={12}
              className="w-full p-4 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#111D1A]/60 text-xs sm:text-sm text-[#172D29] dark:text-[#F4F0E7] focus:outline-hidden focus:ring-1 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] leading-relaxed font-normal resize-none"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#727A73] dark:text-[#B6C0B8]">
              Changes sync real-time with your active peer reviewer
            </div>

            <button
              onClick={handlePushToInterview}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#172D29] hover:bg-[#233f3a] text-[#F4F0E7] dark:bg-[#C6D58A] dark:hover:bg-[#d6e39f] dark:text-[#172D29] font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Push Answer to Live Interview Room</span>
            </button>
          </div>

        </div>

        {/* Right: Real-time Mentor Comments & Rubric Annotations */}
        <div className="lg:col-span-5 bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-6 shadow-xs space-y-5 flex flex-col justify-between">
          
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DFE1D8] dark:border-[#35443D]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#C47759]" />
                <h4 className="font-bold text-sm text-[#172D29] dark:text-[#F4F0E7] font-display">
                  Live Peer Review Notes ({peerComments.length})
                </h4>
              </div>
              <span className="text-[10px] text-[#727A73] dark:text-[#B6C0B8]">Real-time sync</span>
            </div>

            {/* Comments Stream */}
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {peerComments.map((comment) => {
                const badge = comment.type === 'praise'
                  ? 'border-[#C6D58A]/40 bg-[#C6D58A]/15 text-[#172D29] dark:text-[#C6D58A]'
                  : comment.type === 'critique'
                  ? 'border-[#C47759]/30 bg-[#C47759]/10 text-[#C47759]'
                  : 'border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#24362F]/40 text-[#172D29] dark:text-[#F4F0E7]';

                return (
                  <div
                    key={comment.id}
                    className={`p-3.5 rounded-xl border ${badge} space-y-1.5`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-bold text-[#172D29] dark:text-[#F4F0E7]">
                          {comment.author}
                        </span>
                      </div>
                      <span className="text-[10px] opacity-75">{comment.timestamp}</span>
                    </div>
                    <p className="text-xs text-[#172D29] dark:text-[#F4F0E7] leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Comment submission form */}
          <form onSubmit={handlePostComment} className="pt-4 border-t border-[#DFE1D8] dark:border-[#35443D] space-y-3">
            <div className="flex gap-2">
              {[
                { type: 'suggestion', label: '💡 Suggestion' },
                { type: 'praise', label: '👍 Praise' },
                { type: 'critique', label: '⚠ Critique' }
              ].map((btn) => (
                <button
                  key={btn.type}
                  type="button"
                  onClick={() => setCommentType(btn.type as any)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                    commentType === btn.type
                      ? 'border-[#172D29] bg-[#EBE9DF] text-[#172D29] dark:border-[#C6D58A] dark:bg-[#24362F] dark:text-[#C6D58A] font-bold'
                      : 'border-[#DFE1D8] dark:border-[#35443D] text-[#727A73] dark:text-[#B6C0B8]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add peer critique or rubric notes..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-white dark:bg-[#111D1A] text-xs text-[#172D29] dark:text-[#F4F0E7] focus:ring-1 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] focus:outline-hidden"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="p-2.5 rounded-xl bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] hover:bg-[#233f3a] disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

        </div>

      </div>

    </div>
  );
};
