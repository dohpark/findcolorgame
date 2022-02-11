const mix = (a: number, b: number, v: number) => {
  return (1 - v) * a + v * b;
};

const HSVtoRGB = (H: number, S: number, V: number) => {
  const V2 = V * (1 - S);
  const r =
    (H >= 0 && H <= 60) || (H >= 300 && H <= 360)
      ? V
      : H >= 120 && H <= 240
      ? V2
      : H >= 60 && H <= 120
      ? mix(V, V2, (H - 60) / 60)
      : H >= 240 && H <= 300
      ? mix(V2, V, (H - 240) / 60)
      : 0;
  const g =
    H >= 60 && H <= 180
      ? V
      : H >= 240 && H <= 360
      ? V2
      : H >= 0 && H <= 60
      ? mix(V2, V, H / 60)
      : H >= 180 && H <= 240
      ? mix(V, V2, (H - 180) / 60)
      : 0;
  const b =
    H >= 0 && H <= 120
      ? V2
      : H >= 180 && H <= 300
      ? V
      : H >= 120 && H <= 180
      ? mix(V2, V, (H - 120) / 60)
      : H >= 300 && H <= 360
      ? mix(V, V2, (H - 300) / 60)
      : 0;

  return {
    R: Math.round(r * 255),
    G: Math.round(g * 255),
    B: Math.round(b * 255),
  };
};

const randomHSVGenerator = () => {
  const H = Math.floor(Math.random() * 360);
  const S = (Math.floor(Math.random() * 80) + 20) / 100;
  const V = (Math.floor(Math.random() * 30) + 70) / 100;
  return { H, S, V };
};

const twist = (RGB: number, stage: number) => {
  const rand = Math.round(Math.random());
  const createGap = (stage: number) => {
    const gap = 25 - Math.floor(stage / 3);
    return gap >= 10 ? gap : 10;
  };

  const twistRGB = rand ? RGB - createGap(stage) : RGB + createGap(stage);

  if (twistRGB < 0) return 1;
  else if (twistRGB > 255) return 254;
  else return twistRGB;
};

export const randomRGBGenerator = (stage: number) => {
  const { H, S, V } = randomHSVGenerator();
  const { R, G, B } = HSVtoRGB(H, S, V);
  return {
    original: `rgb(${R}, ${G}, ${B})`,
    twist: `rgb(${twist(R, stage)}, ${twist(G, stage)}, ${twist(B, stage)})`,
  };
};
