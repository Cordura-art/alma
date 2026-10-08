// What the planet's shaders share: a noise of the place itself (the planet stands at the middle of the world), and
// where its clouds are, so that the ground can lie in their shadow.
#ifndef ALMA_PLANETA
#define ALMA_PLANETA
float Suerte(float3 p) { p = frac(p * 0.3183099 + 0.1); p *= 17.0; return frac(p.x * p.y * p.z * (p.x + p.y + p.z)); }
// Its value, and which way it rises.
float4 Ruido(float3 x)
{
    float3 i = floor(x), f = frac(x), u = f * f * (3 - 2 * f), du = 6 * f * (1 - f);
    float a = Suerte(i), b = Suerte(i + float3(1, 0, 0)), c = Suerte(i + float3(0, 1, 0)), d = Suerte(i + float3(1, 1, 0)), e = Suerte(i + float3(0, 0, 1)), g = Suerte(i + float3(1, 0, 1)), h = Suerte(i + float3(0, 1, 1)), k = Suerte(i + float3(1, 1, 1));
    float k1 = b - a, k2 = c - a, k3 = e - a, k4 = a - b - c + d, k5 = a - c - e + h, k6 = a - b - e + g, k7 = -a + b + c - d + e - g - h + k;
    return float4(a + k1 * u.x + k2 * u.y + k3 * u.z + k4 * u.x * u.y + k5 * u.y * u.z + k6 * u.z * u.x + k7 * u.x * u.y * u.z,
        du * float3(k1 + k4 * u.y + k6 * u.z + k7 * u.y * u.z, k2 + k5 * u.z + k4 * u.x + k7 * u.z * u.x, k3 + k6 * u.x + k5 * u.y + k7 * u.x * u.y));
}
// The stuff of the clouds over a point of their layer, drifting slowly: large masses, their lumps, and a frayed edge.
float NubeCruda(float3 p, float tiempo)
{
    float3 q = p + float3(tiempo * 2.0, 0, tiempo * 1.2);
    return Ruido(q * 0.0035).x * 0.5 + Ruido(q * 0.011).x * 0.28 + Ruido(q * 0.034).x * 0.14 + Ruido(q * 0.1 + tiempo * 0.05).x * 0.08;
}
// How much cloud there is there (0 to 1). `cuanta`: how cloudy the planet is.
float Nube(float3 p, float tiempo, float cuanta) { return smoothstep(0.62 - cuanta * 0.2, 0.74 - cuanta * 0.2, NubeCruda(p, tiempo)); }
#endif
