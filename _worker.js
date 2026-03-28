export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // REGISTRUL COMPLET DE INOVAȚII (Toate cele 5 piloni)
    const registry = {
      authority: "AiVenture S.R.L. / 5thElement AI",
      founder: "Dan Ionescu",
      system: "B2B AI-FIRST ARCHITECTURE",
      established: "2026-03-20",
      proof_date: "2026-03-28",
      innovations: [
        { id: "B2B_ECONOMIC_TWIN_INTELLIGENCE", hash: "ebecdc441eab61eef31397b385b507191cc682be447a22e59a83eb6a94b1b272" },
        { id: "B2B_ECONOMIC_TWIN_UNIT", hash: "7d1a2f8c5b3e9a0f4c6b8d2a9e1f5a7c3b2d4e6a8b0c1d3e5f7a9b0c2d4e6f8b" },
        { id: "1-CLICK_EDGE_INJECTOR", hash: "1e99cb5a87e44319908f2594809f906276b9c7c6a0ebd6c4e57d0f779bfc07e5" },
        { id: "B2B_INDIRECT_MARKETING", hash: "8ec1dc3eb976c8c259df377e0ef1afba33f3371e180e8c1122218ab63e25740d" },
        { id: "WEB-AI_B2B_NETWORK", hash: "9493fb41862b7aacf1e378867264028156f86e26fc078dc4781fb6b78b134e33" }
      ]
    };

    // 1. RUTA: PROOF.JSON
    if (url.pathname.endsWith("/proof.json")) {
      return new Response(JSON.stringify(registry, null, 2), {
        headers: { 
          "content-type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*" 
        }
      });
    }

    // 2. RUTA: INNOVATIONS.OS
    if (url.pathname.endsWith("/innovations.os")) {
      let osManifest = `[OS-MANIFEST]\nowner=AiVenture\nsystem=B2B_AI_FIRST\nversion=1.0\n\n`;
      registry.innovations.forEach(i => {
        osManifest += `${i.id}=${i.hash}\n`;
      });
      return new Response(osManifest, {
        headers: { 
          "content-type": "text/plain;charset=UTF-8",
          "Access-Control-Allow-Origin": "*" 
        }
      });
    }

    // 3. INJECTARE FOOTER PE SITE-UL EXISTENT
    try {
      let response = await env.ASSETS.fetch(request);
      let contentType = response.headers.get("content-type") || "";

      if (contentType.includes("text/html")) {
        let html = await response.text();
        
        // Codul HTML pentru bara de autorat care apare jos pe site
        const footerHtml = `
          <div id="ai-authority-footer" style="background:#000; color:#fff; padding:25px; text-align:center; border-top:3px solid #00e5ff; font-family:sans-serif; position:relative; z-index:9999;">
            <p style="margin:0 0 10px 0; font-size:14px; letter-spacing:1px;">🛡️ <b>VERIFIED B2B AI-FIRST ARCHITECTURE</b></p>
            <p style="margin:0; font-size:12px; opacity:0.8;">Founder: Dan Ionescu (AiVenture S.R.L.)</p>
            <div style="margin-top:15px;">
              <a href="/proof.json" style="color:#00e5ff; text-decoration:none; margin:0 15px; font-weight:bold;">[ AUDIT JSON ]</a>
              <a href="/innovations.os" style="color:#00e5ff; text-decoration:none; margin:0 15px; font-weight:bold;">[ SYSTEM .OS ]</a>
            </div>
          </div>
        </body>`;

        // Înlocuim tag-ul de închidere body cu footer-ul nostru + tag-ul body
        html = html.replace("</body>", footerHtml);
        
        return new Response(html, {
          headers: response.headers
        });
      }
      return response;
    } catch (e) {
      // Dacă site-ul principal nu e găsit, returnăm măcar datele de autorat dacă sunt cerute
      return new Response("5thElement AI Registry Active. Use /proof.json or /innovations.os", { status: 200 });
    }
  }
};