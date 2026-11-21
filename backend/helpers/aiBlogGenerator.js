// backend/helpers/aiBlogGenerator.js

/**
 * AI Blog Generator Service
 * Supports Google Gemini (Free tier URL / API) & OpenAI API
 * Generates humanized, SEO-optimized, non-AI-detectable articles
 * with optional location-based targeting (Local SEO).
 */

function slugify(text) {
  return (text || "")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

/**
 * Cleans and safely extracts JSON from AI text response.
 */
function parseAiResponse(rawText) {
  if (!rawText || typeof rawText !== "string") {
    throw new Error("Empty response received from AI model");
  }

  let cleaned = rawText.trim();

  // Strip markdown code fences if wrapped
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/i, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }
  cleaned = cleaned.trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    // Fallback: extract the outermost JSON object if there is extra prose
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const substr = cleaned.slice(firstBrace, lastBrace + 1);
      return JSON.parse(substr);
    }
    throw new Error("Failed to parse valid JSON from AI response: " + rawText.slice(0, 200));
  }
}

/**
 * Builds the comprehensive prompt for humanized, non-AI-detectable, SEO blog writing.
 */
function buildPrompts({ title, isLocationBlog, location, keywords, tone }) {
  const isLocation = Boolean(isLocationBlog && location && location.trim());
  const locName = isLocation ? location.trim() : "";

  const systemPrompt = `You are a world-class human content strategist, veteran technology writer, and senior SEO consultant with 15+ years of experience crafting top-ranking digital articles for "Startup Web Support" (sws) — an industry-leading agency specializing in custom web development, full-stack software, mobile apps, UI/UX design, cloud solutions, and digital marketing.

YOUR PRIMARY GOAL:
Produce an authentic, comprehensive, 100% human-written article that scores zero on AI detectors (e.g. GPTZero, Originality.ai) by adhering strictly to natural human cadence, varied perplexity, realistic burstiness, and genuine practitioner wisdom.

CRITICAL RULES FOR 100% HUMANIZED WRITING (BYPASS ALL AI DETECTORS):
1. FORBIDDEN AI WORDS & ROBOTIC FORMULAS — NEVER USE ANY OF THE FOLLOWING:
   - "In today's fast-paced digital world / landscape / era"
   - "delve", "delving", "tapestry", "plethora", "beacon", "testament", "realm", "crucial"
   - "harness the power of", "in conclusion", "furthermore", "it is important to remember"
   - "let's dive in", "revolutionize", "game-changer", "seamlessly", "elevate your", "embark"
   - "in a nutshell", "paradigm shift", "vital role", "transformative journey", "at the end of the day"
2. HUMAN CADENCE & BURSTINESS:
   - Alternate sentence lengths dramatically: pair punchy 3-to-6 word sentences ("Speed matters.", "Most teams fail here.", "That is a costly assumption.") with longer, nuanced analytical paragraphs.
   - Use natural conversational transitions, rhetorical questions, and occasional first-person plural or direct reader address ("If you've ever dealt with...", "Here is the reality most agencies will not tell you:", "Let's be candid:").
   - Break symmetry: avoid formulaic paragraphs that all start the same way.
3. DEPTH & PRACTICAL IMPLEMENTATION:
   - Ground insights in real business metrics: conversions, bounce rates, technical debt, ROI, maintainability, customer trust, and speed.
   - Include realistic hurdles, trade-offs, and pragmatic solutions.
${
  isLocation
    ? `4. LOCAL SEO & REGIONAL RELEVANCE (${locName}):
   - The article MUST be thoughtfully customized for businesses, startups, and clients based in or targeting "${locName}".
   - Naturally infuse the regional business climate, local consumer behavior, why businesses in "${locName}" are accelerating their digital adoption, local search competitiveness, and location-targeted SEO strategies.
   - Weave "${locName}" smoothly into headings and paragraphs without spammy or robotic repetition.`
    : `4. GENERAL SEO & INDUSTRY AUTHORITY:
   - Focus on user intent, high search visibility, and actionable guidance for growing companies.`
}
5. FORMATTING & SEMANTIC HTML:
   - Format the "content" strictly in clean, semantic HTML (starting directly with <h2> or opening <p>, NO <html>, <head>, <body>, or <h1> tags, because the page already displays the title as h1).
   - Use <h2> for major sections, <h3> for sub-steps/points.
   - Use <p> for paragraphs with generous spacing.
   - Use <ul> / <ol> and <li> with <strong>bold headings</strong> for actionable takeaways.
   - Include at least one styled callout tip box using:
     <div class="callout my-6 p-4 rounded-xl border-l-4 border-[#029bd2] bg-sky-50 dark:bg-sky-950/30 text-zinc-800 dark:text-zinc-200">
       <strong>Expert Takeaway:</strong> [Actionable insight here]
     </div>
   - End with a compelling, natural conclusion paragraph and a subtle call-to-action to consult with Startup Web Support.
   - Total article length should be substantial (typically 800 - 1500+ words).

OUTPUT SPECIFICATION:
Respond ONLY with a valid JSON object (no markdown code blocks, no other text) with these exact keys:
{
  "title": "Compelling, high-CTR, human-sounding SEO title (under 70 characters${isLocation ? `, naturally mentioning ${locName}` : ''})",
  "slug": "url-friendly-slug-with-hyphens",
  "short_description": "Engaging 150-160 character meta description that hooks searchers and drives clicks",
  "keywords": "6-10 high-value, comma-separated SEO meta keywords and long-tail search phrases${isLocation ? ` (including ${locName} localized keywords)` : ''}",
  "content": "Full semantic HTML article as described above",
  "tags": ["3-5 relevant SEO tags"],
  "reading_time": "e.g. 6 min read"
}`;

  const userPrompt = `Topic / Working Title: "${title}"
${isLocation ? `Target Location: "${locName}" (Create a specialized Location SEO Blog)` : "Target: Global / General Business"}
${keywords ? `Focus Keywords / Angle: "${keywords}"` : ""}
${tone ? `Desired Tone / Style: "${tone}"` : "Tone: Authoritative, engaging, human practitioner, conversational yet professional"}

Please generate the complete, humanized, SEO-ready blog post JSON now.`;

  return { systemPrompt, userPrompt, fullPrompt: `${systemPrompt}\n\nUSER REQUEST:\n${userPrompt}` };
}

