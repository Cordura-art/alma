// The sky of an ALMA planet, in three layers that share one shader:
//   0 the stars    a ball around the eye, far behind everything
//   1 the air      a shell around the planet, seen from inside as the sky and from space as its halo: how much air a
//                  line of sight crosses says how much of it is seen; it warms where the sun is low, and the sun is in it
//   2 the clouds   three shells just above the highest ground, with the planet's own noise: the middle one is the
//                  widest, so a cloud has a body; each is lighter on the side the sun is on, and darker underneath
Shader "ALMA/Cielo"
{
    Properties
    {
        _Modo ("Capa: 0 estrellas, 1 aire, 2 nubes", Float) = 1
        _Aire ("Color del aire", Vector) = (0.4, 0.6, 1, 1)
        _Calido ("Color del sol bajo", Vector) = (1, 0.5, 0.3, 1)
        _Claro ("Color de lo mas claro", Vector) = (1, 1, 1, 1)
        _Radio ("Radio del suelo", Float) = 1000
        _Tope ("Radio del aire", Float) = 1300
        _Nubes ("Cuanta nube", Range(0, 1)) = 0.5
        _Capa ("Nubes: de la capa de abajo (0) a la de arriba (1)", Range(0, 1)) = 0.5
        [Enum(UnityEngine.Rendering.CullMode)] _Caras ("Caras que se dibujan", Float) = 1
    }
    SubShader
    {
        Tags { "RenderType" = "Transparent" "RenderPipeline" = "UniversalPipeline" "Queue" = "Transparent" }
        Pass
        {
            Name "Cielo"
            Tags { "LightMode" = "UniversalForward" }
            Cull [_Caras] ZWrite Off Blend SrcAlpha OneMinusSrcAlpha
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
            #include "Assets/ALMA/Planeta.hlsl"
            CBUFFER_START(UnityPerMaterial)
            float _Modo; float4 _Aire; float4 _Calido; float4 _Claro; float _Radio; float _Tope; float _Nubes; float _Caras; float _Capa;
            CBUFFER_END
            struct Varyings { float4 positionCS : SV_POSITION; float3 positionWS : TEXCOORD0; float3 enSuBola : TEXCOORD1; };
            Varyings vert(float4 positionOS : POSITION) { Varyings o; o.positionWS = TransformObjectToWorld(positionOS.xyz); o.positionCS = TransformWorldToHClip(o.positionWS); o.enSuBola = positionOS.xyz; return o; }
            // Where a line of sight enters and leaves a ball around the middle of the world (x > y: it misses it).
            float2 Cruza(float3 o, float3 d, float r) { float b = dot(o, d), c = dot(o, o) - r * r, h = b * b - c; if (h < 0) return float2(1, -1); h = sqrt(h); return float2(-b - h, -b + h); }
            half4 frag(Varyings i) : SV_Target
            {
                float3 sol = GetMainLight().direction, ojo = _WorldSpaceCameraPos, mira = normalize(i.positionWS - ojo);
                if (_Modo < 0.5)
                {
                    // (stars: a few cells of the ball have one, each its own size and brightness; they go out where the air is lit)
                    float3 p = normalize(i.enSuBola) * 90, c = floor(p); float s = Suerte(c), hay = step(0.965, s), punto = smoothstep(0.34, 0.0, length(frac(p) - 0.5 - (float3(Suerte(c + 3), Suerte(c + 7), Suerte(c + 11)) - 0.5) * 0.4));
                    return half4(_Claro.rgb * (0.4 + 0.6 * Suerte(c + 19)), hay * punto);
                }
                if (_Modo > 1.5)
                {
                    float3 P = i.positionWS, arriba = normalize(P), alSol = normalize(sol - arriba * dot(sol, arriba) + 1e-4);
                    float f = NubeCruda(P, _Time.y), umbral = 0.62 - _Nubes * 0.2 + abs(_Capa - 0.5) * 0.075, n = smoothstep(umbral, umbral + 0.1, f);
                    float claro = saturate(0.6 + (f - NubeCruda(P + alSol * 45, _Time.y)) * 7), dia = saturate(dot(arriba, sol) * 1.6 + 0.25);
                    float3 c = lerp(_Aire.rgb * 0.3, lerp(_Calido.rgb, _Claro.rgb, saturate(dia * 1.4)), dia) * (0.6 + 0.4 * claro) * (0.8 + 0.2 * _Capa);
                    float cerca = saturate(distance(ojo, P) / 60);      // (it thins as one goes through it)
                    return half4(c, n * 0.66 * cerca);
                }
                float2 aire = Cruza(ojo, mira, _Tope), suelo = Cruza(ojo, mira, _Radio * 0.995); if (aire.x > aire.y) return 0;
                float desde = max(aire.x, 0), hasta = aire.y; bool tapa = suelo.x < suelo.y && suelo.x > 0; if (tapa) hasta = suelo.x;
                float largo = max(0, hasta - desde), medio = clamp(-dot(ojo, mira), desde, hasta); float3 cercano = ojo + mira * medio, mitad = ojo + mira * (desde + hasta) * 0.5;
                float alto = max(0, length(cercano) - _Radio), espeso = exp(-alto / (_Tope - _Radio) * 3.5), cuanto = 1 - exp(-largo * espeso / (_Radio * 0.11));
                float sobre = dot(normalize(mitad), sol), dia = smoothstep(-0.3, 0.3, sobre), bajo = (1 - smoothstep(0.0, 0.55, sobre)) * dia;
                float3 c = lerp(_Aire.rgb * 0.8, lerp(_Aire.rgb, _Claro.rgb, 0.4), saturate(largo / (_Radio * 0.7))); c = lerp(c, _Calido.rgb, bajo * 0.75);
                float haciaElSol = saturate(dot(mira, sol)); c += _Calido.rgb * pow(haciaElSol, 6) * 0.35 * dia + _Claro.rgb * pow(haciaElSol, 60) * 0.5 * dia;
                float disco = tapa ? 0 : smoothstep(0.9993, 0.9997, haciaElSol);
                return half4(lerp(c * (0.08 + 0.92 * dia), _Claro.rgb * 3, disco), saturate(cuanto * (0.12 + 0.88 * dia) + disco));
            }
            ENDHLSL
        }
    }
}
