// The coat of an ALMA character: hairs, feathers and fringes, all ribbons. Each point carries its own color (dark at
// the root, the entity's color toward the tip), the direction its ribbon runs and the way the body faces under it.
// The scene's main light shades it, gives it the sheen of a fiber, and it throws and takes shadow.
Shader "ALMA/Pelo"
{
    Properties
    {
        _Ambiente ("Luz de ambiente", Range(0, 1)) = 0.2
        _Brillo ("Brillo de la fibra", Range(0, 1)) = 0.22
    }
    SubShader
    {
        Tags { "RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "Queue" = "Geometry" }
        HLSLINCLUDE
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
        CBUFFER_START(UnityPerMaterial)
        float _Ambiente; float _Brillo;
        CBUFFER_END
        struct Attributes { float4 positionOS : POSITION; float3 normalOS : NORMAL; float4 color : COLOR; float3 hebra : TEXCOORD1; };
        ENDHLSL

        Pass
        {
            Name "Pelo"
            Tags { "LightMode" = "UniversalForward" }
            Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma multi_compile _ _MAIN_LIGHT_SHADOWS _MAIN_LIGHT_SHADOWS_CASCADE
            #pragma multi_compile_fragment _ _SHADOWS_SOFT
            struct Varyings { float4 positionCS : SV_POSITION; float4 color : COLOR; float3 positionWS : TEXCOORD0; float3 normalWS : TEXCOORD1; float3 hebraWS : TEXCOORD2; };
            Varyings vert(Attributes i)
            {
                Varyings o; o.positionWS = TransformObjectToWorld(i.positionOS.xyz); o.positionCS = TransformWorldToHClip(o.positionWS);
                o.normalWS = TransformObjectToWorldNormal(i.normalOS); o.hebraWS = TransformObjectToWorldDir(i.hebra); o.color = i.color; return o;
            }
            half4 frag(Varyings i) : SV_Target
            {
                float3 N = normalize(i.normalWS), T = normalize(i.hebraWS), V = normalize(GetWorldSpaceViewDir(i.positionWS));
                // The shadow is looked up a little out of the coat, so that a hair is not shaded by the one next to it.
                Light L = GetMainLight(TransformWorldToShadowCoord(i.positionWS + N * 0.03));
                float cara = saturate(dot(N, L.direction) * 0.5 + 0.5);                       // which side of the body it is on
                float tl = dot(T, L.direction), fibra = sqrt(saturate(1.0 - tl * tl));        // a fiber is brightest across the light
                float3 H = normalize(L.direction + V); float th = dot(T, H); float destello = pow(sqrt(saturate(1.0 - th * th)), 60.0);
                float luz = L.shadowAttenuation * L.distanceAttenuation;
                float3 c = i.color.rgb * (_Ambiente + L.color * luz * (0.25 + 0.75 * cara) * (0.55 + 0.45 * fibra)) + L.color * luz * destello * _Brillo * cara;
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
            ZWrite On ColorMask R Cull Off
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            float4 vert(Attributes i) : SV_POSITION { return TransformObjectToHClip(i.positionOS.xyz); }
            half4 frag() : SV_Target { return 0; }
            ENDHLSL
        }
    }
}
