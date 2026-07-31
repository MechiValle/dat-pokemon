import { SpriteSamplePoint } from "@/types/pokemon";

const FALLBACK_SAMPLES: SpriteSamplePoint[] = [{ xPct: 50, yPct: 50 }];
const MAX_SAMPLES = 40;
const PIXEL_STRIDE = 4;
const ALPHA_THRESHOLD = 40;

export function computeSpriteSamples(url: string): Promise<SpriteSamplePoint[]> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(FALLBACK_SAMPLES);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const opaquePoints: SpriteSamplePoint[] = [];
        for (let y = 0; y < canvas.height; y += PIXEL_STRIDE) {
          for (let x = 0; x < canvas.width; x += PIXEL_STRIDE) {
            const alpha = data[(y * canvas.width + x) * 4 + 3];
            if (alpha > ALPHA_THRESHOLD) {
              opaquePoints.push({
                xPct: (x / canvas.width) * 100,
                yPct: (y / canvas.height) * 100,
              });
            }
          }
        }

        if (opaquePoints.length === 0) {
          resolve(FALLBACK_SAMPLES);
          return;
        }

        const step = Math.max(1, Math.floor(opaquePoints.length / MAX_SAMPLES));
        const sampled = opaquePoints.filter((_, i) => i % step === 0).slice(0, MAX_SAMPLES);
        resolve(sampled);
      } catch {
        resolve(FALLBACK_SAMPLES);
      }
    };

    img.onerror = () => resolve(FALLBACK_SAMPLES);
    img.src = url;
  });
}