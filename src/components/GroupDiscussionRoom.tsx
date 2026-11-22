import React, { useState, useEffect } from 'react';
import {
  Users,
  Mic,
  MicOff,
  Hand,
  PhoneOff,
  Share2,
  Copy,
  Check,
  MessageSquare,
  Award,
  Sparkles,
  ShieldCheck,
  Send,
  Volume2,
  Clock,
  ThumbsUp,
  UserPlus,
  PlayCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GroupDiscussionRoom: React.FC = () => {
  const {
    activeGDRoom,
    gdMessages,
    isGDCallActive,
    isUserMuted,
    hasUserRaisedHand,
    toggleGDMute,
    toggleGDRaiseHand,
    startGDCall,
    leaveGDCall,
    sendGDMessage,
    gdScorecard,
    concludeGDAndGenerateScorecard,
    setGdScorecard,
    currentUser
  } = useApp();

  const [copiedInvite, setCopiedInvite] = useState(false);
  const [chatDraft, setChatDraft] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [callTimer, setCallTimer] = useState(activeGDRoom.callDurationSec);

  // Call timer increment
  useEffect(() => {
    if (!isGDCallActive) return;
    const interval = setInterval(() => {
      setCallTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isGDCallActive]);

  const handleCopyLink = () => {
    const inviteUrl = `${window.location.origin}#gd-invite=${activeGDRoom.inviteCode}`;
    navigator.clipboard.writeText(inviteUrl);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatDraft.trim()) return;
    sendGDMessage(chatDraft.trim());
    setChatDraft('');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-fade-in">
      
      {/* Top Banner with Invite & Status */}
      <div className="bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6D58A]/20 text-[#172D29] dark:text-[#C6D58A] border border-[#C6D58A]/40 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#C6D58A] animate-ping"></span>
              Live Multi-Participant GD Call
            </span>
            <span className="text-xs text-[#727A73] dark:text-[#B6C0B8] font-mono">Code: {activeGDRoom.inviteCode}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">
            {activeGDRoom.title}
          </h2>
          <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-0.5">
            Topic: {activeGDRoom.topicDescription}
          </p>
        </div>

        {/* Invite & Call Duration */}
        <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F0E7] dark:bg-[#24362F] text-xs font-mono font-bold text-[#172D29] dark:text-[#F4F0E7] border border-[#DFE1D8] dark:border-[#35443D]">
            <Clock className="w-3.5 h-3.5 text-[#C47759]" />
            <span>{formatTime(callTimer)}</span>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7] dark:bg-[#24362F] text-[#172D29] dark:text-[#F4F0E7] text-xs font-bold hover:bg-[#EBE9DF] transition-colors"
          >
            {copiedInvite ? <Check className="w-3.5 h-3.5 text-[#C6D58A]" /> : <Copy className="w-3.5 h-3.5 text-[#C47759]" />}
            <span>{copiedInvite ? 'Invite Copied!' : 'Copy Call Invite Link'}</span>
          </button>

          <button
            onClick={() => setShowInviteModal(true)}
            className="p-2 rounded-xl bg-[#F4F0E7] dark:bg-[#24362F] text-[#172D29] dark:text-[#F4F0E7] border border-[#DFE1D8] dark:border-[#35443D] hover:bg-[#EBE9DF] transition-colors"
            title="Invite Peers into Call"
          >
            <UserPlus className="w-4 h-4 text-[#C47759]" />
          </button>
        </div>
      </div>

      {!gdScorecard ? (
        /* Active GD Call Arena Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Video & Voice Speaker Tiles */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Current User Video Tile */}
              <div className="relative bg-[#172D29] rounded-2xl overflow-hidden border border-[#233F3A] shadow-xs p-5 flex flex-col justify-between min-h-[220px]">
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C6D58A] text-[#172D29]">
                    You (Candidate)
                  </span>
                  {hasUserRaisedHand && (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C47759] text-white animate-bounce">
                      <Hand className="w-3 h-3" /> Hand Raised
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-center justify-center py-4 z-10">
                  <div className={`relative p-1 rounded-full border-2 transition-all ${!isUserMuted ? 'border-[#C6D58A]' : 'border-[#35534B]'}`}>
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {!isUserMuted && (
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#C6D58A] rounded-full border-2 border-[#172D29] flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-[#172D29] rounded-full animate-ping"></span>
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-[#F4F0E7] mt-2 font-display">
                    {currentUser.name}
                  </h4>
                  <p className="text-[11px] text-[#DFE1D8]/70">
                    {currentUser.targetRole}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#DFE1D8]/80 z-10 pt-2 border-t border-[#233F3A]">
                  <span className="flex items-center gap-1">
                    {isUserMuted ? <MicOff className="w-3.5 h-3.5 text-[#C47759]" /> : <Mic className="w-3.5 h-3.5 text-[#C6D58A]" />}
                    <span>{isUserMuted ? 'Microphone Muted' : 'Speaking live'}</span>
                  </span>
                  <span className="font-mono text-[#DFE1D8]/60">Time: 42s</span>
                </div>
              </div>

              {/* Other Call Participants */}
              {activeGDRoom.participants.map((p) => (
                <div
                  key={p.id}
                  className={`relative bg-[#1B2B26] rounded-2xl overflow-hidden border p-5 flex flex-col justify-between min-h-[220px] transition-all ${
                    p.isSpeaking ? 'border-[#C6D58A]' : 'border-[#35443D]'
                  }`}
                >
                  <div className="flex items-center justify-between z-10">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.isAI ? 'bg-[#233F3A] text-[#C6D58A] border border-[#35534B]' : 'bg-[#24362F] text-[#DFE1D8]'}`}>
                      {p.isAI ? 'AI Bar Raiser Moderator' : 'Peer Candidate'}
                    </span>
                    {p.hasRaisedHand && (
                      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C47759] text-white">
                        <Hand className="w-3 h-3" /> Hand Raised
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col items-center justify-center py-4 z-10">
                    <div className={`relative p-1 rounded-full border-2 transition-all ${p.isSpeaking ? 'border-[#C6D58A]' : 'border-[#35443D]'}`}>
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {p.isSpeaking && (
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#C6D58A] rounded-full border-2 border-[#1B2B26] flex items-center justify-center">
                          <span className="w-1.5 h-1.5 bg-[#172D29] rounded-full animate-ping"></span>
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-[#F4F0E7] mt-2 font-display">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-[#B6C0B8]">
                      {p.role}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#B6C0B8] z-10 pt-2 border-t border-[#35443D]">
                    <span className="flex items-center gap-1">
                      {p.isMuted ? <MicOff className="w-3.5 h-3.5 text-[#727A73]" /> : <Mic className="w-3.5 h-3.5 text-[#C6D58A]" />}
                      <span>{p.isSpeaking ? 'Speaking...' : p.isMuted ? 'Muted' : 'Listening'}</span>
                    </span>
                    <span className="font-mono text-[#727A73]">Time: {p.speakingTimeSec}s</span>
                  </div>
                </div>
              ))}

            </div>

            {/* Bottom Call Controls Dock */}
            <div className="p-4 bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] shadow-xs flex flex-wrap items-center justify-between gap-3">
              
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleGDMute}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isUserMuted
                      ? 'bg-[#C47759]/10 text-[#C47759] border border-[#C47759]/30'
                      : 'bg-[#C6D58A]/20 text-[#172D29] dark:text-[#C6D58A] border border-[#C6D58A]/40'
                  }`}
                >
                  {isUserMuted ? <MicOff className="w-4 h-4 text-[#C47759]" /> : <Mic className="w-4 h-4 text-[#C6D58A]" />}
                  <span>{isUserMuted ? 'Unmute Mic' : 'Mute Microphone'}</span>
                </button>

                <button
                  onClick={toggleGDRaiseHand}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    hasUserRaisedHand
                      ? 'bg-[#C47759] text-white border-[#C47759]'
                      : 'bg-[#F4F0E7] dark:bg-[#24362F] text-[#172D29] dark:text-[#F4F0E7] border-[#DFE1D8] dark:border-[#35443D]'
                  }`}
                >
                  <Hand className="w-4 h-4" />
                  <span>{hasUserRaisedHand ? 'Lower Hand' : 'Raise Hand'}</span>
                </button>
              </div>

              {/* End / Conclude GD Round */}
              <div className="flex items-center gap-2">
                <button
                  onClick={concludeGDAndGenerateScorecard}
                  className="px-5 py-2.5 rounded-xl bg-[#172D29] hover:bg-[#233f3a] text-[#F4F0E7] dark:bg-[#C6D58A] dark:hover:bg-[#d6e39f] dark:text-[#172D29] font-bold text-xs shadow-xs flex items-center gap-2 transition-all"
                >
                  <Award className="w-4 h-4" />
                  <span>Conclude Round & Get GD Scorecard</span>
                </button>

                <button
                  onClick={leaveGDCall}
                  className="p-2.5 rounded-xl bg-[#C47759] text-white hover:bg-[#b0674c] transition-colors"
                  title="Leave GD Call"
                >
                  <PhoneOff className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Right: Live Transcript & GD Speech Stream */}
          <div className="lg:col-span-4 bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-5 shadow-xs flex flex-col justify-between min-h-[480px]">
            
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DFE1D8] dark:border-[#35443D]">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#C47759]" />
                  <h3 className="font-bold text-sm text-[#172D29] dark:text-[#F4F0E7] font-display">
                    Live Discussion Transcript
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C6D58A]/20 text-[#172D29] dark:text-[#C6D58A] border border-[#C6D58A]/40">
                  Moderated
                </span>
              </div>

              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {gdMessages.map((msg) => {
                  const isMod = msg.type === 'moderator';
                  const isMe = msg.senderId === currentUser.id;

                  return (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-xl text-xs space-y-1 ${
                        isMod
                          ? 'bg-[#F4F0E7] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D]'
                          : isMe
                          ? 'bg-[#C6D58A]/15 border border-[#C6D58A]/35 text-[#172D29] dark:text-[#F4F0E7]'
                          : 'bg-[#F4F0E7]/60 dark:bg-[#111D1A]/50 border border-[#DFE1D8] dark:border-[#35443D]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <img
                            src={msg.avatar}
                            alt={msg.senderName}
                            className="w-4 h-4 rounded-full object-cover"
                          />
                          <span className="font-bold text-[#172D29] dark:text-[#F4F0E7]">
                            {msg.senderName}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#727A73] dark:text-[#B6C0B8]">{msg.timestamp}</span>
                      </div>
                      <p className="text-[#172D29] dark:text-[#DFE1D8] leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Discussion Input Form */}
            <form onSubmit={handleSendMessage} className="pt-3 border-t border-[#DFE1D8] dark:border-[#35443D] space-y-2">
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={chatDraft}
                  onChange={(e) => setChatDraft(e.target.value)}
                  placeholder="Speak your point or type argument..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#DFE1D8] dark:border-[#35443D] bg-[#F4F0E7]/60 dark:bg-[#111D1A]/60 text-xs text-[#172D29] dark:text-[#F4F0E7] focus:ring-1 focus:ring-[#172D29] dark:focus:ring-[#C6D58A] focus:outline-hidden"
                />
                <button
                  type="submit"
                  disabled={!chatDraft.trim()}
                  className="px-4 py-2.5 rounded-xl bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] font-bold text-xs hover:bg-[#233f3a] disabled:opacity-50 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

          </div>

        </div>
      ) : (
        /* Post-GD Performance Scorecard */
        <div className="bg-white dark:bg-[#1B2B26] rounded-2xl border border-[#DFE1D8] dark:border-[#35443D] p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DFE1D8] dark:border-[#35443D]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6D58A]/20 text-[#172D29] dark:text-[#C6D58A] border border-[#C6D58A]/40 text-xs font-bold mb-2">
                <Award className="w-3.5 h-3.5" />
                <span>AI Bar Raiser GD Evaluation Generated</span>
              </div>
              <h3 className="text-2xl font-bold text-[#172D29] dark:text-[#F4F0E7] font-display">
                Group Discussion Assessment for {currentUser.name}
              </h3>
              <p className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-0.5">
                Topic: {activeGDRoom.title}
              </p>
            </div>

            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] font-mono font-bold text-3xl shadow-xs shrink-0">
              {gdScorecard.totalScore}
              <span className="text-xs font-normal opacity-70">/10</span>
            </div>
          </div>

          {/* 4 Core Competency Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Leadership & Initiative', score: gdScorecard.leadershipScore },
              { label: 'Articulation & Clarity', score: gdScorecard.clarityScore },
              { label: 'Listening & Rebuttal Etiquette', score: gdScorecard.listeningEtiquette },
              { label: 'Technical Knowledge Depth', score: gdScorecard.knowledgeScore }
            ].map((c, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#F4F0E7]/60 dark:bg-[#24362F]/60 border border-[#DFE1D8] dark:border-[#35443D] text-center">
                <div className="text-xl font-bold font-mono text-[#172D29] dark:text-[#F4F0E7]">
                  {c.score}/10
                </div>
                <div className="text-xs text-[#727A73] dark:text-[#B6C0B8] mt-1">
                  {c.label}
                </div>
              </div>
            ))}
          </div>

          {/* Feedback narrative */}
          <div className="p-4 rounded-xl bg-[#F4F0E7] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D] text-xs sm:text-sm text-[#172D29] dark:text-[#F4F0E7] leading-relaxed italic">
            "{gdScorecard.feedback}"
          </div>

          {/* Key points & improvements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#C6D58A]/15 border border-[#C6D58A]/40 space-y-2">
              <span className="text-xs font-bold text-[#172D29] dark:text-[#C6D58A] flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#C6D58A]" />
                Strong Contributions Made:
              </span>
              <ul className="space-y-1.5 text-xs text-[#172D29] dark:text-[#F4F0E7]">
                {gdScorecard.keyPointsSpoken.map((pt, idx) => (
                  <li key={idx}>• {pt}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#C47759]/10 border border-[#C47759]/30 space-y-2">
              <span className="text-xs font-bold text-[#C47759] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C47759]" />
                Moderator Recommendations:
              </span>
              <ul className="space-y-1.5 text-xs text-[#172D29] dark:text-[#F4F0E7]">
                {gdScorecard.improvements.map((imp, idx) => (
                  <li key={idx}>• {imp}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              onClick={() => startGDCall()}
              className="px-5 py-2.5 rounded-xl bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] font-bold text-xs hover:bg-[#233f3a] shadow-xs"
            >
              Start Another GD Call
            </button>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172D29]/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#1B2B26] border border-[#DFE1D8] dark:border-[#35443D] rounded-2xl w-full max-w-md p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#DFE1D8] dark:border-[#35443D]">
              <h3 className="font-bold text-base text-[#172D29] dark:text-[#F4F0E7] font-display">
                Invite Friends to Group Discussion
              </h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-[#727A73] hover:text-[#172D29] dark:hover:text-[#F4F0E7] text-sm"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-[#727A73] dark:text-[#B6C0B8]">
              Share this invite code or link with your study group or peer candidates to join the round table live.
            </p>
            <div className="p-3 rounded-xl bg-[#F4F0E7] dark:bg-[#24362F] border border-[#DFE1D8] dark:border-[#35443D] font-mono text-xs text-[#172D29] dark:text-[#F4F0E7] select-all">
              Invite Code: <strong>{activeGDRoom.inviteCode}</strong>
            </div>
            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 rounded-xl bg-[#172D29] text-[#F4F0E7] dark:bg-[#C6D58A] dark:text-[#172D29] font-bold text-xs hover:bg-[#233f3a] flex items-center justify-center gap-2"
            >
              {copiedInvite ? <Check className="w-4 h-4 text-[#C6D58A]" /> : <Copy className="w-4 h-4" />}
              <span>{copiedInvite ? 'Copied to Clipboard!' : 'Copy Direct Call Invite Link'}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

