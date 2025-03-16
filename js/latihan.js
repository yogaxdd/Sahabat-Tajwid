document.addEventListener('DOMContentLoaded', function() {
    // Quiz elements
    const categoryFilter = document.getElementById('categoryFilter');
    const difficultyFilter = document.getElementById('difficultyFilter');
    const startQuizBtn = document.getElementById('startQuizBtn');
    const quizContainer = document.getElementById('quizContainer');
    const quizIntro = document.getElementById('quizIntro');
    const quizContent = document.getElementById('quizContent');
    const quizResults = document.getElementById('quizResults');
    const questionContainer = document.getElementById('questionContainer');
    const prevQuestionBtn = document.getElementById('prevQuestionBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const finishQuizBtn = document.getElementById('finishQuizBtn');
    const retryQuizBtn = document.getElementById('retryQuizBtn');
    const newQuizBtn = document.getElementById('newQuizBtn');
    const progressBarFill = document.getElementById('progressBarFill');
    const currentQuestionNum = document.getElementById('currentQuestionNum');
    const totalQuestions = document.getElementById('totalQuestions');
    const correctAnswers = document.getElementById('correctAnswers');
    const totalAnswers = document.getElementById('totalAnswers');
    const scorePercentage = document.getElementById('scorePercentage');
    const resultsFeedback = document.getElementById('resultsFeedback');
    const resultsDetails = document.getElementById('resultsDetails');
    
    // Quiz state
    let currentQuizQuestions = [];
    let currentQuestionIndex = 0;
    let userAnswers = [];
    
    // Quiz questions database
    const quizQuestions = [
      // Nun/Mim Tasydid Questions
      {
        category: 'nun-atau-mim-tasydid',
        difficulty: 'easy',
        question: 'Apa hukum bacaan pada huruf nun bertasydid (نّ)?',
        arabic: 'إِنَّ',
        options: [
          'Ghunnah (dengung)', 
          'Idzhar (jelas)', 
          'Idghom (dengung halus)',
          'Iqlab (membalik)'
        ],
        correctAnswer: 0,
        explanation: 'Hukum bacaan pada nun bertasydid adalah Ghunnah, yaitu dibaca dengan dengung sepanjang 2 harakat.'
      },
      {
        category: 'nun-atau-mim-tasydid',
        difficulty: 'medium',
        question: 'Berapa panjang bacaan ghunnah pada mim bertasydid?',
        arabic: 'ثُمَّ',
        options: [
          '1 harakat', 
          '2 harakat', 
          '4 harakat',
          '6 harakat'
        ],
        correctAnswer: 1,
        explanation: 'Panjang bacaan ghunnah pada mim bertasydid adalah 2 harakat.'
      },
      {
        category: 'nun-atau-mim-tasydid',
        difficulty: 'hard',
        question: 'Manakah yang BUKAN contoh bacaan ghunnah pada nun bertasydid?',
        arabic: 'مِنْ مَالٍ',
        options: [
          'إِنَّ', 
          'الْجَنَّةِ', 
          'مِنْ مَالٍ',
          'الَّذِيْنَ'
        ],
        correctAnswer: 2,
        explanation: 'مِنْ مَالٍ bukan contoh nun bertasydid, melainkan contoh nun sukun yang bertemu dengan mim yang hukum bacaannya adalah Idghom Bighunnah.'
      },
      
      // Nun Sukun/Tanwin Questions
      {
        category: 'nun-sukun-atau-tanwin',
        difficulty: 'easy',
        question: 'Ada berapa hukum bacaan nun sukun atau tanwin?',
        arabic: 'نْ ــًــٍــٌ',
        options: [
          '3 hukum', 
          '4 hukum', 
          '5 hukum',
          '6 hukum'
        ],
        correctAnswer: 2,
        explanation: 'Hukum bacaan nun sukun atau tanwin ada 5, yaitu Idzhar, Idghom Bighunnah, Idghom Bilaghunnah, Iqlab, dan Ikhfa.'
      },
      {
        category: 'nun-sukun-atau-tanwin',
        difficulty: 'medium',
        question: 'Manakah yang merupakan contoh bacaan Iqlab?',
        arabic: '',
        options: [
          'مِنْ قَبْلِ', 
          'مِنْ بَعْدِ', 
          'اَنْفُسَهُمْ',
          'مَنْ يَقُوْلُ'
        ],
        correctAnswer: 1,
        explanation: 'مِنْ بَعْدِ adalah contoh bacaan Iqlab karena nun sukun bertemu dengan huruf ba (ب).'
      },
      {
        category: 'nun-sukun-atau-tanwin',
        difficulty: 'hard',
        question: 'Identifikasi hukum bacaan pada kata berikut: كِتَابٌ كَرِيمٌ',
        arabic: 'كِتَابٌ كَرِيمٌ',
        options: [
          'Idghom Bighunnah', 
          'Idghom Bilaghunnah', 
          'Ikhfa',
          'Idzhar'
        ],
        correctAnswer: 0,
        explanation: 'كِتَابٌ كَرِيمٌ mengandung tanwin dhommah yang bertemu dengan huruf kaf (ك), sehingga hukum bacaannya adalah Idghom Bighunnah karena kaf termasuk huruf Idghom Bighunnah (ينمو).'
      },
      
      // Idzhar Wajib Questions
      {
        category: 'idzhar-wajib',
        difficulty: 'easy',
        question: 'Idzhar Wajib terjadi ketika nun sukun atau tanwin bertemu dengan huruf apa?',
        arabic: '',
        options: [
          'ب', 
          'و، ي', 
          'ء، ه، ع، ح، غ، خ',
          'ت، ث، ج، د، ذ، ز، س، ش، ص، ض، ط، ظ، ف، ق، ك'
        ],
        correctAnswer: 2,
        explanation: 'Idzhar Wajib terjadi ketika nun sukun atau tanwin bertemu dengan huruf halqi (tenggorokan) yaitu: ء، ه، ع، ح، غ، خ.'
      },
      {
        category: 'idzhar-wajib',
        difficulty: 'medium',
        question: 'Bagaimana cara membaca Idzhar Wajib?',
        arabic: 'مِنْ خَيْرٍ',
        options: [
          'Dengan dengung', 
          'Dengan jelas tanpa dengung', 
          'Dengan samar-samar',
          'Dengan membalikkan bunyi nun menjadi mim'
        ],
        correctAnswer: 1,
        explanation: 'Idzhar Wajib dibaca dengan jelas tanpa dengung, sehingga bunyi nun sukun atau tanwin tetap terdengar dengan jelas.'
      },
      {
        category: 'idzhar-wajib',
        difficulty: 'hard',
        question: 'Manakah yang BUKAN merupakan contoh bacaan Idzhar Wajib?',
        arabic: '',
        options: [
          'مَنْ ءَامَنَ', 
          'مِنْ خَيْرٍ', 
          'مِنْ عِلْمٍ',
          'اَنْتَ'
        ],
        correctAnswer: 3,
        explanation: 'اَنْتَ bukan contoh Idzhar Wajib karena nun sukun bertemu dengan huruf ta (ت), yang merupakan contoh bacaan Ikhfa.'
      },
      
      // Idghom Questions
      {
        category: 'idghom',
        difficulty: 'easy',
        question: 'Idghom Bighunnah terjadi ketika nun sukun atau tanwin bertemu dengan huruf apa?',
        arabic: '',
        options: [
          'ي ن م و', 
          'ل ر', 
          'ب',
          'ء ه ع ح غ خ'
        ],
        correctAnswer: 0,
        explanation: 'Idghom Bighunnah terjadi ketika nun sukun atau tanwin bertemu dengan salah satu huruf ي ن م و.'
      },
      {
        category: 'idghom',
        difficulty: 'medium',
        question: 'Apa perbedaan utama antara Idghom Bighunnah dan Idghom Bilaghunnah?',
        arabic: '',
        options: [
          'Idghom Bighunnah dibaca panjang, sedangkan Idghom Bilaghunnah dibaca pendek', 
          'Idghom Bighunnah dibaca dengan dengung, sedangkan Idghom Bilaghunnah dibaca tanpa dengung', 
          'Idghom Bighunnah memiliki 4 huruf, sedangkan Idghom Bilaghunnah memiliki 2 huruf',
          'Semua jawaban benar'
        ],
        correctAnswer: 3,
        explanation: 'Semua jawaban benar. Idghom Bighunnah dibaca dengan dengung (4 huruf: ي ن م و), sedangkan Idghom Bilaghunnah dibaca tanpa dengung (2 huruf: ل ر).'
      },
      {
        category: 'idghom',
        difficulty: 'hard',
        question: 'Identifikasi hukum bacaan pada kata: فَمَنْ يَّعْمَلْ',
        arabic: 'فَمَنْ يَّعْمَلْ',
        options: [
          'Idzhar', 
          'Ikhfa', 
          'Idghom Bighunnah',
          'Idghom Bilaghunnah'
        ],
        correctAnswer: 2,
        explanation: 'فَمَنْ يَّعْمَلْ mengandung bacaan Idghom Bighunnah karena nun sukun bertemu dengan huruf ya (ي) yang merupakan salah satu huruf Idghom Bighunnah.'
      },
      
      // Mim Sukun Questions
      {
        category: 'mim-sukun',
        difficulty: 'easy',
        question: 'Ada berapa hukum bacaan mim sukun?',
        arabic: 'مْ',
        options: [
          '2 hukum', 
          '3 hukum', 
          '4 hukum',
          '5 hukum'
        ],
        correctAnswer: 1,
        explanation: 'Hukum bacaan mim sukun ada 3, yaitu Idzhar Syafawi, Ikhfa Syafawi, dan Idghom Mimi.'
      },
      {
        category: 'mim-sukun',
        difficulty: 'medium',
        question: 'Kapan terjadi Ikhfa Syafawi?',
        arabic: '',
        options: [
          'Ketika mim sukun bertemu dengan huruf mim (م)', 
          'Ketika mim sukun bertemu dengan huruf ba (ب)', 
          'Ketika mim sukun bertemu dengan selain huruf mim dan ba',
          'Ketika mim sukun bertemu dengan huruf waw (و)'
        ],
        correctAnswer: 1,
        explanation: 'Ikhfa Syafawi terjadi ketika mim sukun bertemu dengan huruf ba (ب), dibaca dengan menyamarkan bunyi mim disertai dengung.'
      },
      {
        category: 'mim-sukun',
        difficulty: 'hard',
        question: 'Identifikasi hukum bacaan pada kata: هُمْ فِيْهَا',
        arabic: 'هُمْ فِيْهَا',
        options: [
          'Idghom Mimi', 
          'Ikhfa Syafawi', 
          'Idzhar Syafawi',
          'Tidak ada hukum mim sukun'
        ],
        correctAnswer: 2,
        explanation: 'هُمْ فِيْهَا mengandung bacaan Idzhar Syafawi karena mim sukun bertemu dengan huruf fa (ف) yang bukan termasuk huruf mim atau ba.'
      },
      
      // Qolqolah Questions
      {
        category: 'qolqolah',
        difficulty: 'easy',
        question: 'Apa yang dimaksud dengan Qolqolah?',
        arabic: 'ق ط ب ج د',
        options: [
          'Memantulkan suara', 
          'Menyamarkan suara', 
          'Melebur suara',
          'Memperjelas suara'
        ],
        correctAnswer: 0,
        explanation: 'Qolqolah adalah hukum bacaan yang membaca huruf dengan memantulkan suara apabila huruf tersebut berbaris sukun (mati) atau waqaf.'
      },
      {
        category: 'qolqolah',
        difficulty: 'medium',
        question: 'Ada berapa tingkatan Qolqolah?',
        arabic: '',
        options: [
          '1 tingkatan', 
          '2 tingkatan', 
          '3 tingkatan',
          '5 tingkatan'
        ],
        correctAnswer: 1,
        explanation: 'Qolqolah memiliki 2 tingkatan, yaitu Qolqolah Sughra (kecil) dan Qolqolah Kubra (besar).'
      },
      {
        category: 'qolqolah',
        difficulty: 'hard',
        question: 'Manakah yang merupakan contoh Qolqolah Kubra?',
        arabic: '',
        options: [
          'اَبْتَرُ', 
          'يَقْطَعُونَ', 
          'مَجْنُونٍ',
          'وَتَبَّ'
        ],
        correctAnswer: 3,
        explanation: 'وَتَبَّ adalah contoh Qolqolah Kubra karena huruf Qolqolah (ba) berada di akhir kata dan dibaca waqaf.'
      },
      
      // Lam Ta'rif Questions
      {
        category: 'lam-tarif',
        difficulty: 'easy',
        question: 'Apa yang dimaksud dengan Lam Ta\'rif?',
        arabic: 'ال',
        options: [
          'Huruf lam yang terletak di tengah kata', 
          'Huruf lam yang terletak di awal kata sebagai kata sandang', 
          'Huruf lam pada lafadz Allah',
          'Huruf lam yang terletak di akhir kata'
        ],
        correctAnswer: 1,
        explanation: 'Lam Ta\'rif adalah huruf lam yang terletak di awal kata sebagai kata sandang (alif lam) atau "ال" yang berfungsi seperti "the" dalam bahasa Inggris.'
      },
      {
        category: 'lam-tarif',
        difficulty: 'medium',
        question: 'Bagaimana cara membaca Lam Ta\'rif Qamariyah?',
        arabic: 'الْقَمَرُ',
        options: [
          'Lam dibaca jelas', 
          'Lam dilebur dengan huruf berikutnya', 
          'Lam dibaca dengan suara memantul',
          'Lam dibaca samar-samar'
        ],
        correctAnswer: 0,
        explanation: 'Lam Ta\'rif Qamariyah dibaca dengan jelas, sehingga bunyi lam tetap terdengar.'
      },
      {
        category: 'lam-tarif',
        difficulty: 'hard',
        question: 'Manakah yang merupakan contoh Lam Ta\'rif Syamsiyah?',
        arabic: '',
        options: [
          'اَلْقَمَرُ', 
          'اَلْعَالَمِيْنَ', 
          'اَلشَّمْسُ',
          'اَلْكِتَابُ'
        ],
        correctAnswer: 2,
        explanation: 'اَلشَّمْسُ (Asy-Syamsu) adalah contoh Lam Ta\'rif Syamsiyah karena lam ta\'rif bertemu dengan huruf syamsiyah (syin) sehingga lam dilebur dan huruf syamsiyah dibaca bertasydid.'
      },
      
      // Lam Jalalah Questions
      {
        category: 'lam-jalalah',
        difficulty: 'easy',
        question: 'Apa yang dimaksud dengan Lam Jalalah?',
        arabic: 'الله',
        options: [
          'Cara membaca huruf lam pada lafadz Allah', 
          'Cara membaca huruf lam pada akhir ayat', 
          'Cara membaca huruf lam di tengah kata',
          'Cara membaca huruf lam pada kata sandang'
        ],
        correctAnswer: 0,
        explanation: 'Lam Jalalah adalah cara membaca huruf lam pada lafadz Allah (الله).'
      },
      {
        category: 'lam-jalalah',
        difficulty: 'medium',
        question: 'Kapan Lam Jalalah dibaca Tafkhim (tebal)?',
        arabic: '',
        options: [
          'Ketika lafadz Allah didahului oleh huruf berharakat fathah atau dhammah', 
          'Ketika lafadz Allah didahului oleh huruf berharakat kasrah', 
          'Ketika lafadz Allah berada di akhir ayat',
          'Ketika lafadz Allah berada di awal ayat'
        ],
        correctAnswer: 0,
        explanation: 'Lam Jalalah dibaca Tafkhim (tebal) ketika lafadz Allah didahului oleh huruf berharakat fathah atau dhammah.'
      },
      {
        category: 'lam-jalalah',
        difficulty: 'hard',
        question: 'Identifikasi jenis Lam Jalalah pada bacaan: بِسْمِ اللهِ',
        arabic: 'بِسْمِ اللهِ',
        options: [
          'Lam Jalalah Tafkhim', 
          'Lam Jalalah Tarqiq', 
          'Lam Ta\'rif Qamariyah',
          'Lam Ta\'rif Syamsiyah'
        ],
        correctAnswer: 1,
        explanation: 'بِسْمِ اللهِ mengandung Lam Jalalah Tarqiq karena lafadz Allah didahului oleh huruf yang berharakat kasrah (ـِ).'
      },
      
      // Mad Questions
      {
        category: 'mad',
        difficulty: 'easy',
        question: 'Apa yang dimaksud dengan Mad?',
        arabic: 'ا و ي',
        options: [
          'Memendekkan bacaan huruf', 
          'Melebur bacaan huruf', 
          'Memanjangkan bacaan huruf',
          'Menyamarkan bacaan huruf'
        ],
        correctAnswer: 2,
        explanation: 'Mad adalah memanjangkan bacaan huruf tertentu sesuai dengan kaidah-kaidah tajwid.'
      },
      {
        category: 'mad',
        difficulty: 'medium',
        question: 'Berapa harakat panjang bacaan Mad Thabi\'i?',
        arabic: 'قَالَ',
        options: [
          '1 harakat', 
          '2 harakat', 
          '4-5 harakat',
          '6 harakat'
        ],
        correctAnswer: 1,
        explanation: 'Mad Thabi\'i dibaca panjang 2 harakat (1 alif).'
      },
      {
        category: 'mad',
        difficulty: 'hard',
        question: 'Manakah yang merupakan contoh Mad Wajib Muttasil?',
        arabic: '',
        options: [
          'فِي أَنْفُسِهِمْ', 
          'قَالُوا', 
          'جَاءَ',
          'يَا أَيُّهَا'
        ],
        correctAnswer: 2,
        explanation: 'جَاءَ adalah contoh Mad Wajib Muttasil karena ada huruf mad (alif) yang bertemu dengan hamzah dalam satu kata.'
      }
    ];
    
    // Shuffle array function
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    
    // Generate quiz questions based on filters
    function generateQuiz() {
      const selectedCategory = categoryFilter.value;
      const selectedDifficulty = difficultyFilter.value;
      
      // Filter questions based on selected category and difficulty
      let filteredQuestions = quizQuestions.filter(question => {
        if (selectedCategory !== 'all' && question.category !== selectedCategory) {
          return false;
        }
        if (selectedDifficulty !== 'all' && question.difficulty !== selectedDifficulty) {
          return false;
        }
        return true;
      });
      
      // If no questions match the filters, use all questions
      if (filteredQuestions.length === 0) {
        filteredQuestions = quizQuestions.slice();
      }
      
      // Shuffle and select at most 10 questions
      filteredQuestions = shuffleArray(filteredQuestions);
      currentQuizQuestions = filteredQuestions.slice(0, 10);
      
      // Shuffle options for each question
      currentQuizQuestions.forEach(question => {
        // Create an array of option objects with original index and value
        const options = question.options.map((option, index) => ({
          originalIndex: index,
          value: option
        }));
        
        // Shuffle the options
        const shuffledOptions = shuffleArray(options);
        
        // Update the question object with shuffled options and update correctAnswer
        question.options = shuffledOptions.map(option => option.value);
        
        // Find the new index of the correct answer
        question.correctAnswer = shuffledOptions.findIndex(
          option => option.originalIndex === question.correctAnswer
        );
      });
      
      return currentQuizQuestions;
    }
    
    // Initialize a new quiz
    function initQuiz() {
      const questions = generateQuiz();
      
      // Reset quiz state
      currentQuestionIndex = 0;
      userAnswers = Array(questions.length).fill(null);
      
      // Clear previous questions
      questionContainer.innerHTML = '';
      
      // Create HTML for each question
      questions.forEach((questionData, index) => {
        const questionEl = document.createElement('div');
        questionEl.className = 'question';
        if (index === 0) {
          questionEl.classList.add('active');
        }
        
        let optionsHTML = '';
        questionData.options.forEach((option, optIndex) => {
          optionsHTML += `
            <li class="option-item">
              <button class="option-button" data-index="${optIndex}">
                <span class="option-indicator">${String.fromCharCode(65 + optIndex)}</span>
                ${option}
              </button>
            </li>
          `;
        });
        
        let arabicHTML = '';
        if (questionData.arabic) {
          arabicHTML = `<div class="question-arabic">${questionData.arabic}</div>`;
        }
        
        questionEl.innerHTML = `
          <div class="question-header">
            <div class="question-number">Soal ${index + 1}</div>
            <div class="question-text">${questionData.question}</div>
          </div>
          ${arabicHTML}
          <ul class="options-list">
            ${optionsHTML}
          </ul>
          <div class="feedback-message"></div>
        `;
        
        questionContainer.appendChild(questionEl);
      });
      
      // Update UI
      currentQuestionNum.textContent = '1';
      totalQuestions.textContent = questions.length;
      progressBarFill.style.width = `${(1 / questions.length) * 100}%`;
      
      // Set up event listeners for option buttons
      setupOptionListeners();
      
      // Show quiz content, hide intro and results
      quizIntro.classList.remove('active');
      quizContent.classList.add('active');
      quizResults.classList.remove('active');
      
      // Disable prev button at start, enable next button
      prevQuestionBtn.disabled = true;
      nextQuestionBtn.disabled = true;
      
      // Show Finish button if only one question
      if (questions.length === 1) {
        nextQuestionBtn.style.display = 'none';
        finishQuizBtn.style.display = 'inline-flex';
        finishQuizBtn.disabled = true;
      } else {
        nextQuestionBtn.style.display = 'inline-flex';
        finishQuizBtn.style.display = 'none';
      }
    }
    
    // Set up event listeners for option buttons
    function setupOptionListeners() {
      const allOptionButtons = questionContainer.querySelectorAll('.option-button');
      
      allOptionButtons.forEach(button => {
        button.addEventListener('click', function() {
          const questionEl = this.closest('.question');
          const questionIndex = Array.from(questionContainer.children).indexOf(questionEl);
          const selectedOptionIndex = parseInt(this.getAttribute('data-index'), 10);
          
          // Remove selected class from all options in this question
          questionEl.querySelectorAll('.option-button').forEach(btn => {
            btn.classList.remove('selected');
          });
          
          // Add selected class to clicked option
          this.classList.add('selected');
          
          // Update user answer
          userAnswers[questionIndex] = selectedOptionIndex;
          
          // Enable next or finish button
          if (questionIndex === currentQuizQuestions.length - 1) {
            finishQuizBtn.disabled = false;
          } else {
            nextQuestionBtn.disabled = false;
          }
        });
      });
    }
    
    // Navigate to next question
    function nextQuestion() {
      if (currentQuestionIndex < currentQuizQuestions.length - 1) {
        // Hide current question
        questionContainer.children[currentQuestionIndex].classList.remove('active');
        
        // Show next question
        currentQuestionIndex++;
        questionContainer.children[currentQuestionIndex].classList.add('active');
        
        // Update UI
        currentQuestionNum.textContent = (currentQuestionIndex + 1).toString();
        progressBarFill.style.width = `${((currentQuestionIndex + 1) / currentQuizQuestions.length) * 100}%`;
        
        // Enable/disable buttons
        prevQuestionBtn.disabled = false;
        nextQuestionBtn.disabled = userAnswers[currentQuestionIndex] === null;
        
        // Show finish button on last question
        if (currentQuestionIndex === currentQuizQuestions.length - 1) {
          nextQuestionBtn.style.display = 'none';
          finishQuizBtn.style.display = 'inline-flex';
          finishQuizBtn.disabled = userAnswers[currentQuestionIndex] === null;
        }
      }
    }
    
    // Navigate to previous question
    function prevQuestion() {
      if (currentQuestionIndex > 0) {
        // Hide current question
        questionContainer.children[currentQuestionIndex].classList.remove('active');
        
        // Show previous question
        currentQuestionIndex--;
        questionContainer.children[currentQuestionIndex].classList.add('active');
        
        // Update UI
        currentQuestionNum.textContent = (currentQuestionIndex + 1).toString();
        progressBarFill.style.width = `${((currentQuestionIndex + 1) / currentQuizQuestions.length) * 100}%`;
        
        // Enable/disable buttons
        prevQuestionBtn.disabled = currentQuestionIndex === 0;
        nextQuestionBtn.disabled = false;
        
        // Hide finish button if not on last question
        if (currentQuestionIndex < currentQuizQuestions.length - 1) {
          nextQuestionBtn.style.display = 'inline-flex';
          finishQuizBtn.style.display = 'none';
        }
      }
    }
    
    // Finish quiz and show results
    function finishQuiz() {
      // Calculate score
      const score = userAnswers.reduce((total, answer, index) => {
        return answer === currentQuizQuestions[index].correctAnswer ? total + 1 : total;
      }, 0);
      
      // Update results UI
      correctAnswers.textContent = score.toString();
      totalAnswers.textContent = currentQuizQuestions.length.toString();
      
      const percentage = Math.round((score / currentQuizQuestions.length) * 100);
      scorePercentage.textContent = `${percentage}%`;
      
      // Generate feedback message
      let feedbackText = '';
      if (percentage >= 90) {
        feedbackText = 'Alhamdulillah! Pemahaman tajwid Anda sangat baik. Teruslah mengasah dan mengamalkannya dalam membaca Al-Qur\'an.';
      } else if (percentage >= 70) {
        feedbackText = 'Alhamdulillah, Anda memiliki pemahaman tajwid yang baik. Teruslah berlatih untuk meningkatkan kemampuan Anda.';
      } else if (percentage >= 50) {
        feedbackText = 'Alhamdulillah, Anda sudah cukup memahami kaidah tajwid, tetapi masih perlu lebih banyak berlatih.';
      } else {
        feedbackText = 'Jangan menyerah! Tajwid membutuhkan latihan yang konsisten. Silakan pelajari kembali materi dan coba lagi.';
      }
      resultsFeedback.textContent = feedbackText;
      
      // Generate details for each question
      resultsDetails.innerHTML = '';
      
      currentQuizQuestions.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.correctAnswer;
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${isCorrect ? 'correct' : 'incorrect'}`;
        
        let userAnswerText = userAnswers[index] !== null 
          ? question.options[userAnswers[index]] 
          : 'Tidak dijawab';
        
        let correctAnswerText = question.options[question.correctAnswer];
        
        resultItem.innerHTML = `
          <div class="result-question">
            <span>${index + 1}. ${question.question}</span>
            ${question.arabic ? `<div class="question-arabic">${question.arabic}</div>` : ''}
          </div>
          <div class="result-answer">
            <span>
              ${isCorrect 
                ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>`
                : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>`
              }
              Jawaban Anda: ${userAnswerText}
            </span>
            ${!isCorrect 
              ? `<span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                  Jawaban Benar: ${correctAnswerText}
                </span>` 
              : ''
            }
          </div>
          <div class="result-explanation">
            ${question.explanation}
          </div>
        `;
        
        resultsDetails.appendChild(resultItem);
      });
      
      // Show results, hide content
      quizContent.classList.remove('active');
      quizResults.classList.add('active');
    }
    
    // Start Quiz button click handler
    startQuizBtn.addEventListener('click', initQuiz);
    
    // Next Question button click handler
    nextQuestionBtn.addEventListener('click', nextQuestion);
    
    // Previous Question button click handler
    prevQuestionBtn.addEventListener('click', prevQuestion);
    
    // Finish Quiz button click handler
    finishQuizBtn.addEventListener('click', finishQuiz);
    
    // Retry Quiz button click handler
    retryQuizBtn.addEventListener('click', function() {
      // Reset answers but keep the same questions
      currentQuestionIndex = 0;
      userAnswers = Array(currentQuizQuestions.length).fill(null);
      
      // Reset UI
      questionContainer.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('selected', 'correct', 'incorrect');
      });
      
      questionContainer.querySelectorAll('.feedback-message').forEach(feedback => {
        feedback.textContent = '';
        feedback.classList.remove('visible', 'feedback-correct', 'feedback-incorrect');
      });
      
      // Show first question, hide others
      const questions = questionContainer.querySelectorAll('.question');
      questions.forEach((question, index) => {
        if (index === 0) {
          question.classList.add('active');
        } else {
          question.classList.remove('active');
        }
      });
      
      // Update UI
      currentQuestionNum.textContent = '1';
      progressBarFill.style.width = `${(1 / currentQuizQuestions.length) * 100}%`;
      
      // Reset buttons
      prevQuestionBtn.disabled = true;
      nextQuestionBtn.disabled = true;
      nextQuestionBtn.style.display = 'inline-flex';
      finishQuizBtn.style.display = 'none';
      
      // Show last question? Show finish button
      if (currentQuizQuestions.length === 1) {
        nextQuestionBtn.style.display = 'none';
        finishQuizBtn.style.display = 'inline-flex';
        finishQuizBtn.disabled = true;
      }
      
      // Show quiz content, hide results
      quizContent.classList.add('active');
      quizResults.classList.remove('active');
    });
    
    newQuizBtn.addEventListener('click', function() {
      quizResults.classList.remove('active');
      quizIntro.classList.add('active');
    });
    
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
    
    document.querySelectorAll('.latihan-controls, .quiz-container, .about-card').forEach((item) => {
      item.style.opacity = '0';
      observer.observe(item);
    });
  });
  