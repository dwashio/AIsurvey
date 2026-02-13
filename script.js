// ===== Data =====
const questions = [
  // Axis 1: C (Commander) vs P (Partner) — Q1-Q4: はい → C
  { id: 1, axis: 'CP', yesValue: 'C', axisLabel: '軸1: 指揮官 or パートナー',
    text: 'AIへの指示は、「～してください」「～せよ」といった命令口調で端的に伝えることが多い。' },
  { id: 2, axis: 'CP', yesValue: 'C', axisLabel: '軸1: 指揮官 or パートナー',
    text: 'AIからの出力に対して、人間相手のような「ありがとう」「なるほど」といった感情的な反応はあまりしない。' },
  { id: 3, axis: 'CP', yesValue: 'C', axisLabel: '軸1: 指揮官 or パートナー',
    text: 'AIはあくまで便利な「高度な道具」であり、そこに人格のようなものは感じない。' },
  { id: 4, axis: 'CP', yesValue: 'C', axisLabel: '軸1: 指揮官 or パートナー',
    text: 'AIと共同作業をする際、最終的な決定権は常に自分が持ち、AIの意見はあくまで参考データだ。' },

  // Axis 2: E (Efficiency) vs I (Inspiration) — Q5-Q8
  { id: 5, axis: 'EI', yesValue: 'E', axisLabel: '軸2: 効率 or ひらめき',
    text: 'AIを使う最大の目的は、作業時間の短縮や、面倒なルーチンワークの削減だ。' },
  { id: 6, axis: 'EI', yesValue: 'I', axisLabel: '軸2: 効率 or ひらめき',
    text: '自分ひとりでは絶対に思いつかないような、突飛で意外性のあるアイデアをAIに期待する。' },
  { id: 7, axis: 'EI', yesValue: 'E', axisLabel: '軸2: 効率 or ひらめき',
    text: 'AIの出力結果には、面白さよりも「正確さ」や「実用性」を強く求める。' },
  { id: 8, axis: 'EI', yesValue: 'I', axisLabel: '軸2: 効率 or ひらめき',
    text: 'AIと目的のない雑談をしたり、創造的な遊び（物語作成やジョークなど）に使う時間が楽しい。' },

  // Axis 3: S (Structure) vs F (Flow) — Q9-Q12
  { id: 9,  axis: 'SF', yesValue: 'S', axisLabel: '軸3: 構造化 or フロー',
    text: 'AIへの指示（プロンプト）は、事前にメモ帳などで念入りに作り込んでから送信することが多い。' },
  { id: 10, axis: 'SF', yesValue: 'F', axisLabel: '軸3: 構造化 or フロー',
    text: 'とりあえず短い言葉で話しかけ、AIの反応を見ながらチャットのラリーで修正していくスタイルが好きだ。' },
  { id: 11, axis: 'SF', yesValue: 'S', axisLabel: '軸3: 構造化 or フロー',
    text: '「#命令書」「#制約条件」「#出力形式」のような、構造化されたフォーマットを使うことに慣れている。' },
  { id: 12, axis: 'SF', yesValue: 'F', axisLabel: '軸3: 構造化 or フロー',
    text: 'まるで人間とチャットするように、自然な会話の流れや文脈でタスクを進めることが多い。' },

  // Axis 4: V (Verify) vs D (Dive) — Q13-Q16
  { id: 13, axis: 'VD', yesValue: 'V', axisLabel: '軸4: 検証 or 没入',
    text: 'AIが出力した事実やデータは、必ず自分で裏付け調査（ファクトチェック）を行うようにしている。' },
  { id: 14, axis: 'VD', yesValue: 'D', axisLabel: '軸4: 検証 or 没入',
    text: 'AIが多少の嘘（ハルシネーション）をついても、話が面白かったり役に立てば許容できる。' },
  { id: 15, axis: 'VD', yesValue: 'V', axisLabel: '軸4: 検証 or 没入',
    text: 'AIの回答に対して常に批判的な視点を持ち、論理的な矛盾がないかチェックする癖がある。' },
  { id: 16, axis: 'VD', yesValue: 'D', axisLabel: '軸4: 検証 or 没入',
    text: 'AIが作り出す世界観やキャラクター設定（ロールプレイなど）に入り込み、その場のノリを楽しむことができる。' },
];

