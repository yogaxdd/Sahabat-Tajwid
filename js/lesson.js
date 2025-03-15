document.addEventListener('DOMContentLoaded', function() {
  // Handle audio button clicks
  const audioButtons = document.querySelectorAll('.audio-btn');
  const audioPlayer = document.getElementById('audioPlayer');
  const audioElement = document.getElementById('audioElement');
  const closeAudioBtn = document.getElementById('closeAudioBtn');
  
  // Handle practice question buttons
  const practiceButtons = document.querySelectorAll('.practice-btn');
  
  // Set up audio buttons
  audioButtons.forEach(button => {
    button.addEventListener('click', function() {
      const audioSrc = this.getAttribute('data-audio');
      const audioTitle = this.getAttribute('data-title') || 'Audio Contoh';
      
      if (!audioSrc) {
        console.warn('No audio source specified');
        return;
      }
      
      // Update the audio title if available
      const titleElement = document.getElementById('audioTitle');
      if (titleElement) {
        titleElement.textContent = audioTitle;
      }
      
      // Set the audio source
      audioElement.src = audioSrc;
      
      // Show the audio player
      audioPlayer.classList.add('active');
      
      // Play the audio
      audioElement.load();
      audioElement.play().catch(error => {
        console.error('Error playing audio:', error);
        // Show a message to the user
        alert('Tidak dapat memutar audio. Silakan coba lagi nanti.');
      });
    });
  });
  
  // Close audio player
  if (closeAudioBtn) {
    closeAudioBtn.addEventListener('click', function() {
      audioPlayer.classList.remove('active');
      audioElement.pause();
    });
  }
  
  // Handle practice answers
  practiceButtons.forEach(button => {
    button.addEventListener('click', function() {
      const answer = this.getAttribute('data-answer');
      const practiceItem = this.closest('.practice-item');
      const resultElement = practiceItem.querySelector('.practice-result');
      
      // Check answer based on the type of practice question
      const questionType = practiceItem.getAttribute('data-type');
      
      let isCorrect = false;
      let message = '';
      
      switch(questionType) {
        case 'idghom-bighunnah':
          if (answer === 'idghom-bighunnah') {
            isCorrect = true;
            message = 'Benar! Ini adalah Idghom Bighunnah karena nun sukun atau tanwin bertemu dengan salah satu huruf ي ن م و.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali hurufnya.';
          }
          break;
          
        case 'idghom-bilaghunnah':
          if (answer === 'idghom-bilaghunnah') {
            isCorrect = true;
            message = 'Benar! Ini adalah Idghom Bilaghunnah karena nun sukun atau tanwin bertemu dengan salah satu huruf ل ر.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali hurufnya.';
          }
          break;
          
        case 'idzhar':
          if (answer === 'idzhar') {
            isCorrect = true;
            message = 'Benar! Ini adalah Idzhar karena nun sukun atau tanwin bertemu dengan salah satu huruf ء ه ع ح غ خ.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali hurufnya.';
          }
          break;
          
        case 'ikhfa':
          if (answer === 'ikhfa') {
            isCorrect = true;
            message = 'Benar! Ini adalah Ikhfa karena nun sukun atau tanwin bertemu dengan salah satu dari 15 huruf ikhfa.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali hurufnya.';
          }
          break;
          
        case 'iqlab':
          if (answer === 'iqlab') {
            isCorrect = true;
            message = 'Benar! Ini adalah Iqlab karena nun sukun atau tanwin bertemu dengan huruf ب.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali hurufnya.';
          }
          break;
          
        case 'idzhar-syafawi':
          if (answer === 'idzhar-syafawi') {
            isCorrect = true;
            message = 'Benar! Ini adalah Idzhar Syafawi karena mim sukun bertemu dengan huruf selain م dan ب.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali hurufnya.';
          }
          break;
          
        case 'ikhfa-syafawi':
          if (answer === 'ikhfa-syafawi') {
            isCorrect = true;
            message = 'Benar! Ini adalah Ikhfa Syafawi karena mim sukun bertemu dengan huruf ب.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali hurufnya.';
          }
          break;
          
        case 'idghom-mimi':
          if (answer === 'idghom-mimi') {
            isCorrect = true;
            message = 'Benar! Ini adalah Idghom Mimi karena mim sukun bertemu dengan huruf م.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali hurufnya.';
          }
          break;
          
        case 'qolqolah':
          if (answer === 'qolqolah') {
            isCorrect = true;
            message = 'Benar! Ini adalah huruf Qolqolah (ق ط ب ج د) yang dibaca dengan memantul.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali hurufnya.';
          }
          break;
          
        case 'lam-tarif-qamariyah':
          if (answer === 'lam-tarif-qamariyah') {
            isCorrect = true;
            message = 'Benar! Ini adalah Lam Ta\'rif Qamariyah karena al (ال) bertemu dengan huruf qamariyah.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali hurufnya.';
          }
          break;
          
        case 'lam-tarif-syamsiyah':
          if (answer === 'lam-tarif-syamsiyah') {
            isCorrect = true;
            message = 'Benar! Ini adalah Lam Ta\'rif Syamsiyah karena al (ال) bertemu dengan huruf syamsiyah.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali hurufnya.';
          }
          break;
          
        case 'lam-jalalah-tafkhim':
          if (answer === 'lam-jalalah-tafkhim') {
            isCorrect = true;
            message = 'Benar! Ini adalah Lam Jalalah Tafkhim karena lafadz Allah didahului huruf berharakat fathah atau dhammah.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali huruf sebelumnya.';
          }
          break;
          
        case 'lam-jalalah-tarqiq':
          if (answer === 'lam-jalalah-tarqiq') {
            isCorrect = true;
            message = 'Benar! Ini adalah Lam Jalalah Tarqiq karena lafadz Allah didahului huruf berharakat kasrah.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali huruf sebelumnya.';
          }
          break;
          
        case 'mad-thabi-i':
          if (answer === 'mad-thabi-i') {
            isCorrect = true;
            message = 'Benar! Ini adalah Mad Thabi\'i (Mad Asli) yang dibaca panjang 2 harakat.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali panjang bacaannya.';
          }
          break;
          
        case 'mad-wajib-muttasil':
          if (answer === 'mad-wajib-muttasil') {
            isCorrect = true;
            message = 'Benar! Ini adalah Mad Wajib Muttasil yang dibaca panjang 4-5 harakat.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali panjang bacaannya.';
          }
          break;
          
        case 'mad-jaiz-munfasil':
          if (answer === 'mad-jaiz-munfasil') {
            isCorrect = true;
            message = 'Benar! Ini adalah Mad Jaiz Munfasil yang dibaca panjang 2-5 harakat.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali panjang bacaannya.';
          }
          break;
          
        case 'idghom':
          if (answer === 'idghom-bighunnah' || answer === 'idghom-bilaghunnah') {
            isCorrect = true;
            if (answer === 'idghom-bighunnah') {
              message = 'Benar! Ini adalah Idghom Bighunnah karena nun sukun atau tanwin bertemu dengan salah satu huruf ي ن م و.';
            } else {
              message = 'Benar! Ini adalah Idghom Bilaghunnah karena nun sukun atau tanwin bertemu dengan salah satu huruf ل ر.';
            }
          } else {
            message = 'Kurang tepat. Coba periksa kembali hurufnya.';
          }
          break;
          
        case 'mad-lazim':
          if (answer === 'mad-lazim') {
            isCorrect = true;
            message = 'Benar! Ini adalah Mad Lazim yang dibaca panjang 6 harakat.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali panjang bacaannya.';
          }
          break;
          
        case 'mad-arid-lissukun':
          if (answer === 'mad-arid-lissukun') {
            isCorrect = true;
            message = 'Benar! Ini adalah Mad Arid Lissukun yang dibaca panjang 2, 4 atau 6 harakat.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali panjang bacaannya.';
          }
          break;
          
        case 'mad-lin':
          if (answer === 'mad-lin') {
            isCorrect = true;
            message = 'Benar! Ini adalah Mad Lin yang dibaca panjang 2, 4 atau 6 harakat.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali panjang bacaannya.';
          }
          break;
          
        case 'mad-shilah':
          if (answer === 'mad-shilah') {
            isCorrect = true;
            message = 'Benar! Ini adalah Mad Shilah karena ada ha\' dhamir yang dibaca panjang.';
          } else {
            message = 'Kurang tepat. Coba periksa kembali hurufnya.';
          }
          break;
          
        default:
          message = 'Tipe soal tidak dikenali. Silahkan coba lagi.';
          console.warn('Unknown question type:', questionType);
      }
      
      // Display result message
      if (resultElement) {
        resultElement.textContent = message;
        resultElement.className = `practice-result ${isCorrect ? 'correct' : 'incorrect'}`;
      
        // Highlight the selected button
        const buttons = practiceItem.querySelectorAll('.practice-btn');
        buttons.forEach(btn => {
          btn.classList.remove('selected');
          btn.style.opacity = '0.6';
          btn.disabled = true;
        });
        this.classList.add('selected');
        this.style.opacity = '1';
      
        // Add animation to the result
        resultElement.style.animation = 'fade-in 0.5s ease-out';
      }
    });
  });
  
  // Create observer for animating elements when they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slide-up 0.5s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe lesson sections
  document.querySelectorAll('.lesson-section, .lesson-practice').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animationDelay = `${index * 0.1}s`;
    observer.observe(item);
  });
});
