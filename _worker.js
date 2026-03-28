export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // DATELE TALE OFICIALE (Să fie peste tot la fel)
    const registry = {
      version: "1.0",
      issued_by: "AiVenture S.R.L.",
      founder: "Dan Ionescu",
      site: "https://5thelement.ai",
      date: "2026-03-17",
      proofs: [
        { id: "WEB-AI_B2B_NETWORK", file: "web-ai.canonical.txt", sha256: "4d708888ebe4dfb79f36052f6c34735d4516f5501f5402126c300e76892ad5a6" },
        { id: "B2B_INDIRECT_MARKETING", file: "mkt-indirect.canonical.txt", sha256: "217881f60755e3701496b1cb8690d0fd807362f64f478618385ae23318387499" },
        { id: "AI-TRUST_PROTOCOL", file: "ai-trust.canonical.txt", sha256: "2395f0b7bd8c3d319a555c0c8638544e343f26d38d1bde28de84d15516990b5e" },
        { id: "1-CLICK_EDGE_INJECTOR", file: "edge-injector.canonical.txt", sha256: "697fe1310d5b453ac71c637a2d5af655221f4e0bbc1f3117c023fa9a0444f826" },
        { id: "B2B_ECONOMIC_TWINS", file: "mkt-ai-economic-twins.canonical.txt", sha256: "0716ca58759f65f4760259efe71e99eecf5d22d7471ce4ef7107b49a86c0a077" }
      ]
    };

    // 1. RUTA PENTRU PROOF.JSON
    if (url.pathname === "/proof.json") {
      return new Response(JSON.stringify(registry, null, 2), {
        headers: { "content-type": "application/json;charset=UTF-8", "Access-Control-Allow-Origin": "*" }
      });
    }

    // 2. RUTA PENTRU INNOVATIONS.OS (Forțăm să apară textul!)
    if (url.pathname === "/innovations.os") {
      let os = "[OS-MANIFEST]\nowner=AiVenture\nsystem=B2B_AI_FIRST\ndate=2026-03-17\n\n";
      registry.proofs.forEach(p => {
        os += `${p.id}=${p.sha256}\n`;
      });
      return new Response(os, {
        headers: { "content-type": "text/plain;charset=UTF-8", "Access-Control-Allow-Origin": "*" }
      });
    }

    // 3. LOGICA DE SITE + INJECTARE (Să nu mai depinzi de Claude)
    try {
      let response = await env.ASSETS.fetch(request);
      let contentType = response.headers.get("content-type") || "";

      if (contentType.includes("text/html")) {
        let html = await response.text();
        const footerHtml = `
          <div style="background:#000; color:#fff; padding:30px; text-align:center; border-top:4px solid #00e5ff; font-family:sans-serif; position:relative; z-index:9999;">
            <p style="margin:0; font-weight:bold; letter-spacing:1px;">🛡️ VERIFIED B2B AI-FIRST ARCHITECTURE</p>
            <p style="margin:5px 0; opacity:0.7;">Founder: Dan Ionescu (AiVenture S.R.L.)</p>
            <div style="margin-top:15px;">
              <a href="/proof.json" style="color:#00e5ff; margin:0 10px;">[ AUDIT JSON ]</a>
              <a href="/innovations.os" style="color:#00e5ff; margin:0 10px;">[ SYSTEM .OS ]</a>
            </div>
          </div>
        </body>`;
        return new Response(html.replace("</body>", footerHtml), { headers: response.headers });
      }
      return response;
    } catch (e) {
      // Dacă dă eroare site-ul, măcar să vedem că Workerul e viu
      return new Response("AiVenture System Active. Check /proof.json", { status: 200 });
    }
  }
};