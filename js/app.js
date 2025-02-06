// Fungsi toggle dark mode
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
};

// Event listener untuk tombol dark mode
document.addEventListener('DOMContentLoaded', () => {
  const darkModeBtn = document.getElementById('darkModeBtn');
  if(darkModeBtn) {
    darkModeBtn.addEventListener('click', toggleDarkMode);
  }
});
