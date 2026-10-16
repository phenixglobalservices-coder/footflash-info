/**
 * Web Speech API text-to-speech utility for Foot Flash Info
 */

export class AudioNarrator {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;
  private static isSpeaking = false;
  private static listeners: Set<(speaking: boolean) => void> = new Set();

  public static subscribe(callback: (speaking: boolean) => void) {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private static notify(speaking: boolean) {
    this.isSpeaking = speaking;
    this.listeners.forEach((cb) => cb(speaking));
  }

  public static getSpeakingState(): boolean {
    return this.isSpeaking;
  }

  public static speak(text: string, onEnd?: () => void) {
    if (!this.synth) return;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Try to find a French voice
    const voices = this.synth.getVoices();
    const frVoice = voices.find((v) => v.lang.startsWith('fr') || v.lang.includes('FR'));
    if (frVoice) {
      utterance.voice = frVoice;
    }
    utterance.lang = 'fr-FR';
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.notify(true);
    };

    utterance.onend = () => {
      this.notify(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.notify(false);
    };

    this.synth.speak(utterance);
  }

  public static stop() {
    if (this.synth) {
      this.synth.cancel();
      this.notify(false);
    }
  }

  public static toggle(text: string) {
    if (this.isSpeaking) {
      this.stop();
    } else {
      this.speak(text);
    }
  }
}
