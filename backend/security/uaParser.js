/**
 * Lightweight, dependency-free User-Agent parser to extract OS, Browser, and Device Type details.
 * @param {string|null} ua User agent header string
 * @returns {{ os: string, browser: string, device: "Desktop" | "Mobile" | "Tablet" }}
 */
function parseUserAgent(ua) {
  if (!ua) {
    return { os: "Unknown OS", browser: "Unknown Browser", device: "Desktop" };
  }

  let os = "Unknown OS";
  let browser = "Unknown Browser";
  let device = "Desktop";

  // Device detection
  if (/mobile|android|iphone|ipad|phone/i.test(ua)) {
    device = "Mobile";
  } else if (/tablet|ipad|playbook|silk/i.test(ua)) {
    device = "Tablet";
  }

  // OS detection
  if (/windows/i.test(ua)) os = "Windows";
  else if (/macintosh|mac os x/i.test(ua)) os = "macOS";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/linux/i.test(ua)) os = "Linux";

  // Browser detection
  if (/edg/i.test(ua)) browser = "Edge";
  else if (/chrome|crios/i.test(ua)) {
    if (/opr|opios/i.test(ua)) browser = "Opera";
    else browser = "Chrome";
  } else if (/safari/i.test(ua)) {
    if (/chrome|crios|android/i.test(ua)) browser = "Chrome";
    else browser = "Safari";
  } else if (/firefox|fxios/i.test(ua)) browser = "Firefox";

  return { os, browser, device };
}

module.exports = { parseUserAgent };
