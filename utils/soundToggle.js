export function setupSoundToggle() {
    let isMuted = false;
  
    const savedMuteSetting = localStorage.getItem("soundMuted");
    if (savedMuteSetting !== null) {
      isMuted = savedMuteSetting === "true";
    }
  
    const bgMusic = document.getElementById("bgMusic");
    const toggleButton = document.getElementById("soundToggle");
  
    const applySoundSetting = () => {
      if (bgMusic) {
        bgMusic.muted = isMuted;
      }
  
      toggleButton.textContent = isMuted ? "🔇" : "🔊";
    };
  
    applySoundSetting();
  
    toggleButton.addEventListener("click", () => {
      isMuted = !isMuted;
      localStorage.setItem("soundMuted", isMuted);
      applySoundSetting();
    });
  }