/**
 * Call Google Gemini Free Tier API
 */
async function callGeminiApi({ prompt, apiKey, model, customUrl }) {
  const key = apiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY is not configured in backend/.env");
  }

  // Model selection (defaults to gemini-1.5-flash which is free tier)
  const targetModel = model || process.env.GEMINI_MODEL || "gemini-1.5-flash";

  let endpoint = customUrl || process.env.GEMINI_FREE_URL;
  if (endpoint) {
    if (endpoint.includes("{model}")) {
      endpoint = endpoint.replace("{model}", targetModel);
    }
    if (endpoint.includes("{key}")) {
      endpoint = endpoint.replace("{key}", key);
    } else if (!endpoint.includes("key=")) {
      const separator = endpoint.includes("?") ? "&" : "?";
      endpoint = `${endpoint}${separator}key=${key}`;
    }
  } else {
    endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${key}`;
  }

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.75,
      responseMimeType: "application/json",
    },
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let parsedMsg;
    try {
      const json = JSON.parse(errorBody);
      parsedMsg = json.error?.message || json.message;
    } catch {
      parsedMsg = errorBody;
    }
    throw new Error(`Gemini API error (${response.status}): ${parsedMsg}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Gemini returned an empty response. Candidate safety filters may have triggered.");
  }

  return text;
}

/**
 * Call OpenAI API
 */
