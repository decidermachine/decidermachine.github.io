// ============================
// DECIDER MACHINE - MAIN APPLICATION
// decidermachine.online
// ============================

// --- DOM Elements ---
const wheelCanvas = document.getElementById('wheelCanvas');
const ctx = wheelCanvas?.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const wheelInput = document.getElementById('wheelInput');
const addOptionBtn = document.getElementById('addOptionBtn');
const optionsList = document.getElementById('optionsList');
const clearWheelBtn = document.getElementById('clearWheelBtn');
const shuffleWheelBtn = document.getElementById('shuffleWheelBtn');
const wheelResult = document.getElementById('wheelResult');
const wheelResultText = document.getElementById('wheelResultText');

// --- Wheel Variables ---
let wheelOptions = [];
let wheelColors = [];
let currentRotation = 0;
let isSpinning = false;
let spinTimeout = null;

// Color palette for wheel segments
const colorPalette = [
  '#FF4D6D', '#FF6B6B', '#FF8E8E', '#FFA0A0', '#FFB3B3',
  '#7B2FBE', '#9B5DE5', '#B774FF', '#D291FF', '#E2B4FF',
  '#06D6A0', '#48E5B0', '#7DF0C4', '#A3F5D6', '#C4F9E5',
  '#FFD60A', '#FFE066', '#FFED99', '#FFF4C4', '#FFF9E5',
  '#118AB2', '#2FA7D4', '#59C1E8', '#85D4F2', '#ADE5FF'
];

// --- Initialize Wheel ---
function initWheel() {
  if (!ctx || !wheelCanvas) return;
  const size = wheelCanvas.width;
  wheelCanvas.width = size;
  wheelCanvas.height = size;
  drawWheel();
}

