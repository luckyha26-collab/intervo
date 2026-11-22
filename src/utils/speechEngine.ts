import { InterviewerPersona } from '../types';

export const INTERVIEWER_PERSONAS: InterviewerPersona[] = [
  {
    id: 'sarah',
    name: 'Sarah Chen',
    title: 'Staff Engineering Lead',
    company: 'Ex-Google / Stripe',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    voicePitch: 1.05,
    voiceRate: 1.0,
    tagline: 'Deep architectural focus, rigorous trade-offs analysis'
  },
  {
    id: 'alex',
    name: 'Alex Thorne',
    title: 'Principal Systems Architect',
    company: 'Distributed Labs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    voicePitch: 0.95,
    voiceRate: 0.98,
    tagline: 'High-concurrency systems, failure modes, scale'
  },
  {
    id: 'maya',
    name: 'Maya Patel',
    title: 'Senior Technical Bar Raiser',
    company: 'Fintech Unicorn',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    voicePitch: 1.1,
    voiceRate: 1.02,
    tagline: 'STAR behavioral mastery, impact quantification'
  }
];

export interface VoiceCommandMatch {
  action: 'submit' | 'next' | 'repeat' | 'hint' | 'theme' | 'timer' | 'clear' | 'unknown';
  rawPhrase: string;
}

// Check if browser supports speech recognition
export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}

// Check if browser supports speech synthesis
export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

// Speak text using Web Speech Synthesis
export function speakText(text: string, personaId: string = 'sarah', onEnd?: () => void): () => void {
  if (!isSpeechSynthesisSupported()) {
    onEnd?.();
    return () => {};
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const persona = INTERVIEWER_PERSONAS.find(p => p.id === personaId) || INTERVIEWER_PERSONAS[0];

  utterance.pitch = persona.voicePitch;
  utterance.rate = persona.voiceRate;

  // Attempt to select an English natural voice
  const voices = window.speechSynthesis.getVoices();
  const naturalVoice = voices.find(v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Victoria')) && v.lang.startsWith('en'))
    || voices.find(v => v.lang.startsWith('en'));

  if (naturalVoice) {
    utterance.voice = naturalVoice;
  }

  utterance.onend = () => {
    onEnd?.();
  };

  utterance.onerror = (e) => {
    console.warn('Speech synthesis ended with code/error:', e);
    onEnd?.();
  };

  window.speechSynthesis.speak(utterance);

  return () => {
    window.speechSynthesis.cancel();
  };
}

// Parse voice command phrases
export function parseVoiceCommand(transcript: string): VoiceCommandMatch | null {
  const clean = transcript.toLowerCase().trim();

  if (clean.includes('submit answer') || clean.includes('submit my answer') || clean.includes('finish answer')) {
    return { action: 'submit', rawPhrase: clean };
  }
  if (clean.includes('next question') || clean.includes('skip question') || clean.includes('move next')) {
    return { action: 'next', rawPhrase: clean };
  }
  if (clean.includes('repeat question') || clean.includes('read question again') || clean.includes('say that again')) {
    return { action: 'repeat', rawPhrase: clean };
  }
  if (clean.includes('give hint') || clean.includes('show hint') || clean.includes('need a hint') || clean.includes('help me')) {
    return { action: 'hint', rawPhrase: clean };
  }
  if (clean.includes('toggle dark mode') || clean.includes('toggle theme') || clean.includes('dark mode') || clean.includes('light mode')) {
    return { action: 'theme', rawPhrase: clean };
  }
  if (clean.includes('pause timer') || clean.includes('stop timer') || clean.includes('resume timer')) {
    return { action: 'timer', rawPhrase: clean };
  }
  if (clean.includes('clear answer') || clean.includes('reset answer') || clean.includes('delete answer')) {
    return { action: 'clear', rawPhrase: clean };
  }

  return null;
}