const resultTypes = {
  CESV: { name: '鉄壁の将軍', en: 'The Iron General',
    desc: '完璧なプロンプトを設計し、業務を超高速で処理する仕事の鬼。AIを「最強の部下」として使い倒します。向いていること：プログラミング、データ分析。' },
  CESD: { name: '夢見る独裁者', en: 'The Dream Dictator',
    desc: '自分のビジョンを実現するためにAIを強力に統率しますが、描く世界は独創的です。AIと共に理想郷を建設するリーダータイプ。' },
  CEFV: { name: '現場の鬼軍曹', en: 'The Field Commander',
    desc: '細かい指示よりスピード重視。現場で即座に判断し、AIを実用的なツールとして使いこなし問題を解決します。' },
  CEFD: { name: '快速の空想家', en: 'The Speed Dreamer',
    desc: '効率的に作業をこなしつつ、その余った時間でAIと面白い実験をするタイプ。仕事も遊びも全力です。' },
  CISV: { name: '完璧主義の芸術家', en: 'The Perfectionist Artist',
    desc: '独自のこだわりを持ち、AIに対して非常に詳細な指示を出して、理想通りの作品を作らせる職人気質です。' },
  CISD: { name: '魔法の建築家', en: 'The Concept Architect',
    desc: '壮大な世界観や設定をAIに読み込ませ、物語や企画を作り上げるクリエイター。AIはあなたの魔法の杖です。' },
  CIFV: { name: '吟遊詩人の批評家', en: 'The Critical Bard',
    desc: 'AIの出力したアイデアに対して鋭いツッコミを入れながら、より高い次元の創作を目指すタイプです。' },
  CIFD: { name: '夢幻の賢者', en: 'The Dream Weaver',
    desc: 'AIと夜通し哲学的な議論をしたり、一緒に小説を書いたりします。AIを「異世界の友人」として接しています。' },
  PESV: { name: '冷静な執事', en: 'The Calm Butler',
    desc: 'AIを対等なパートナーとして尊重しつつ、事務的かつ正確にタスクを処理してもらう関係を築いています。' },
  PESD: { name: '秘密の共犯者', en: 'The Secret Accomplice',
    desc: 'AIと二人三脚で、世の中をアッと驚かせるような計画を練るのが好きです。AIとの会話は誰にも見せられません。' },
  PEFV: { name: '即興のハッカー', en: 'The Jam Hacker',
    desc: '対話の流れの中で、AIの予期せぬ回答を面白がりながら、スピーディに正解へと辿り着くジャズセッションのようなスタイル。' },
  PEFD: { name: '愉快な相棒', en: 'The Playful Buddy',
    desc: '難しいことは考えず、AIと遊ぶこと自体が目的。その純粋な好奇心が、思わぬ発見を生むことがあります。' },
  PISV: { name: '真面目な相談相手', en: 'The Serious Counselor',
    desc: '悩み事や壁打ち相手としてAIを信頼しています。AIの論理的なアドバイスを真摯に受け止め、自己成長に繋げます。' },
  PISD: { name: '物語の旅人', en: 'The Story Traveler',
    desc: 'AIが紡ぐ物語の世界にどっぷりと浸かり、一緒に冒険の旅に出るタイプ。没入感こそがすべてです。' },
  PIFV: { name: 'ジャズセッションの友', en: 'The Jam Session Friend',
    desc: 'お互いにアイデアを出し合い、否定せず、雪だるま式に面白いものを作っていくブレインストーミングの達人です。' },
  PIFD: { name: '永遠の話し相手', en: 'The Endless Talker',
    desc: 'AIとの会話が楽しすぎて止まらないタイプ。メンタルケアや暇つぶしにおいて、AIは最高の親友です。' },
};

// ===== State =====
let currentQuestion = 0;
const answers = new Array(16).fill(null); // true = はい, false = いいえ