function drawWheel() {
  if (!ctx || !wheelCanvas) return;
  const size = wheelCanvas.width;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2;
  
  if (wheelOptions.length === 0) {
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = '#1E1E3A';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#9898BB';
    ctx.font = 'bold 14px "Nunito", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Add Options', centerX, centerY);
    return;
  }
  
  const angleStep = (2 * Math.PI) / wheelOptions.length;
  
  for (let i = 0; i < wheelOptions.length; i++) {
    const startAngle = i * angleStep + currentRotation;
    const endAngle = (i + 1) * angleStep + currentRotation;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.fillStyle = wheelColors[i % wheelColors.length];
    ctx.fill();
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + angleStep / 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const textRadius = radius * 0.7;
    ctx.font = `bold ${Math.max(10, Math.min(16, 200 / wheelOptions.length))}px "Nunito", sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    let text = wheelOptions[i];
    if (text.length > 20) text = text.slice(0, 18) + '...';
    ctx.fillText(text, textRadius, 5);
    ctx.restore();
  }
  
  // Draw inner circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.12, 0, 2 * Math.PI);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.08, 0, 2 * Math.PI);
  ctx.fillStyle = '#FF4D6D';
  ctx.fill();
}

function renderOptionsList() {
  if (!optionsList) return;
  if (wheelOptions.length === 0) {
    optionsList.innerHTML = '<div style="text-align:center;color:#9898BB;padding:20px;">No options yet.<br>Add some above!</div>';
    return;
  }
  
  optionsList.innerHTML = '';
  wheelOptions.forEach((opt, idx) => {
    const li = document.createElement('li');
    li.className = 'option-item';
    li.innerHTML = `
      <div class="option-color" style="background:${wheelColors[idx % wheelColors.length]}"></div>
      <div class="option-name">${escapeHtml(opt)}</div>
      <button class="option-del" data-index="${idx}">🗑️</button>
    `;
    optionsList.appendChild(li);
  });
  
  document.querySelectorAll('.option-del').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.dataset.index);
      if (!isNaN(idx)) {
        wheelOptions.splice(idx, 1);
        if (wheelColors.length > wheelOptions.length) {
          wheelColors.pop();
        }
        renderOptionsList();
        drawWheel();
        hideWheelResult();
      }
    });
  });
}

function addWheelOption() {
  if (!wheelInput) return;
  let val = wheelInput.value.trim();
  if (!val) {
    alert('Please enter an option!');
    return;
  }
  if (val.length > 40) val = val.slice(0, 40);
  wheelOptions.push(val);
  wheelColors.push(colorPalette[wheelColors.length % colorPalette.length]);
  wheelInput.value = '';
  renderOptionsList();
  drawWheel();
  hideWheelResult();
}

function clearWheelOptions() {
  if (wheelOptions.length > 0 && confirm('Clear all options?')) {
    wheelOptions = [];
    wheelColors = [];
    renderOptionsList();
    drawWheel();
    hideWheelResult();
  }
}

function shuffleWheelOptions() {
  if (wheelOptions.length < 2) return;
  for (let i = wheelOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [wheelOptions[i], wheelOptions[j]] = [wheelOptions[j], wheelOptions[i]];
    [wheelColors[i], wheelColors[j]] = [wheelColors[j], wheelColors[i]];
  }
  renderOptionsList();
  drawWheel();
  hideWheelResult();
}

function spinWheel() {
  if (isSpinning || wheelOptions.length === 0) {
    if (wheelOptions.length === 0) alert('Please add some options first!');
    return;
  }
  
  isSpinning = true;
  spinBtn.disabled = true;
  spinBtn.textContent = '🌀 SPINNING...';
  
  const spins = 10 + Math.random() * 10;
  const spinAngle = (Math.random() * 2 * Math.PI) + (spins * 2 * Math.PI);
  const startRotation = currentRotation;
  const targetRotation = startRotation + spinAngle;
  const duration = 2000;
  const startTime = performance.now();
  
  function animateSpin(now) {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / duration);
    const easeOut = 1 - Math.pow(1 - t, 3);
    currentRotation = startRotation + (targetRotation - startRotation) * easeOut;
    drawWheel();
    
    if (t < 1) {
      requestAnimationFrame(animateSpin);
    } else {
      currentRotation = targetRotation % (2 * Math.PI);
      drawWheel();
      
      // Determine winner
      const angleStep = (2 * Math.PI) / wheelOptions.length;
      let pointerAngle = (3 * Math.PI / 2) % (2 * Math.PI);
      let winnerIndex = -1;
      
      for (let i = 0; i < wheelOptions.length; i++) {
        const start = (i * angleStep + currentRotation) % (2 * Math.PI);
        const end = ((i + 1) * angleStep + currentRotation) % (2 * Math.PI);
        if (start < end) {
          if (pointerAngle >= start && pointerAngle < end) {
            winnerIndex = i;
            break;
          }
        } else {
          if (pointerAngle >= start || pointerAngle < end) {
            winnerIndex = i;
            break;
          }
        }
      }
      
      if (winnerIndex === -1) winnerIndex = 0;
      const winner = wheelOptions[winnerIndex];
      
      wheelResultText.textContent = winner;
      wheelResult.classList.remove('hidden');
      showConfetti();
      
      isSpinning = false;
      spinBtn.disabled = false;
      spinBtn.textContent = '🎡 SPIN!';
    }
  }
  
  requestAnimationFrame(animateSpin);
}

function hideWheelResult() {
  if (wheelResult) wheelResult.classList.add('hidden');
}

// --- Yes/No Oracle ---
const oracleOrb = document.getElementById('oracleOrb');
const orbText = document.getElementById('orbText');
const questionInput = document.getElementById('questionInput');
const askOracleBtn = document.getElementById('askOracleBtn');
const yesnoResult = document.getElementById('yesnoResult');
const yesnoAnswer = document.getElementById('yesnoAnswer');
const yesnoMsg = document.getElementById('yesnoMsg');
const quickYes = document.getElementById('quickYes');
const quickNo = document.getElementById('quickNo');

const yesNoAnswers = [
  { text: 'YES', type: 'yes', message: 'Absolutely! The universe says yes! ✨' },
  { text: 'YES', type: 'yes', message: 'Without a doubt! Go for it! 🚀' },
  { text: 'YES', type: 'yes', message: 'Most definitely! Great choice! 💫' },
  { text: 'YES', type: 'yes', message: 'Signs point to YES! 👍' },
  { text: 'NO', type: 'no', message: 'Not this time. Trust your gut. ❤️' },
  { text: 'NO', type: 'no', message: 'Probably not. Better to wait. ⏳' },
  { text: 'NO', type: 'no', message: 'The answer is no. Something better awaits! 🌟' },
  { text: 'NO', type: 'no', message: 'Not advisable right now. ✋' },
  { text: 'MAYBE', type: 'maybe', message: 'Ask again later... the stars are uncertain. 🌙' },
  { text: 'MAYBE', type: 'maybe', message: 'Concentrate and ask again. 🧘' },
  { text: 'MAYBE', type: 'maybe', message: 'Cannot predict now. Take a breath. 💨' }
];

function askOracle() {
  let question = questionInput?.value.trim();
  if (!question) {
    question = 'Should I make a decision?';
    if (questionInput) questionInput.value = question;
  }
  
  if (oracleOrb) {
    oracleOrb.classList.add('asking');
    setTimeout(() => oracleOrb.classList.remove('asking'), 500);
  }
  
  orbText.textContent = '~ thinking ~';
  
  setTimeout(() => {
    const answer = yesNoAnswers[Math.floor(Math.random() * yesNoAnswers.length)];
    if (yesnoAnswer) {
      yesnoAnswer.textContent = answer.text;
      yesnoAnswer.className = `yesno-answer ${answer.type}`;
    }
    if (yesnoMsg) yesnoMsg.textContent = answer.message;
    if (yesnoResult) yesnoResult.classList.remove('hidden');
    if (orbText) orbText.textContent = 'Ask Me\nAnything';
    
    if (oracleOrb) {
      oracleOrb.classList.remove('yes-glow', 'no-glow');
      if (answer.type === 'yes') oracleOrb.classList.add('yes-glow');
      else if (answer.type === 'no') oracleOrb.classList.add('no-glow');
      setTimeout(() => {
        oracleOrb.classList.remove('yes-glow', 'no-glow');
      }, 1500);
    }
    
    showConfetti();
  }, 400);
}

function quickOracle(answer) {
  if (questionInput) questionInput.value = answer === 'yes' ? 'Should I choose YES?' : 'Should I choose NO?';
  askOracle();
}

// --- Dice Roller ---
const diceDisplay = document.getElementById('diceDisplay');
const rollDiceBtn = document.getElementById('rollDiceBtn');
const diceTotal = document.getElementById('diceTotal');
let diceCount = 1;
let diceSides = 6;

function updateDiceUI() {
  if (!diceDisplay) return;
  diceDisplay.innerHTML = '';
  for (let i = 0; i < diceCount; i++) {
    const die = document.createElement('div');
    die.className = 'die';
    die.innerHTML = '<span>?</span>';
    diceDisplay.appendChild(die);
  }
}

function rollDice() {
  const results = [];
  for (let i = 0; i < diceCount; i++) {
    results.push(Math.floor(Math.random() * diceSides) + 1);
  }
  
  const diceElements = diceDisplay.querySelectorAll('.die');
  let total = 0;
  
  results.forEach((result, idx) => {
    total += result;
    if (diceElements[idx]) {
      diceElements[idx].classList.add('rolling');
      setTimeout(() => {
        diceElements[idx].querySelector('span').textContent = result;
        diceElements[idx].classList.remove('rolling');
      }, idx * 50);
    }
  });
  
  if (diceTotal) {
    if (diceCount === 1) {
      diceTotal.textContent = `You rolled a ${results[0]}! 🎲`;
    } else {
      diceTotal.textContent = `Total: ${total} (${results.join(' + ')}) 🎲`;
    }
  }
  showConfetti();
}

// --- Coin Flip ---
const coinEl = document.getElementById('coinEl');
const headsLabel = document.getElementById('headsLabel');
const tailsLabel = document.getElementById('tailsLabel');
const flipCoinBtn = document.getElementById('flipCoinBtn');
const coinResultDiv = document.getElementById('coinResult');
const coinResultText = document.getElementById('coinResultText');
const coinStreak = document.getElementById('coinStreak');
const coinHistory = document.getElementById('coinHistory');

let coinStreakCount = 0;
let lastFlip = null;
let coinHistoryList = [];

function flipCoin() {
  if (!coinEl) return;
  const isHeads = Math.random() < 0.5;
  const result = isHeads ? (headsLabel?.value || 'Heads') : (tailsLabel?.value || 'Tails');
  const resultType = isHeads ? 'Heads' : 'Tails';
  
  coinEl.classList.add('flipping');
  
  setTimeout(() => {
    if (isHeads) {
      coinEl.classList.remove('tails-up');
      coinEl.classList.add('heads-up');
    } else {
      coinEl.classList.remove('heads-up');
      coinEl.classList.add('tails-up');
    }
    coinEl.classList.remove('flipping');
    
    if (coinResultText) coinResultText.textContent = result;
    if (coinResultDiv) coinResultDiv.classList.remove('hidden');
    
    if (lastFlip === resultType) {
      coinStreakCount++;
    } else {
      coinStreakCount = 1;
    }
    lastFlip = resultType;
    
    if (coinStreak) {
      if (coinStreakCount > 1) {
        coinStreak.textContent = `${coinStreakCount}x ${resultType} streak! 🔥`;
      } else {
        coinStreak.textContent = '';
      }
    }
    
    coinHistoryList.unshift(resultType === 'Heads' ? 'H' : 'T');
    if (coinHistoryList.length > 10) coinHistoryList.pop();
    if (coinHistory) {
      coinHistory.innerHTML = coinHistoryList.map(h => 
        `<span class="coin-hist-item">${h}</span>`
      ).join('');
    }
    
    showConfetti();
  }, 600);
}

// --- List Picker ---
const listTextarea = document.getElementById('listTextarea');
const removePicked = document.getElementById('removePicked');
const pickMultiple = document.getElementById('pickMultiple');
const pickCount = document.getElementById('pickCount');
const pickFromListBtn = document.getElementById('pickFromListBtn');
const listResultDiv = document.getElementById('listResult');
const listResultValue = document.getElementById('listResultValue');

function pickFromList() {
  if (!listTextarea) return;
  let items = listTextarea.value.split('\n').filter(item => item.trim().length > 0);
  if (items.length === 0) {
    alert('Please enter some options (one per line)!');
    return;
  }
  
  let picks = [];
  let tempItems = [...items];
  
  const multiple = pickMultiple?.checked || false;
  let count = parseInt(pickCount?.value) || 1;
  if (count < 1) count = 1;
  if (count > tempItems.length && !multiple) count = 1;
  
  if (multiple) {
    for (let i = 0; i < Math.min(count, tempItems.length); i++) {
      const idx = Math.floor(Math.random() * tempItems.length);
      picks.push(tempItems[idx]);
      if (removePicked?.checked) {
        tempItems.splice(idx, 1);
      }
    }
  } else {
    const idx = Math.floor(Math.random() * tempItems.length);
    picks.push(tempItems[idx]);
    if (removePicked?.checked) {
      tempItems.splice(idx, 1);
    }
  }
  
  if (removePicked?.checked) {
    listTextarea.value = tempItems.join('\n');
  }
  
  if (listResultValue) {
    listResultValue.textContent = picks.join(', ');
  }
  if (listResultDiv) listResultDiv.classList.remove('hidden');
  showConfetti();
}

// --- Number Generator ---
const numMin = document.getElementById('numMin');
const numMax = document.getElementById('numMax');
const numExcludeOdd = document.getElementById('numExcludeOdd');
const numMultiPick = document.getElementById('numMultiPick');
const numPickCount = document.getElementById('numPickCount');
const genNumberBtn = document.getElementById('genNumberBtn');
const numberResultDiv = document.getElementById('numberResult');
const numberDisplay = document.getElementById('numberDisplay');
const numberHistoryDiv = document.getElementById('numberHistory');

let numberHistoryList = [];

function generateNumber() {
  let min = parseInt(numMin?.value) || 1;
  let max = parseInt(numMax?.value) || 100;
  if (min > max) [min, max] = [max, min];
  
  const multi = numMultiPick?.checked || false;
  let count = parseInt(numPickCount?.value) || 1;
  if (count < 1) count = 1;
  if (count > 20) count = 20;
  
  let numbers = [];
  
  if (multi) {
    for (let i = 0; i < count; i++) {
      let num;
      do {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (numExcludeOdd?.checked && num % 2 !== 0);
      numbers.push(num);
    }
  } else {
    let num;
    do {
      num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (numExcludeOdd?.checked && num % 2 !== 0);
    numbers.push(num);
  }
  
  const displayText = numbers.join(', ');
  if (numberDisplay) numberDisplay.textContent = displayText;
  if (numberResultDiv) numberResultDiv.classList.remove('hidden');
  
  numberHistoryList.unshift(displayText);
  if (numberHistoryList.length > 8) numberHistoryList.pop();
  if (numberHistoryDiv) {
    numberHistoryDiv.innerHTML = numberHistoryList.map(n => 
      `<span class="coin-hist-item">${n}</span>`
    ).join('');
  }
  
  showConfetti();
}

// --- Card Picker ---
const playingCard = document.getElementById('playingCard');
const cardBack = document.querySelector('.card-back');
const cardFront = document.querySelector('.card-front');
const cardValue = document.getElementById('cardValue');
const cardSuit = document.getElementById('cardSuit');
const drawCardBtn = document.getElementById('drawCardBtn');
const resetDeckBtn = document.getElementById('resetDeckBtn');
const deckInfo = document.getElementById('deckInfo');
const drawnCardsDiv = document.getElementById('drawnCards');

let deck = [];
let drawnCardsList = [];

const suits = ['♥', '♦', '♣', '♠'];
const suitNames = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function initDeck() {
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  shuffleDeck();
  drawnCardsList = [];
  updateDeckInfo();
  updateDrawnCardsDisplay();
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function drawCard() {
  if (deck.length === 0) {
    alert('Deck is empty! Reset to continue.');
    return;
  }
  
  const card = deck.pop();
  drawnCardsList.unshift(card);
  
  if (cardFront && cardBack && playingCard) {
    cardBack.classList.add('hidden');
    cardFront.classList.remove('hidden');
    
    if (cardValue) cardValue.textContent = card.value;
    if (cardSuit) {
      cardSuit.textContent = card.suit;
      const isRed = card.suit === '♥' || card.suit === '♦';
      cardSuit.style.color = isRed ? '#FF4D6D' : '#222';
      if (cardValue) cardValue.style.color = isRed ? '#FF4D6D' : '#222';
    }
    
    playingCard.classList.add('drawing');
    setTimeout(() => playingCard.classList.remove('drawing'), 300);
  }
  
  updateDeckInfo();
  updateDrawnCardsDisplay();
  showConfetti();
}

function resetDeck() {
  initDeck();
  if (cardBack && cardFront) {
    cardBack.classList.remove('hidden');
    cardFront.classList.add('hidden');
  }
  updateDeckInfo();
  updateDrawnCardsDisplay();
}

function updateDeckInfo() {
  if (deckInfo) deckInfo.textContent = `${deck.length} cards remaining`;
}

function updateDrawnCardsDisplay() {
  if (!drawnCardsDiv) return;
  drawnCardsDiv.innerHTML = drawnCardsList.slice(0, 8).map(card => 
    `<span class="drawn-card-mini">${card.value}${card.suit}</span>`
  ).join('');
}

// --- Magic 8 Ball ---
const m8Ball = document.getElementById('m8Ball');
const m8Question = document.getElementById('m8Question');
const m8Btn = document.getElementById('m8Btn');
const m8History = document.getElementById('m8History');
const m8Text = document.getElementById('m8Text');

const magic8Answers = [
  'Yes', 'No', 'Maybe', 'Ask again', 'Definitely!', 'Cannot predict',
  'Outlook good', 'Very doubtful', 'Signs point to yes', 'Concentrate',
  'Don\'t count on it', 'Most likely', 'Reply hazy', 'For sure!',
  'Better not tell', 'Absolutely!', 'My sources say no', 'Yes - without a doubt'
];

function askMagic8() {
  let question = m8Question?.value.trim();
  if (!question) {
    question = 'Will something good happen today?';
    if (m8Question) m8Question.value = question;
  }
  
  if (m8Ball) {
    m8Ball.classList.add('shaking');
    m8Text.textContent = '...';
  }
  
  setTimeout(() => {
    const answer = magic8Answers[Math.floor(Math.random() * magic8Answers.length)];
    if (m8Text) m8Text.textContent = answer;
    if (m8Ball) m8Ball.classList.remove('shaking');
    
    const historyItem = document.createElement('div');
    historyItem.className = 'm8-hist-item';
    historyItem.innerHTML = `<strong>Q:</strong> ${escapeHtml(question.slice(0, 50))}<br><strong>A:</strong> ${answer}`;
    if (m8History) {
      m8History.insertBefore(historyItem, m8History.firstChild);
      while (m8History.children.length > 10) {
        m8History.removeChild(m8History.lastChild);
      }
    }
    
    showConfetti();
  }, 500);
}

// --- Tab Switching ---
function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tool-panel');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const toolId = tab.dataset.tool;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panels.forEach(panel => panel.classList.remove('active'));
      const targetPanel = document.getElementById(`tool-${toolId}`);
      if (targetPanel) targetPanel.classList.add('active');
      
      // Re-draw wheel when switching to wheel tab
      if (toolId === 'wheel') {
        setTimeout(() => drawWheel(), 50);
      }
    });
  });
}

// --- Confetti Effect ---
const confettiCanvas = document.getElementById('confettiCanvas');
let confettiCtx = null;
let confettiActive = false;
let confettiParticles = [];
let confettiAnimationId = null;

function initConfetti() {
  if (!confettiCanvas) return;
  confettiCtx = confettiCanvas.getContext('2d');
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    if (confettiCanvas) {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
  });
}

function showConfetti() {
  if (!confettiCanvas || !confettiCtx) {
    initConfetti();
    if (!confettiCtx) return;
  }
  
  if (confettiActive) {
    confettiParticles = [];
    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
  }
  
  confettiCanvas.style.display = 'block';
  confettiActive = true;
  confettiParticles = [];
  
  const particleCount = 120;
  for (let i = 0; i < particleCount; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      size: Math.random() * 8 + 4,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      speedX: (Math.random() - 0.5) * 3,
      speedY: Math.random() * 8 + 5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    });
  }
  
  function animateConfetti() {
    if (!confettiCtx || !confettiCanvas) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    let active = false;
    for (let i = 0; i < confettiParticles.length; i++) {
      const p = confettiParticles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;
      
      if (p.y < confettiCanvas.height + 100) {
        active = true;
        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate(p.rotation * Math.PI / 180);
        confettiCtx.fillStyle = p.color;
        confettiCtx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        confettiCtx.restore();
      }
    }
    
    if (active) {
      confettiAnimationId = requestAnimationFrame(animateConfetti);
    } else {
      confettiCanvas.style.display = 'none';
      confettiActive = false;
      if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
      confettiAnimationId = null;
    }
  }
  
  animateConfetti();
  
  setTimeout(() => {
    if (confettiAnimationId) {
      cancelAnimationFrame(confettiAnimationId);
      confettiAnimationId = null;
    }
    confettiCanvas.style.display = 'none';
    confettiActive = false;
  }, 2500);
}

// --- Utility Functions ---
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// --- Mobile Menu ---
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;
  
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
  });
}

// --- Header Scroll Effect ---
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// --- Smooth Scroll for Anchor Links ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// --- FAQ Accordion ---
function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const qBtn = item.querySelector('.faq-q');
    if (qBtn) {
      qBtn.addEventListener('click', () => {
        item.classList.toggle('open');
      });
    }
  });
}

// --- Event Listeners for Dice Controls ---
function initDiceControls() {
  document.querySelectorAll('.dice-count-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dice-count-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      diceCount = parseInt(btn.dataset.count);
      updateDiceUI();
    });
  });
  
  document.querySelectorAll('.dice-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dice-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      diceSides = parseInt(btn.dataset.sides);
    });
  });
}

// --- Initialize Everything ---
document.addEventListener('DOMContentLoaded', () => {
  // Wheel
  initWheel();
  if (spinBtn) spinBtn.addEventListener('click', spinWheel);
  if (addOptionBtn) addOptionBtn.addEventListener('click', addWheelOption);
  if (clearWheelBtn) clearWheelBtn.addEventListener('click', clearWheelOptions);
  if (shuffleWheelBtn) shuffleWheelBtn.addEventListener('click', shuffleWheelOptions);
  if (wheelInput) wheelInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addWheelOption();
  });
  
  // Default wheel options
  wheelOptions = ['Pizza', 'Burger', 'Sushi', 'Tacos', 'Pasta', 'Salad'];
  wheelColors = wheelOptions.map((_, i) => colorPalette[i % colorPalette.length]);
  renderOptionsList();
  drawWheel();
  
  // Yes/No Oracle
  if (askOracleBtn) askOracleBtn.addEventListener('click', askOracle);
  if (quickYes) quickYes.addEventListener('click', () => quickOracle('yes'));
  if (quickNo) quickNo.addEventListener('click', () => quickOracle('no'));
  if (questionInput) questionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') askOracle();
  });
  
  // Dice
  updateDiceUI();
  if (rollDiceBtn) rollDiceBtn.addEventListener('click', rollDice);
  initDiceControls();
  
  // Coin Flip
  if (flipCoinBtn) flipCoinBtn.addEventListener('click', flipCoin);
  
  // List Picker
  if (pickFromListBtn) pickFromListBtn.addEventListener('click', pickFromList);
  
  // Number Generator
  if (genNumberBtn) genNumberBtn.addEventListener('click', generateNumber);
  
  // Card Picker
  initDeck();
  if (drawCardBtn) drawCardBtn.addEventListener('click', drawCard);
  if (resetDeckBtn) resetDeckBtn.addEventListener('click', resetDeck);
  
  // Magic 8 Ball
  if (m8Btn) m8Btn.addEventListener('click', askMagic8);
  if (m8Question) m8Question.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') askMagic8();
  });
  if (m8Ball) m8Ball.addEventListener('click', askMagic8);
  
  // UI Components
  initTabs();
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
  initFaq();
  initConfetti();
});
