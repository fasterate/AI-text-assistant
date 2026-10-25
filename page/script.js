// Shared playback behavior. Each localized page supplies its own video directory.
const video = document.getElementById("demo-video");

if (video) {
  const chinese = document.documentElement.lang.startsWith("zh");
  const copy = chinese
    ? {
        blocked: "自动播放已暂停，点击画面中的按钮即可继续",
        failed: "视频暂时无法加载，请点击画面中的按钮重试",
        label: (name) => `${name}功能中文实操视频`,
        clips: {
          rewrite: "重写",
          continue: "续写",
          write: "代写",
          translate: "翻译",
          answer: "解答",
        },
      }
    : {
        blocked: "Autoplay is paused. Use the button on the video to continue",
        failed:
          "The video could not load. Use the button on the video to try again",
        label: (name) => `English walkthrough of the ${name} feature`,
        clips: {
          rewrite: "Rewrite",
          continue: "Continue",
          write: "Write",
          translate: "Translate",
          answer: "Answer",
        },
      };

  const buttons = document.querySelectorAll("[data-demo]");
  const playButton = document.getElementById("video-play");
  const status = document.getElementById("video-status");
  const videoBase = video.dataset.videoBase;
  const videoVersion = video.dataset.videoVersion;
  const videoQuery = videoVersion
    ? `?v=${encodeURIComponent(videoVersion)}`
    : "";
  let activeClip = "rewrite";
  let clipVersion = 0;

  function clearStatus() {
    playButton.hidden = true;
    status.hidden = true;
    status.textContent = "";
  }

  function requestPlayback() {
    if (document.hidden) return;
    const requestedVersion = clipVersion;
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.controls = false;

    video.play()?.catch((error) => {
      // Switching clips or hiding the page can interrupt an earlier play request.
      if (
        requestedVersion !== clipVersion ||
        error.name === "AbortError" ||
        document.hidden
      )
        return;
      playButton.hidden = false;
      status.textContent = video.error ? copy.failed : copy.blocked;
      status.hidden = false;
    });
  }

  for (const button of buttons) {
    button.disabled = false;
    button.addEventListener("click", () => {
      const name = button.dataset.demo;
      const clip = copy.clips[name];
      if (!clip) return;

      if (name !== activeClip) {
        activeClip = name;
        clipVersion += 1;
        video.pause();
        clearStatus();
        video.poster = `${videoBase}${name}.jpg${videoQuery}`;
        video.src = `${videoBase}${name}.mp4${videoQuery}`;
        video.setAttribute("aria-label", copy.label(clip));
        video.load();
      }

      for (const item of buttons) {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      }
      requestPlayback();
    });
  }

  playButton.addEventListener("click", () => {
    clearStatus();
    if (video.error) video.load();
    requestPlayback();
  });
  video.addEventListener("playing", clearStatus);
  video.addEventListener("error", () => {
    playButton.hidden = false;
    status.textContent = copy.failed;
    status.hidden = false;
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) video.pause();
    else requestPlayback();
  });

  requestPlayback();
}
