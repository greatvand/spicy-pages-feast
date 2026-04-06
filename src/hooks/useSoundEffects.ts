import { useCallback, useRef } from "react";

const createOscillator = (
  ctx: AudioContext,
  type: OscillatorType,
  freq: number,
  duration: number,
  gain: number
) => {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
};

export const useSoundEffects = () => {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const playSizzle = useCallback(() => {
    try {
      const ctx = getCtx();
      // White noise burst for sizzle
      const bufferSize = ctx.sampleRate * 0.3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 3000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start();
    } catch {}
  }, [getCtx]);

  const playCreak = useCallback(() => {
    try {
      const ctx = getCtx();
      // Low frequency wobble for door creak
      createOscillator(ctx, "sawtooth", 80, 0.4, 0.04);
      createOscillator(ctx, "sine", 120, 0.3, 0.03);
    } catch {}
  }, [getCtx]);

  const playClink = useCallback(() => {
    try {
      const ctx = getCtx();
      // High metallic ping for plate clink
      createOscillator(ctx, "sine", 2000, 0.15, 0.06);
      createOscillator(ctx, "sine", 3200, 0.1, 0.03);
    } catch {}
  }, [getCtx]);

  const playWelcome = useCallback(() => {
    try {
      const ctx = getCtx();
      // Ascending chime
      [400, 500, 600, 800].forEach((freq, i) => {
        setTimeout(() => createOscillator(ctx, "sine", freq, 0.3, 0.05), i * 100);
      });
    } catch {}
  }, [getCtx]);

  return { playSizzle, playCreak, playClink, playWelcome };
};
