"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type TapSpark = {
  id: number;
  x: number;
  y: number;
};

const mobileSparkOffsets = [
  { x: 8, y: -7, delay: 0.02 },
  { x: -9, y: 5, delay: 0.05 },
  { x: 3, y: 9, delay: 0.08 },
] as const;

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return mounted;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparkIdRef = useRef(0);
  const lastMobileTapRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const [tapSparks, setTapSparks] = useState<TapSpark[]>([]);

  useEffect(() => {
    if (!mounted || reduce) return;

    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const canvas = canvasElement;
    const canvasContext = canvas.getContext("2d", { alpha: true });
    if (!canvasContext) return;
    const ctx: CanvasRenderingContext2D = canvasContext;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      hue: number;
      drift: number;
    };

    type Pulse = {
      x: number;
      y: number;
      age: number;
      strength: number;
    };

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let isMobileView = false;
    const particles: Particle[] = [];
    const pulses: Pulse[] = [];
    const pointer = {
      x: globalThis.innerWidth * 0.5,
      y: globalThis.innerHeight * 0.32,
      active: false,
    };

    function createParticle(): Particle {
      const warm = Math.random() > 0.54;
      const speed = isMobileView ? 0.22 : 0.28;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: isMobileView ? 0.56 + Math.random() * 2.1 : 0.65 + Math.random() * 2.9,
        alpha: isMobileView ? 0.26 + Math.random() * 0.5 : 0.28 + Math.random() * 0.72,
        hue: warm ? 28 + Math.random() * 26 : 190 + Math.random() * 66,
        drift: isMobileView ? 0.34 + Math.random() * 0.72 : 0.25 + Math.random() * 0.85,
      };
    }

    function seedParticles() {
      particles.length = 0;
      const minimumCount = isMobileView ? 68 : 120;
      const maximumCount = isMobileView ? 124 : 260;
      const density = isMobileView ? 9000 : 8200;
      const count = Math.min(maximumCount, Math.max(minimumCount, Math.floor((width * height) / density)));
      for (let index = 0; index < count; index += 1) {
        particles.push(createParticle());
      }
    }

    function resize() {
      width = globalThis.innerWidth;
      height = globalThis.innerHeight;
      pixelRatio = Math.min(globalThis.devicePixelRatio || 1, 2);
      isMobileView = width < 640 || globalThis.matchMedia("(pointer: coarse)").matches;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      seedParticles();
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse" || isMobileView) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }

    function onPointerDown(event: PointerEvent) {
      if (event.pointerType !== "mouse" || isMobileView) return;

      pulses.push({
        x: event.clientX,
        y: event.clientY,
        age: 0,
        strength: 1,
      });

      const burstCount = 18;
      for (let index = 0; index < burstCount; index += 1) {
        const angle = (Math.PI * 2 * index) / burstCount;
        particles.push({
          x: event.clientX + Math.cos(angle) * 6,
          y: event.clientY + Math.sin(angle) * 6,
          vx: Math.cos(angle) * (0.8 + Math.random() * 1.2),
          vy: Math.sin(angle) * (0.8 + Math.random() * 1.2),
          size: 1.1 + Math.random() * 2.2,
          alpha: 0.72,
          hue: index % 3 === 0 ? 198 : index % 3 === 1 ? 38 : 286,
          drift: 1.2,
        });
      }
    }

    function drawStarFlare(x: number, y: number, size: number, alpha: number, hue: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = `hsla(${hue}, 95%, 78%, ${alpha})`;
      ctx.lineWidth = 0.55;
      ctx.beginPath();
      ctx.moveTo(-size * 2.6, 0);
      ctx.lineTo(size * 2.6, 0);
      ctx.moveTo(0, -size * 2.6);
      ctx.lineTo(0, size * 2.6);
      ctx.stroke();
      ctx.restore();
    }

    function render() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      const time = performance.now() * 0.001;
      const centerPullX = width * 0.5 + Math.cos(time * 0.16) * 110;
      const centerPullY = height * 0.42 + Math.sin(time * 0.12) * 72;

      for (const particle of particles) {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distanceSquared = dx * dx + dy * dy;
        const pointerForce = Math.min(0.06, 680 / Math.max(distanceSquared, 16000));
        const centerDx = centerPullX - particle.x;
        const centerDy = centerPullY - particle.y;
        const centerDistance = Math.max(Math.hypot(centerDx, centerDy), 1);
        const orbitForce = isMobileView ? 0.0024 : 0.003;

        particle.vx += dx * pointerForce * particle.drift * 0.0012;
        particle.vy += dy * pointerForce * particle.drift * 0.0012;
        particle.vx += (-centerDy / centerDistance) * orbitForce * particle.drift;
        particle.vy += (centerDx / centerDistance) * orbitForce * particle.drift;

        if (isMobileView) {
          particle.vx += Math.cos(time * 0.42 + particle.y * 0.01) * 0.0008 * particle.drift;
          particle.vy += Math.sin(time * 0.38 + particle.x * 0.01) * 0.0007 * particle.drift - 0.0002 * particle.drift;
        }

        for (const pulse of pulses) {
          const pulseDx = particle.x - pulse.x;
          const pulseDy = particle.y - pulse.y;
          const pulseDistance = Math.max(Math.hypot(pulseDx, pulseDy), 1);
          const wave = Math.max(0, 1 - Math.abs(pulseDistance - pulse.age * 16) / 150);
          particle.vx += (pulseDx / pulseDistance) * wave * 0.42 * pulse.strength;
          particle.vy += (pulseDy / pulseDistance) * wave * 0.42 * pulse.strength;
        }

        particle.vx *= 0.986;
        particle.vy *= 0.986;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        const shimmer = 0.72 + Math.sin(time * (1.2 + particle.drift) + particle.x * 0.01) * 0.28;
        const glow = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 8);
        glow.addColorStop(0, `hsla(${particle.hue}, 95%, 84%, ${particle.alpha * shimmer})`);
        glow.addColorStop(0.34, `hsla(${particle.hue}, 90%, 68%, ${particle.alpha * 0.18})`);
        glow.addColorStop(1, `hsla(${particle.hue}, 90%, 50%, 0)`);

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${particle.hue}, 95%, 92%, ${particle.alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, Math.max(0.65, particle.size * 0.45), 0, Math.PI * 2);
        ctx.fill();

        if (particle.size > 2.8) {
          drawStarFlare(particle.x, particle.y, particle.size, particle.alpha * 0.55, particle.hue);
        }
      }

      for (let index = pulses.length - 1; index >= 0; index -= 1) {
        const pulse = pulses[index];
        pulse.age += 1;
        const radius = pulse.age * 16;
        const alpha = Math.max(0, 0.5 - pulse.age / 74);
        ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        if (pulse.age > 72) {
          pulses.splice(index, 1);
        }
      }

      if (particles.length > 310) {
        particles.splice(0, particles.length - 310);
      }

      animationFrame = requestAnimationFrame(render);
    }

    resize();
    render();

    globalThis.addEventListener("resize", resize);
    globalThis.addEventListener("pointermove", onPointerMove, { passive: true });
    globalThis.addEventListener("pointerdown", onPointerDown, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrame);
      globalThis.removeEventListener("resize", resize);
      globalThis.removeEventListener("pointermove", onPointerMove);
      globalThis.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mounted, reduce]);

  useEffect(() => {
    if (!mounted || reduce) return;

    function onMobilePointerDown(event: PointerEvent) {
      const isMobileTap = event.pointerType !== "mouse" || globalThis.matchMedia("(pointer: coarse)").matches;
      if (!isMobileTap || !event.isPrimary) return;

      const target = event.target;
      if (
        target instanceof Element &&
        target.closest("a, button, input, textarea, select, summary, [role='button']")
      ) {
        lastMobileTapRef.current = null;
        return;
      }

      const now = performance.now();
      const lastTap = lastMobileTapRef.current;
      lastMobileTapRef.current = {
        x: event.clientX,
        y: event.clientY,
        time: now,
      };

      if (!lastTap) return;

      const elapsed = now - lastTap.time;
      const distance = Math.hypot(event.clientX - lastTap.x, event.clientY - lastTap.y);
      if (elapsed > 380 || distance > 44) return;

      lastMobileTapRef.current = null;
      const id = sparkIdRef.current;
      sparkIdRef.current += 1;

      setTapSparks([
        {
          id,
          x: event.clientX,
          y: event.clientY,
        },
      ]);
    }

    globalThis.addEventListener("pointerdown", onMobilePointerDown, { passive: true });

    return () => {
      globalThis.removeEventListener("pointerdown", onMobilePointerDown);
    };
  }, [mounted, reduce]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      <div className="galaxy-generated-background" />
      <div className="galaxy-nebula" />
      <div className="galaxy-cursor-glow" />
      <div className="galaxy-orbit galaxy-orbit-one" />
      <div className="galaxy-orbit galaxy-orbit-two" />
      <canvas ref={canvasRef} className="galaxy-play-canvas" />
      <AnimatePresence>
        {tapSparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="mobile-star-spark"
            style={{ left: spark.x, top: spark.y }}
            initial={{ opacity: 0.42, scale: 0.26 }}
            animate={{ opacity: 0, scale: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              setTapSparks((current) => current.filter((item) => item.id !== spark.id));
            }}
          >
            <span className="mobile-star-spark-ring" />
            {mobileSparkOffsets.map((offset) => (
              <motion.span
                key={`${spark.id}-${offset.x}-${offset.y}`}
                className="mobile-star-spark-dot"
                initial={{ opacity: 0.48, x: 0, y: 0, scale: 0.55 }}
                animate={{ opacity: 0, x: offset.x, y: offset.y, scale: 0.74 }}
                transition={{ duration: 0.2, delay: offset.delay, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
