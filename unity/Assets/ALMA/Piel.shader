// The skin of an ALMA character: the cloth of its pillows, its legs and its shoes. One shader for its five kinds:
//   0 pana    ribbed cloth, soft, with a pale edge          1 punto   a chunky knit of two yarns
//   2 vinilo  blown vinyl, glossy                           3 goma    rubber, a soft shine
//   4 gamuza  suede, matte
// A part may wear the entity's pattern (entidades/patron.mjs) as a print: its second color where the pattern is high.
// The fine grain (ribs, stitches) is drawn only where it is larger than a pixel, so that it does not shimmer from afar.
Shader "ALMA/Piel"
{
    Properties
    {
        _A ("Color", Vector) = (1, 1, 1, 1)
        _B ("Segundo color", Vector) = (0, 0, 0, 1)
        _Medida ("Ancho y alto de su mapa", Vector) = (1, 1, 0, 0)
        _Patron ("Patron: vueltas, alto, umbral, lo lleva", Vector) = (2, 0.9, 0.03, 0)
        _Clase ("Clase", Float) = 0
        _Cuantos ("Modos del patron", Float) = 0
        _Ambiente ("Luz de ambiente", Range(0, 1)) = 0.2
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "Queue" = "Geometry" }
        HLSLINCLUDE
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
        CBUFFER_START(UnityPerMaterial)
        float4 _A; float4 _B; float4 _Medida; float4 _Patron; float _Clase; float _Cuantos; float _Ambiente;
        CBUFFER_END
        float4 _Modos[6];
        struct Attributes { float4 positionOS : POSITION; float3 normalOS : NORMAL; float2 uv : TEXCOORD0; };
        ENDHLSL

        Pass
        {
            Name "Piel"
            Tags { "LightMode" = "UniversalForward" }
            Cull Back
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile _ _MAIN_LIGHT_SHADOWS _MAIN_LIGHT_SHADOWS_CASCADE
            #pragma multi_compile_fragment _ _SHADOWS_SOFT
            struct Varyings { float4 positionCS : SV_POSITION; float2 uv : TEXCOORD0; float3 positionWS : TEXCOORD1; float3 normalWS : TEXCOORD2; };
            Varyings vert(Attributes i)
            {
                Varyings o; o.positionWS = TransformObjectToWorld(i.positionOS.xyz); o.positionCS = TransformWorldToHClip(o.positionWS); o.normalWS = TransformObjectToWorldNormal(i.normalOS); o.uv = i.uv; return o;
            }
            float patron(float2 p)
            {
                float t = 0;
                for (int k = 0; k < 6; k++)
                {
                    float4 m = _Modos[k]; float pesa = step(k + 0.5, _Cuantos);
                    t += pesa * m.z * (cos(m.x * PI * p.x) * cos(m.y * PI * p.y) + m.w * cos(m.y * PI * p.x) * cos(m.x * PI * p.y));
                }
                return t;
            }
            half4 frag(Varyings i) : SV_Target
            {
                float3 N = normalize(i.normalWS), V = normalize(GetWorldSpaceViewDir(i.positionWS));
                float2 m = i.uv * _Medida.xy;                                             // its map in real measures: a stitch keeps its size
                float lado = _Patron.w * saturate((patron(i.uv * _Patron.xy) + _Patron.z) / (2.0 * _Patron.z));
                float3 base = lerp(_A.rgb, _B.rgb, lado);
                float brillo = 0.04, agudo = 24.0, borde = 0.0, espejo = 0.0, envuelve = 0.35;
                if (_Clase < 0.5)
                {
                    float c = m.y / 0.0052, fino = saturate(1.5 - fwidth(c) * 2.0);      // ribs
                    base *= lerp(0.88, 0.72 + 0.28 * abs(sin(c * PI)), fino); borde = 0.3;
                }
                else if (_Clase < 1.5)
                {
                    float fila = m.y / 0.0072, col = m.x / 0.0101 + floor(fila) * 0.5; float2 d = frac(float2(col, fila)) - 0.5;
                    float fino = saturate(1.5 - max(fwidth(m.x / 0.0101), fwidth(fila)) * 2.0), puntada = saturate((1.0 - length(d) * 1.7) * 1.5);
                    base *= lerp(0.84, 0.58 + 0.42 * puntada, fino) * (1.0 + 0.1 * lado); borde = 0.35;      // each stitch a soft knot; the second yarn stands a little prouder
                }
                else if (_Clase < 2.5) { brillo = 0.85; agudo = 220.0; espejo = 1.0; envuelve = 0.1; }
                else if (_Clase < 3.5) { brillo = 0.22; agudo = 36.0; espejo = 0.25; envuelve = 0.15; }
                else { borde = 0.28; }

                Light L = GetMainLight(TransformWorldToShadowCoord(i.positionWS + N * 0.012));
                float nl = dot(N, L.direction), nv = saturate(dot(N, V)), luz = L.shadowAttenuation * L.distanceAttenuation;
                float cara = saturate((nl + envuelve) / (1.0 + envuelve));
                float3 H = normalize(L.direction + V); float nh = saturate(dot(N, H)), roce = pow(1.0 - nv, 4.0);
                float3 R = reflect(-V, N);
                float3 c = base * (_Ambiente * (0.65 + 0.35 * N.y) + L.color * luz * cara);
                c += L.color * luz * saturate(nl * 4.0) * (pow(nh, agudo) * brillo + pow(nh, 14.0) * 0.1 * espejo);                          // the light itself, seen in it
                c += espejo * (0.03 + 0.97 * roce) * (0.1 + 0.3 * smoothstep(0.25, 0.85, R.y)) * lerp(base, float3(1, 1, 1), 0.7);           // a pale room above, mirrored
                c += borde * roce * (0.25 + 0.75 * luz * cara) * lerp(base, float3(1, 1, 1), 0.35);                                          // the pale edge of cloth
                return half4(c, 1);
            }
            ENDHLSL
        }
        Pass
        {
            Name "ShadowCaster"
            Tags { "LightMode" = "ShadowCaster" }
            ZWrite On ZTest LEqual ColorMask 0 Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            float3 _LightDirection;
            float4 vert(Attributes i) : SV_POSITION
            {
                float3 p = TransformObjectToWorld(i.positionOS.xyz), n = TransformObjectToWorldNormal(i.normalOS);
                float4 c = TransformWorldToHClip(ApplyShadowBias(p, n, _LightDirection));
                #if UNITY_REVERSED_Z
                c.z = min(c.z, UNITY_NEAR_CLIP_VALUE);
                #else
                c.z = max(c.z, UNITY_NEAR_CLIP_VALUE);
                #endif
                return c;
            }
            half4 frag() : SV_Target { return 0; }
            ENDHLSL
        }
        Pass
        {
            Name "DepthOnly"
            Tags { "LightMode" = "DepthOnly" }
            ZWrite On ColorMask R Cull Back
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            float4 vert(Attributes i) : SV_POSITION { return TransformObjectToHClip(i.positionOS.xyz); }
            half4 frag() : SV_Target { return 0; }
            ENDHLSL
        }
    }
}
