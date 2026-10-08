// The ground and the sea of an ALMA planet: each point wears the color its piece was given (how high it is, how steep),
// lit by the one sun, and fades into the air with distance. The sea shines a little toward the sun.
Shader "ALMA/Planeta"
{
    Properties
    {
        _Aire ("Color del aire", Vector) = (0, 0, 0, 1)
        _Lejos ("Distancia a la que el aire lo cubre", Float) = 4000
        _Ambiente ("Luz de ambiente", Range(0, 1)) = 0.16
        _Agua ("Es mar", Float) = 0
        _Grano ("Lleva el grano del suelo", Float) = 0
        _Mar ("Radio del mar", Float) = 1000
        _Roca ("Color de la roca", Vector) = (0.3, 0.3, 0.3, 1)
        _Arena ("Color de la arena", Vector) = (0.7, 0.7, 0.6, 1)
        [Enum(UnityEngine.Rendering.CullMode)] _Caras ("Caras que se dibujan", Float) = 2
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "Queue" = "Geometry" }
        HLSLINCLUDE
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
        CBUFFER_START(UnityPerMaterial)
        float4 _Aire; float _Lejos; float _Ambiente; float _Agua; float _Caras; float _Grano; float _Mar; float4 _Roca; float4 _Arena;
        CBUFFER_END
        // A noise of the place itself (the planet stands at the middle of the world): its value and which way it rises.
        float Suerte(float3 p) { p = frac(p * 0.3183099 + 0.1); p *= 17.0; return frac(p.x * p.y * p.z * (p.x + p.y + p.z)); }
        float4 Ruido(float3 x)
        {
            float3 i = floor(x), f = frac(x), u = f * f * (3 - 2 * f), du = 6 * f * (1 - f);
            float a = Suerte(i), b = Suerte(i + float3(1, 0, 0)), c = Suerte(i + float3(0, 1, 0)), d = Suerte(i + float3(1, 1, 0)), e = Suerte(i + float3(0, 0, 1)), g = Suerte(i + float3(1, 0, 1)), h = Suerte(i + float3(0, 1, 1)), k = Suerte(i + float3(1, 1, 1));
            float k1 = b - a, k2 = c - a, k3 = e - a, k4 = a - b - c + d, k5 = a - c - e + h, k6 = a - b - e + g, k7 = -a + b + c - d + e - g - h + k;
            return float4(a + k1 * u.x + k2 * u.y + k3 * u.z + k4 * u.x * u.y + k5 * u.y * u.z + k6 * u.z * u.x + k7 * u.x * u.y * u.z,
                du * float3(k1 + k4 * u.y + k6 * u.z + k7 * u.y * u.z, k2 + k5 * u.z + k4 * u.x + k7 * u.z * u.x, k3 + k6 * u.x + k5 * u.y + k7 * u.x * u.y));
        }
        ENDHLSL
        Pass
        {
            Name "Planeta"
            Tags { "LightMode" = "UniversalForward" }
            Cull [_Caras]
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            struct Attributes { float4 positionOS : POSITION; float3 normalOS : NORMAL; float4 color : COLOR; };
            struct Varyings { float4 positionCS : SV_POSITION; float3 normalWS : TEXCOORD0; float3 positionWS : TEXCOORD1; float4 color : COLOR; };
            Varyings vert(Attributes i)
            {
                Varyings o; o.positionWS = TransformObjectToWorld(i.positionOS.xyz); o.positionCS = TransformWorldToHClip(o.positionWS); o.normalWS = TransformObjectToWorldNormal(i.normalOS); o.color = i.color; return o;
            }
            half4 frag(Varyings i) : SV_Target
            {
                float3 N = normalize(i.normalWS), P = i.positionWS, base = i.color.rgb; float tramo = distance(_WorldSpaceCameraPos, P);
                if (_Grano > 0.5)
                {
                    // The grain: coarse from afar, finer as one comes near (each layer fades out before it would shimmer).
                    // Steep ground is bare rock; by the sea there is sand; and the light catches its small bumps.
                    float cerca = saturate(1 - tramo / 500), muyCerca = saturate(1 - tramo / 70); float3 arriba = normalize(P);
                    float4 a = Ruido(P * 0.045), b = Ruido(P * 0.4), c2 = Ruido(P * 2.7), d = Ruido(P * 13);
                    float llano = dot(N, arriba), roca = smoothstep(0.86, 0.62, llano + (b.x - 0.5) * 0.16 * cerca + (a.x - 0.5) * 0.1) * (1 - 0.65 * saturate((tramo - 600) / 2500));      // (from far, a coarse piece looks steeper than the land is: less rock is trusted there)
                    float sobreElMar = length(P) - _Mar, arena = smoothstep(7, 0.6, sobreElMar + (b.x - 0.5) * 5) * (1 - roca);
                    base = lerp(base, _Roca.rgb * (0.75 + 0.5 * b.x), roca * 0.85); base = lerp(base, _Arena.rgb, arena * 0.8);
                    base *= 0.84 + 0.32 * lerp(a.x, 0.5 * b.x + 0.3 * c2.x + 0.2 * d.x, cerca);
                    float3 bulto = a.yzw * 0.045 * 2.5 + b.yzw * 0.4 * 0.5 * cerca + c2.yzw * 2.7 * 0.06 * cerca + d.yzw * 13 * 0.012 * muyCerca; bulto -= N * dot(bulto, N);
                    N = normalize(N - bulto * (0.35 + 0.5 * roca));
                }
                float3 V = normalize(_WorldSpaceCameraPos - P);
                if (_Agua > 0.5) { float4 ola = Ruido(P * 0.25 + _Time.y * 0.12), rizo = Ruido(P * 1.7 - _Time.y * 0.2); float3 mueve = (ola.yzw * 0.06 + rizo.yzw * 0.03 * saturate(1 - tramo / 300)); mueve -= N * dot(mueve, N); N = normalize(N - mueve); }
                Light L = GetMainLight(); float luz = saturate(dot(N, L.direction));
                float3 c = base * (_Ambiente + (1 - _Ambiente) * luz * L.color);
                if (_Agua > 0.5) { float brillo = pow(saturate(dot(N, normalize(L.direction + V))), 90); c += brillo * 0.6 * L.color; c = lerp(c, _Aire.rgb * 0.9 + c * 0.3, pow(1 - saturate(dot(N, V)), 4) * 0.5); }
                float lejos = 1 - exp(-tramo / _Lejos);
                return half4(lerp(c, _Aire.rgb, lejos * _Aire.a), 1);
            }
            ENDHLSL
        }
        Pass
        {
            Name "DepthOnly"
            Tags { "LightMode" = "DepthOnly" }
            ZWrite On ColorMask R
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            float4 vert(float4 positionOS : POSITION) : SV_POSITION { return TransformObjectToHClip(positionOS.xyz); }
            half4 frag() : SV_Target { return 0; }
            ENDHLSL
        }
    }
}
