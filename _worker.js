export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const registry = {
      authority: "AiVenture S.R.L. / 5thElement AI",
      founder: "Dan Ionescu",
      system: "B2B AI-FIRST ARCHITECTURE",
      innovations: [
        { id: "B2B_ECONOMIC_TWIN_INTELLIGENCE", hash: "ebecdc441eab61eef31397b385b507191cc682be447a22e59a83eb6a94b1b272" },
        { id: "B2B_ECONOMIC_TWIN_UNIT", hash: "7d1a2f8c5b3e9a0f4c6b8d2a9e1f5a7c3b2d4e6a8b0c1d3e5f7a9b0c2d4e6f8b" },
        { id: "1-CLICK_EDGE_INJECTOR", hash: "1e99cb5a87e44319908f2594809f906276b9c7c6a0ebd6c4e57d0f779bfc07e5" }
      ]
    };

    if (url.pathname.endsWith("/proof.json")) {
      return new Response(JSON.stringify(registry, null, 2), { headers: { "content-type": "application/json;charset=UTF-8" } });
    }

    if (url.pathname.endsWith("/innovations.os")) {
      let os = `[OS-MANIFEST]\nowner=AiVenture\n` + registry.innovations.map(i => `${i.id}=${i.hash}`).join("\n");
      return new Response(os, { headers: { "content-type": "text/plain;charset=UTF-8" } });
    }

    // Injectăm footer-ul peste site-ul lui Claude
    let response = await env.ASSETS.fetch(request);
    if (response.headers.get("content-type")?.includes("text/html")) {
      let html = await response.text();
      const footerHtml = `<div style="background:#000;color:#fff;padding:20px;text-align:center;border-top:2px solid #333;font-family:sans-serif;font-size:12px;"><p>🛡️ <b>Verified B2B AI-FIRST Architecture</b> | Founder: Dan Ionescu</p><p><a href="/proof.json" style="color:#00e5ff">Audit JSON</a> | <a href="/innovations.os" style="color:#00e5ff">System .OS</a></p></div></body>`;
      return new Response(html.replace("</body>", footerHtml), { headers: response.headers });
    }
    return response;
  }
};