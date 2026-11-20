// Video utility functions for YouTube, Vimeo, direct video files, and thumbnails

export function getYouTubeVideoId(url) {
  if (!url || typeof url !== "string") return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i
  );
  return match ? match[1] : null;
}

export function getYouTubeThumbnail(url) {
  const id = getYouTubeVideoId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export function getYouTubeEmbedUrl(url) {
  const id = getYouTubeVideoId(url);
  if (id) {
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  }
  return url;
}

export function getVimeoId(url) {
  if (!url || typeof url !== "string") return null;
  const match = url.match(/(?:vimeo\.com\/)(\d+)/i);
  return match ? match[1] : null;
}

export function getVimeoEmbedUrl(url) {
  const id = getVimeoId(url);
  if (id) {
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }
  return url;
}

export function isVideoFile(url) {
  if (!url || typeof url !== "string") return false;
  const clean = url.split("?")[0].toLowerCase();
  return (
    clean.endsWith(".mp4") ||
    clean.endsWith(".webm") ||
    clean.endsWith(".mov") ||
    clean.endsWith(".ogg") ||
    clean.endsWith(".m4v")
  );
}

export function checkIsVideo(imageUrl, redirectUrl) {
  const combined = `${imageUrl || ""} ${redirectUrl || ""}`.toLowerCase();
  return (
    combined.includes("youtube.com") ||
    combined.includes("youtu.be") ||
    combined.includes("vimeo.com") ||
    isVideoFile(imageUrl) ||
    isVideoFile(redirectUrl) ||
    combined.includes(".mp4") ||
    combined.includes(".webm") ||
    combined.includes(".mov") ||
    combined.includes(".m4v")
  );
}

export function resolveCharityMedia(item) {
  if (!item) {
    return {
      isVideo: false,
      videoUrl: "",
      thumbnailUrl: "",
      isYouTube: false,
      isVimeo: false,
      isDirectVideo: false,
    };
  }

  const { image_url, redirect_url } = item;
  const isVideo = checkIsVideo(image_url, redirect_url);

  if (!isVideo) {
    return {
      isVideo: false,
      videoUrl: "",
      thumbnailUrl: image_url || "",
      isYouTube: false,
      isVimeo: false,
      isDirectVideo: false,
    };
  }

  // Determine the video target URL
  let videoUrl = "";
  if (redirect_url && checkIsVideo(redirect_url)) {
    videoUrl = redirect_url;
  } else if (image_url && checkIsVideo(image_url)) {
    videoUrl = image_url;
  } else {
    videoUrl = redirect_url || image_url || "";
  }

  const isYouTube = Boolean(getYouTubeVideoId(videoUrl));
  const isVimeo = Boolean(getVimeoId(videoUrl));
  const isDirectVideo = isVideoFile(videoUrl);

  // Determine thumbnail image
  let thumbnailUrl = "";
  if (image_url && !isVideoFile(image_url)) {
    thumbnailUrl = image_url;
  } else if (isYouTube) {
    thumbnailUrl = getYouTubeThumbnail(videoUrl) || "";
  }

  return {
    isVideo: true,
    videoUrl,
    thumbnailUrl,
    isYouTube,
    isVimeo,
    isDirectVideo,
  };
}