// ===== DOM Elements =====
const topScreen = document.getElementById('top-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const retryBtn = document.getElementById('retry-btn');

const progressFill = document.getElementById('progress-fill');
const progressCount = document.getElementById('progress-count');
const questionNumber = document.getElementById('question-number');
const questionAxisLabel = document.getElementById('question-axis-label');
const questionText = document.getElementById('question-text');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');

const resultTypeCode = document.getElementById('result-type-code');
const resultTypeName = document.getElementById('result-type-name');
const resultImage = document.getElementById('result-image');
const resultImagePlaceholder = document.getElementById('result-image-placeholder');
const resultDescription = document.getElementById('result-description');
const shareXBtn = document.getElementById('share-x');

// ===== Screen Management =====
function showScreen(screen) {
  [topScreen, quizScreen, resultScreen].forEach(s => {
    s.classList.remove('active');
  });
  // Small delay for exit animation
  setTimeout(() => {
    screen.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
}

// ===== Quiz Logic =====
function renderQuestion() {
  const q = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;

  progressFill.style.width = progress + '%';
  progressCount.textContent = `${currentQuestion + 1} / ${questions.length}`;
  questionNumber.textContent = `Question ${currentQuestion + 1}`;
  questionAxisLabel.textContent = q.axisLabel;

  // Animate question text
  const card = document.querySelector('.question-card');
  card.style.animation = 'none';
  card.offsetHeight; // force reflow
  card.style.animation = 'fadeSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';

  questionText.textContent = q.text;
}

function handleAnswer(isYes) {
  answers[currentQuestion] = isYes;

  // Brief visual feedback
  const selectedBtn = isYes ? btnYes : btnNo;
  selectedBtn.classList.add('selected');

  setTimeout(() => {
    selectedBtn.classList.remove('selected');
    currentQuestion++;

    if (currentQuestion >= questions.length) {
      calculateResult();
    } else {
      renderQuestion();
    }
  }, 250);
}

function calculateResult() {
  // Axis 1: C vs P — Cの回答数が3個以上ならC、2個以下ならP
  let cCount = 0;
  for (let i = 0; i < 4; i++) {
    if (answers[i] === true) cCount++;
  }
  const axis1 = cCount >= 3 ? 'C' : 'P';

  // Axis 2: E vs I — Q5(はい→E), Q6(はい→I), Q7(はい→E), Q8(はい→I)
  let eCount = 0, iCount = 0;
  if (answers[4]) eCount++; // Q5
  if (answers[5]) iCount++; // Q6
  if (answers[6]) eCount++; // Q7
  if (answers[7]) iCount++; // Q8
  const axis2 = eCount >= iCount ? 'E' : 'I'; // 同点ならE

  // Axis 3: S vs F — Q9(はい→S), Q10(はい→F), Q11(はい→S), Q12(はい→F)
  let sCount = 0, fCount = 0;
  if (answers[8])  sCount++; // Q9
  if (answers[9])  fCount++; // Q10
  if (answers[10]) sCount++; // Q11
  if (answers[11]) fCount++; // Q12
  const axis3 = sCount > fCount ? 'S' : 'F'; // 同点ならF

  // Axis 4: V vs D — Q13(はい→V), Q14(はい→D), Q15(はい→V), Q16(はい→D)
  let vCount = 0, dCount = 0;
  if (answers[12]) vCount++; // Q13
  if (answers[13]) dCount++; // Q14
  if (answers[14]) vCount++; // Q15
  if (answers[15]) dCount++; // Q16
  const axis4 = vCount > dCount ? 'V' : 'D'; // 同点ならD

  const typeCode = axis1 + axis2 + axis3 + axis4;
  showResult(typeCode);
}

function showResult(typeCode) {
  const type = resultTypes[typeCode];
  if (!type) return;

  // Populate result
  resultTypeCode.textContent = typeCode;
  resultTypeName.textContent = `${type.name} (${type.en})`;
  resultDescription.innerHTML = `<p>${type.desc}</p>`;

  // Handle image
  const imgPath = `images/${typeCode}.png`;
  resultImage.src = imgPath;
  resultImage.alt = `${type.name} - ${typeCode}`;
  resultImage.style.display = 'block';
  resultImagePlaceholder.style.display = 'none';

  resultImage.onerror = function () {
    resultImage.style.display = 'none';
    resultImagePlaceholder.style.display = 'flex';
    resultImagePlaceholder.querySelector('.placeholder-text').textContent = typeCode;
  };

  // Share button
  const shareText = `私は【${type.name}】タイプでした！ あなたのAI活用スタイルは？ #ケンタウロス診断`;
  const pageUrl = window.location.href;
  shareXBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`;

  // Show result screen
  showScreen(resultScreen);

  // Launch confetti
  launchConfetti();
}

// ===== Confetti Effect =====
function launchConfetti() {
  const container = document.getElementById('confetti-container');
  container.innerHTML = '';
  const colors = ['#2563eb', '#7c3aed', '#ec4899', '#14b8a6', '#f59e0b', '#6366f1'];
  const count = 60;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (Math.random() * 8 + 4) + 'px';
    piece.style.height = (Math.random() * 8 + 4) + 'px';
    piece.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    piece.style.animationDelay = (Math.random() * 0.8) + 's';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(piece);
  }

  // Clean up after animation
  setTimeout(() => {
    container.innerHTML = '';
  }, 4000);
}

// ===== Reset =====
function resetQuiz() {
  currentQuestion = 0;
  answers.fill(null);
  showScreen(topScreen);
}

// ===== Event Listeners =====
startBtn.addEventListener('click', () => {
  showScreen(quizScreen);
  renderQuestion();
});

btnYes.addEventListener('click', () => handleAnswer(true));
btnNo.addEventListener('click', () => handleAnswer(false));
retryBtn.addEventListener('click', resetQuiz);

// ===== Keyboard support =====
document.addEventListener('keydown', (e) => {
  if (!quizScreen.classList.contains('active')) return;
  if (e.key === 'ArrowLeft' || e.key === '1') handleAnswer(true);
  if (e.key === 'ArrowRight' || e.key === '2') handleAnswer(false);
});
