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
        _Tinta ("Color de la espuma", Vector) = (1, 1, 1, 1)
        _Luz ("Se ve con luz propia", Range(0, 1)) = 0
        _Techo ("Radio de las nubes", Float) = 1200
        _Nubes ("Cuanta nube", Range(0, 1)) = 0.5
        [Enum(UnityEngine.Rendering.BlendMode)] _Pone ("Mezcla: lo suyo", Float) = 1
        [Enum(UnityEngine.Rendering.BlendMode)] _Deja ("Mezcla: lo de atras", Float) = 0
        [Enum(UnityEngine.Rendering.CullMode)] _Caras ("Caras que se dibujan", Float) = 2
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "Queue" = "Geometry" }
        HLSLINCLUDE
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
        CBUFFER_START(UnityPerMaterial)
        float4 _Aire; float _Lejos; float _Ambiente; float _Agua; float _Caras; float _Grano; float _Mar; float4 _Roca; float4 _Arena; float4 _Tinta; float _Techo; float _Nubes; float _Pone; float _Deja; float _Luz;
        CBUFFER_END
        #include "Assets/ALMA/Planeta.hlsl"
        ENDHLSL
        Pass
        {
            Name "Planeta"
            Tags { "LightMode" = "UniversalForward" }
            Cull [_Caras] Blend [_Pone] [_Deja]
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
                    float sobreElMar = length(P) - _Mar, arena = smoothstep(3.2, 0.4, sobreElMar + (b.x - 0.5) * 2.2) * (1 - roca);
                    base = lerp(base, _Roca.rgb * (0.75 + 0.5 * b.x), roca * 0.85); base = lerp(base, _Arena.rgb, arena * 0.7);
                    base *= 0.84 + 0.32 * lerp(a.x, 0.5 * b.x + 0.3 * c2.x + 0.2 * d.x, cerca);
                    float3 bulto = a.yzw * 0.045 * 2.5 + b.yzw * 0.4 * 0.5 * cerca + c2.yzw * 2.7 * 0.06 * cerca + d.yzw * 13 * 0.012 * muyCerca; bulto -= N * dot(bulto, N);
                    N = normalize(N - bulto * (0.35 + 0.5 * roca));
                }
                float3 V = normalize(_WorldSpaceCameraPos - P);
                if (_Agua > 0.5) { float4 ola = Ruido(P * 0.25 + _Time.y * 0.12), rizo = Ruido(P * 1.7 - _Time.y * 0.2); float3 mueve = (ola.yzw * 0.06 + rizo.yzw * 0.03 * saturate(1 - tramo / 300)); mueve -= N * dot(mueve, N); N = normalize(N - mueve); }
                Light L = GetMainLight(); float luz = saturate(dot(N, L.direction));
                // (the shadow of the clouds: the cloud layer, asked where the sun's ray to this point goes through it)
                float3 arriba2 = normalize(P); float alSol = max(0.15, dot(arriba2, L.direction)); luz *= 1 - 0.6 * Nube(P + L.direction * ((_Techo - length(P)) / alSol), _Time.y, _Nubes) * step(0.02, dot(arriba2, L.direction));
                float3 c = lerp(base * (_Ambiente + (1 - _Ambiente) * luz * L.color), base, _Luz); float cubre = 1;      // (a sign is read by day and by night)
                if (_Agua > 0.5)
                {
                    // The sea: it shines toward the sun and takes the sky's color at a low angle; by the shore it lets the sand
                    // be seen through it, and breaks in foam that comes and goes. (Its depth rides in its color's fourth number.)
                    float brillo = pow(saturate(dot(N, normalize(L.direction + V))), 90); c += brillo * 0.6 * L.color * luz; c = lerp(c, _Aire.rgb * 0.9 + c * 0.3, pow(1 - saturate(dot(N, V)), 4) * 0.5);
                    float hondo = i.color.a, vaiven = Ruido(P * 0.5 + float3(0, _Time.y * 0.35, 0)).x, espuma = smoothstep(0.075, 0.01, hondo + (vaiven - 0.5) * 0.05 + 0.012 * sin(_Time.y * 0.9 + vaiven * 6)) * saturate(1 - tramo / 900);
                    c = lerp(c, _Tinta.rgb * (_Ambiente + (1 - _Ambiente) * luz), espuma * 0.85); cubre = saturate(0.72 + hondo * 2 + espuma);
                }
                // (from space, the air of the lit side gathers at the planet's edge)
                c += _Aire.rgb * pow(1 - saturate(dot(arriba2, V)), 3) * 0.6 * saturate(dot(arriba2, L.direction) + 0.2) * (1 - _Aire.a);
                float lejos = 1 - exp(-tramo / _Lejos);
                return half4(lerp(c, _Aire.rgb, lejos * _Aire.a), cubre);
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
