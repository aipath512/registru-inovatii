export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // REGISTRUL TĂU DE AUTORAT (Sistemul 5thElement / AiVenture)
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

    // Rutele de verificare
    if (url.pathname === "/proof.json") {
      return new Response(JSON.stringify(registry, null, 2), {
        headers: { "content-type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }
    if (url.pathname === "/innovations.os") {
      let os = `[OS-MANIFEST]\nowner=AiVenture\nsystem=B2B_AI_FIRST\n` + 
               registry.innovations.map(i => `${i.id}=${i.hash}`).join("\n");
      return new Response(os, { headers: { "content-type": "text/plain" } });
    }

    // Lasă site-ul să meargă normal
    return fetch(request);
  }
};