async function callOpenAiApi({ systemPrompt, userPrompt, apiKey, model, customUrl }) {
  const key = apiKey || process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error("OPENAI_API_KEY is not configured in backend/.env");
  }

  const targetModel = model || process.env.OPENAI_MODEL || "gpt-4o-mini";
  const endpoint = customUrl || process.env.OPENAI_API_URL || "https://api.openai.com/v1/chat/completions";

  const payload = {
    model: targetModel,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.75,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let parsedMsg;
    try {
      const json = JSON.parse(errorBody);
      parsedMsg = json.error?.message || json.message;
    } catch {
      parsedMsg = errorBody;
    }
    throw new Error(`OpenAI API error (${response.status}): ${parsedMsg}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error("OpenAI returned an empty response");
  }

  return text;
}

/**
 * Main generator entry point
 */
async function generateBlog({
  title,
  isLocationBlog = false,
  location = "",
  keywords = "",
  tone = "",
  provider = "auto",
}) {
  if (!title || !title.trim()) {
    throw new Error("Title or topic is required to generate a blog.");
  }

  if (isLocationBlog && (!location || !location.trim())) {
    throw new Error("Location is required when Location Blog is enabled.");
  }

  const { systemPrompt, userPrompt, fullPrompt } = buildPrompts({
    title,
    isLocationBlog,
    location,
    keywords,
    tone,
  });

  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
  const hasOpenAiKey = Boolean(process.env.OPENAI_API_KEY);

  let rawJson = null;
  let providerUsed = provider;

  if (provider === "gemini") {
    rawJson = await callGeminiApi({ prompt: fullPrompt });
    providerUsed = "Gemini";
  } else if (provider === "openai") {
    rawJson = await callOpenAiApi({ systemPrompt, userPrompt });
    providerUsed = "OpenAI";
  } else {
    // Auto mode: Try Gemini first (free tier URL), then fall back to OpenAI
    let geminiError = null;

    if (hasGeminiKey) {
      try {
        rawJson = await callGeminiApi({ prompt: fullPrompt });
        providerUsed = "Gemini";
      } catch (err) {
        geminiError = err;
        console.warn("Gemini generation failed, checking OpenAI fallback:", err.message);
      }
    }

    if (!rawJson && hasOpenAiKey) {
      try {
        rawJson = await callOpenAiApi({ systemPrompt, userPrompt });
        providerUsed = "OpenAI";
      } catch (openAiErr) {
        if (geminiError) {
          throw new Error(
            `Both AI providers failed. Gemini: ${geminiError.message} | OpenAI: ${openAiErr.message}`
          );
        }
        throw openAiErr;
      }
    }

    if (!rawJson) {
      if (geminiError) throw geminiError;
      throw new Error(
        "No AI API keys configured. Please add GEMINI_API_KEY or OPENAI_API_KEY in your backend/.env file."
      );
    }
  }

  const parsed = parseAiResponse(rawJson);

  // Normalize and sanitize parsed result
  const finalTitle = parsed.title?.trim() || title;
  const finalSlug = parsed.slug?.trim() ? slugify(parsed.slug) : slugify(finalTitle);
  let finalContent = parsed.content?.trim() || "";

  // Strip any accidental markdown fences inside the content string
  if (finalContent.startsWith("```html")) {
    finalContent = finalContent.replace(/^```html\s*/i, "").replace(/\s*```$/, "");
  } else if (finalContent.startsWith("```")) {
    finalContent = finalContent.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  // Extract and normalize keywords
  let finalKeywords = "";
  if (parsed.keywords) {
    finalKeywords = Array.isArray(parsed.keywords)
      ? parsed.keywords.map((k) => String(k).trim()).filter(Boolean).join(", ")
      : String(parsed.keywords).trim();
  } else if (Array.isArray(parsed.tags) && parsed.tags.length > 0) {
    finalKeywords = parsed.tags.map((t) => String(t).trim()).filter(Boolean).join(", ");
  }

  return {
    title: finalTitle,
    slug: finalSlug,
    short_description: parsed.short_description?.trim() || "",
    keywords: finalKeywords,
    content: finalContent,
    tags: Array.isArray(parsed.tags) ? parsed.tags : [],
    reading_time: parsed.reading_time || "5 min read",
    is_location_blog: Boolean(isLocationBlog),
    location: location ? location.trim() : "",
    provider_used: providerUsed,
  };
}

module.exports = {
  generateBlog,
  buildPrompts,
  parseAiResponse,
};
