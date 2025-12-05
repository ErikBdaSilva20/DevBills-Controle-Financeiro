// Pré-carrega o áudio (só vai tocar quando chamado)
const flashAudio = new Audio('/flashBang.mp3');
flashAudio.volume = 0.25;

export const playFlashBang = () => {
  flashAudio.currentTime = 0;
  flashAudio.play();
};

export const flashAndNavigate = (navigate: () => void) => {
  playFlashBang();

  setTimeout(() => {
    navigate();
  }, 1000);
};

export default flashAndNavigate;
