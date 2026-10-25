// Silent looping previews; there are no manual steps or playback controls.
for (const film of document.querySelectorAll(
  ".workflow-recording, .chat-recording",
)) {
  let visible = true;
  function resume() {
    if (!visible || document.hidden) return;
    film.muted = true;
    film.defaultMuted = true;
    film.volume = 0;
    film.controls = false;
    film.play()?.catch(() => {});
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) film.pause();
    else resume();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible) resume();
        else film.pause();
      },
      { threshold: 0.05 },
    ).observe(film);
  }
  // Some browsers require a first user gesture even for silent media.
  document.addEventListener("pointerdown", resume, { once: true });
  document.addEventListener("keydown", resume, { once: true });
  resume();
}
