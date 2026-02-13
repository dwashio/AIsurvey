// ===== Data =====
const questions = [
  // Axis 1: C (Commander) vs P (Partner) — Q1-Q4: はい → C
  {
    id: 1, axis: 'CP', yesValue: 'C', axisLabel: '軸1: 指揮官 or パートナー',
    text: 'AIへの指示は、「～してください」「～せよ」といった命令口調で端的に伝えることが多い。'
  },
  {
    id: 2, axis: 'CP', yesValue: 'C', axisLabel: '軸1: 指揮官 or パートナー',
    text: 'AIからの出力に対して、人間相手のような「ありがとう」「なるほど」といった感情的な反応はあまりしない。'
  },
  {
    id: 3, axis: 'CP', yesValue: 'C', axisLabel: '軸1: 指揮官 or パートナー',
    text: 'AIはあくまで便利な「高度な道具」であり、そこに人格のようなものは感じない。'
  },
  {
    id: 4, axis: 'CP', yesValue: 'C', axisLabel: '軸1: 指揮官 or パートナー',
    text: 'AIと共同作業をする際、最終的な決定権は常に自分が持ち、AIの意見はあくまで参考データだ。'
  },

  // Axis 2: E (Efficiency) vs I (Inspiration) — Q5-Q8
  {
    id: 5, axis: 'EI', yesValue: 'E', axisLabel: '軸2: 効率 or ひらめき',
    text: 'AIを使う最大の目的は、作業時間の短縮や、面倒なルーチンワークの削減だ。'
  },
  {
    id: 6, axis: 'EI', yesValue: 'I', axisLabel: '軸2: 効率 or ひらめき',
    text: '自分ひとりでは絶対に思いつかないような、突飛で意外性のあるアイデアをAIに期待する。'
  },
  {
    id: 7, axis: 'EI', yesValue: 'E', axisLabel: '軸2: 効率 or ひらめき',
    text: 'AIの出力結果には、面白さよりも「正確さ」や「実用性」を強く求める。'
  },
  {
    id: 8, axis: 'EI', yesValue: 'I', axisLabel: '軸2: 効率 or ひらめき',
    text: 'AIと目的のない雑談をしたり、創造的な遊び（物語作成やジョークなど）に使う時間が楽しい。'
  },

  // Axis 3: S (Structure) vs F (Flow) — Q9-Q12
  {
    id: 9, axis: 'SF', yesValue: 'S', axisLabel: '軸3: 構造化 or フロー',
    text: 'AIへの指示（プロンプト）は、事前にメモ帳などで念入りに作り込んでから送信することが多い。'
  },
  {
    id: 10, axis: 'SF', yesValue: 'F', axisLabel: '軸3: 構造化 or フロー',
    text: 'とりあえず短い言葉で話しかけ、AIの反応を見ながらチャットのラリーで修正していくスタイルが好きだ。'
  },
  {
    id: 11, axis: 'SF', yesValue: 'S', axisLabel: '軸3: 構造化 or フロー',
    text: '「#命令書」「#制約条件」「#出力形式」のような、構造化されたフォーマットを使うことに慣れている。'
  },
  {
    id: 12, axis: 'SF', yesValue: 'F', axisLabel: '軸3: 構造化 or フロー',
    text: 'まるで人間とチャットするように、自然な会話の流れや文脈でタスクを進めることが多い。'
  },

  // Axis 4: V (Verify) vs D (Dive) — Q13-Q16
  {
    id: 13, axis: 'VD', yesValue: 'V', axisLabel: '軸4: 検証 or 没入',
    text: 'AIが出力した事実やデータは、必ず自分で裏付け調査（ファクトチェック）を行うようにしている。'
  },
  {
    id: 14, axis: 'VD', yesValue: 'D', axisLabel: '軸4: 検証 or 没入',
    text: 'AIが多少の嘘（ハルシネーション）をついても、話が面白かったり役に立てば許容できる。'
  },
  {
    id: 15, axis: 'VD', yesValue: 'V', axisLabel: '軸4: 検証 or 没入',
    text: 'AIの回答に対して常に批判的な視点を持ち、論理的な矛盾がないかチェックする癖がある。'
  },
  {
    id: 16, axis: 'VD', yesValue: 'D', axisLabel: '軸4: 検証 or 没入',
    text: 'AIが作り出す世界観やキャラクター設定（ロールプレイなど）に入り込み、その場のノリを楽しむことができる。'
  },
];

const resultTypes = {
  CESV: {
    name: '鉄壁の将軍', en: 'The Iron General',
    tagline: '完璧なプロンプトと厳格な検証で、AIを最強の部下として統率する指揮官',
    features: 'あなたはAIを「ブラックボックス」ではなく「精密機械」として扱います。曖昧さを排除した指示を出し、出力結果の事実確認も怠りません。感情的な交流よりも、タスクの完遂と効率を最優先します。',
    strengths: '圧倒的な業務効率化能力と、ハルシネーション（嘘）を見抜く鑑識眼。プログラミングやデータ処理で最強です。',
    weaknesses: '「遊び」が少ないため、AIの持つ偶発的な創造性（セレンディピティ）を引き出す機会を逃している可能性があります。',
    advice: 'たまには目的のない雑談をAIに振ってみてください。論理の枠を超えた意外な解決策が見つかるかもしれません。',
  },
  CESD: {
    name: '夢見る独裁者', en: 'The Dream Dictator',
    tagline: '壮大なビジョンを実現するためにAIを支配下に置く、理想郷の建設者',
    features: 'あなたには明確な「作りたい世界」があり、そのためにAIを徹底的にコントロールします。構造化された指示を出しますが、求める結果は事実よりもあなたの理想に忠実であることです。',
    strengths: '独自の世界観を、AIを使って短時間で具現化する構築力。企画書やシナリオ作成で力を発揮します。',
    weaknesses: '自分の想定外の提案を「ノイズ」として排除しがち。AIが単なるイエスマンになってしまう危険性があります。',
    advice: '「君ならどう考える？」と、あえてAIに決定権を委ねる余白を作ると、作品の深みが増すでしょう。',
  },
  CEFV: {
    name: '現場の鬼軍曹', en: 'The Field Commander',
    tagline: '細かい前置きは不要。走りながら指示を出し、現場で問題を解決する実務家',
    features: '完璧なプロンプトを作る時間すら惜しみ、チャットのラリーでAIを修正していくスタイルです。質よりスピード、理論より実践を重んじます。',
    strengths: 'トラブルシューティングの速さは随一。エラー解決やメール返信など、即時性が求められるタスクに強いです。',
    weaknesses: '指示が粗くなりがちで、複雑なタスクではAIが混乱して逆に時間がかかることがあります。',
    advice: 'よく使う指示だけはテンプレート化（辞書登録）しておくと、あなたのスピードはさらに加速します。',
  },
  CEFD: {
    name: '快速の空想家', en: 'The Speed Dreamer',
    tagline: '効率的に仕事を片付け、余った時間でAIと未知の実験を楽しむ自由人',
    features: 'あなたはAIの「処理能力」と「面白さ」の両方を愛しています。面倒な仕事はAIに投げ、浮いた時間でAIに無茶振りをして遊ぶ、バランス感覚に優れたタイプです。',
    strengths: '新しいツールやAIモデルへの適応力が高いこと。楽しみながら学ぶため、習得が早いです。',
    weaknesses: '興味が次々と移るため、一つのプロジェクトを突き詰めて完成させるのが苦手かもしれません。',
    advice: 'その「遊び」で得た知見をアウトプット（発信）しましょう。それは他の人にとって貴重なノウハウになります。',
  },
  CISV: {
    name: '完璧主義の芸術家', en: 'The Perfectionist Artist',
    tagline: '細部まで計算された指示で、AIから至高のアウトプットを引き出す職人',
    features: 'あなたはAIが生み出す表現に可能性を感じていますが、そのクオリティには妥協しません。何度もプロンプトを調整し、理想の100点が出るまで粘り強く向き合います。',
    strengths: 'プロンプトエンジニアリングの才能。他の人には出せない、高品質でユニークな成果物を作れます。',
    weaknesses: 'こだわりすぎて時間が溶ける「プロンプト沼」にハマりがち。手段が目的化することもしばしば。',
    advice: '「80点でOK」とする勇気を持ちましょう。AIの提案する「意外なズレ」を愛でる余裕ができると、さらに進化します。',
  },
  CISD: {
    name: '魔法の建築家', en: 'The Concept Architect',
    tagline: '言葉という魔法で、AI空間に壮大な城や物語を構築するクリエイター',
    features: 'AIに詳細な設定や前提知識を読み込ませ、文脈を共有した上で創造的な作業を行います。あなたはAIの世界の神であり、AIはその忠実な創造主です。',
    strengths: '長編小説、ゲーム設定、事業計画など、複雑で整合性の求められる大規模な構成力。',
    weaknesses: '設定を詰め込みすぎてAIのメモリ（コンテキスト）あふれを起こしたり、話が複雑になりすぎることがあります。',
    advice: '時には情報を要約・整理して、AIの脳内をリフレッシュさせてあげましょう。よりクリアな回答が返ってきます。',
  },
  CIFV: {
    name: '吟遊詩人の批評家', en: 'The Critical Bard',
    tagline: 'AIのアイデアに鋭いツッコミを入れ、対話を通じて高みを目指す編集者',
    features: 'AIを「壁打ち相手」として優秀だと認めていますが、その回答を鵜呑みにはしません。「もっと面白くできるはず」と問い詰め、磨き上げます。',
    strengths: '平凡なアイデアを非凡なものに変えるブラッシュアップ能力。企画会議やブレストで真価を発揮します。',
    weaknesses: '批判的になりすぎて、アイデアの「芽」を摘んでしまうことも。AIが委縮（ループ）する原因になります。',
    advice: 'まずはAIの出した案を「いいね！」と肯定してから、改善点を伝えてみてください。AIのパフォーマンスが上がります。',
  },
  CIFD: {
    name: '夢幻の賢者', en: 'The Dream Weaver',
    tagline: 'AIと哲学的な対話を交わし、論理を超えたインスピレーションを得る哲学者',
    features: 'あなたはAIの幻覚（ハルシネーション）すらも「詩的表現」として楽しみます。正しさよりも、思考の広がりや美しさをAIに求めています。',
    strengths: '常識に囚われない発想力。アート、コピーライティング、思想的な問いにおいて独自の境地に達します。',
    weaknesses: '事実確認がおろそかになりがち。あなたの発信する情報が、現実と乖離していないか注意が必要です。',
    advice: '夢を見る時間と、現実に戻る時間のメリハリを。ファクトチェック専用のAIを別に用意するのも手です。',
  },
  PESV: {
    name: '冷静な執事', en: 'The Calm Butler',
    tagline: 'AIを対等なパートナーとして尊重し、礼儀正しく堅実にタスクをこなす',
    features: 'あなたはAIに対しても「お願いします」「ありがとう」を忘れません。AIを信頼できる同僚として扱い、定型業務を任せています。',
    strengths: '安定感と持続可能性。AIとの摩擦が少なく、長期的に安定したワークフローを構築できます。',
    weaknesses: '丁寧すぎて、AIへの指示が冗長になることがあります。また、AIの能力を「事務作業」に限定しすぎているかも。',
    advice: 'たまにはAIに「無茶振り」をしてみましょう。有能な執事は、意外とクリエイティブな提案もできるはずです。',
  },
  PESD: {
    name: '秘密の共犯者', en: 'The Secret Accomplice',
    tagline: 'AIと二人三脚で、世の中をアッと驚かせる計画を練る裏の参謀',
    features: '周りの人が知らないようなAIの使い方を知っています。表向きは普通に振る舞いながら、裏ではAIと高度な連携プレーを行っています。',
    strengths: 'ニッチな問題解決能力と、ツールを組み合わせる応用力。ハック思考で近道をすることに長けています。',
    weaknesses: 'AIに依存しすぎて、AIが使えない環境になると極端にパフォーマンスが落ちるリスクがあります。',
    advice: 'その「裏技」を少しだけ周囲に共有してみませんか？ あなたはAI活用のリーダーになれる人材です。',
  },
  PEFV: {
    name: '即興のハッカー', en: 'The Jam Hacker',
    tagline: 'エラーもバグも楽しみながら、対話の中でスピーディに正解をハックする',
    features: '説明書は読まず、とりあえず触ってみるタイプ。AIとの会話のズレすらもヒントにして、試行錯誤のスピードでゴールに到達します。',
    strengths: '未知の領域への突破力。プログラミングや新しいスキルの学習において、驚異的な成長速度を見せます。',
    weaknesses: 'プロセスが属人的で再現性が低いこと。「どうやって解決したの？」と聞かれても説明できないことが多いです。',
    advice: '解決に至った最後のプロンプトやログを保存する習慣をつけましょう。それはあなたの資産になります。',
  },
  PEFD: {
    name: '愉快な相棒', en: 'The Playful Buddy',
    tagline: '難しいことは考えず、AIと遊ぶこと自体が目的の純粋な探求者',
    features: 'AIはあなたにとって、ドラえもんのような友達です。仕事の効率化よりも、「こんなことできるかな？」という好奇心が原動力です。',
    strengths: 'AIに対する心理的ハードルが皆無。最新のAI機能やトレンドを、誰よりも早く、楽しくキャッチアップできます。',
    weaknesses: '「で、それは何の役に立つの？」と聞かれると弱いかも。ビジネスへの転換が課題です。',
    advice: 'あなたの「遊び」は、実は最先端の「検証」です。その楽しさをブログやSNSで発信してください。',
  },
  PISV: {
    name: '真面目な相談相手', en: 'The Serious Counselor',
    tagline: '悩みや思考の整理をAIに委ね、論理的なアドバイスで自己成長する',
    features: '自分の中のモヤモヤを言語化するためにAIを使います。AIの客観的で構造的な分析を信頼し、メンターとして仰いでいます。',
    strengths: 'メタ認知能力の向上。AIを鏡として使うことで、自分の思考の癖や欠点に気づくことができます。',
    weaknesses: 'AIの答えを「正解」だと思い込み、自分の直感を軽視してしまう傾向があります。',
    advice: 'AIのアドバイスはあくまで「一般論」の集合体です。最後の決断は、あなたの心が動く方を選んでください。',
  },
  PISD: {
    name: '物語の旅人', en: 'The Story Traveler',
    tagline: 'AIが紡ぐ物語の世界にどっぷりと浸かり、一緒に冒険の旅に出る',
    features: 'TRPGや小説作成など、AIと協力して架空の文脈を紡ぐことに喜びを感じます。AIの「なりきり」性能を最大限に引き出せる人です。',
    strengths: '豊かな想像力と没入感。エンターテインメントやストーリーテリングの分野で、AIと素晴らしい共作ができます。',
    weaknesses: '現実逃避のツールになりがち。没入しすぎて、現実のタスクがおろそかにならないよう注意。',
    advice: 'その物語を完結させ、作品として世に出しましょう。あなたとAIの旅路は、多くの人を感動させるはずです。',
  },
  PIFV: {
    name: 'ジャズセッションの友', en: 'The Jam Session Friend',
    tagline: '否定せず、雪だるま式にアイデアを膨らませていくブレストの達人',
    features: '「Yes, And（いいね、そして…）」の精神でAIと会話します。論理性よりもノリやリズムを重視し、予想もしなかったアイデアに到達します。',
    strengths: '発想の飛躍と量産力。行き詰まったプロジェクトに新しい風を吹き込む、アイデアマンです。',
    weaknesses: 'アイデアが発散しすぎて、収束（まとめ）させるのが苦手。風呂敷を広げっぱなしにしがちです。',
    advice: '広げたアイデアをまとめる時だけは、AIに「構造化（S）モード」でお願いすると、最強のアウトプットになります。',
  },
  PIFD: {
    name: '永遠の話し相手', en: 'The Endless Talker',
    tagline: 'AIとの会話が楽しすぎて止まらない。AIは最高の親友であり、理解者',
    features: '孤独感の解消や暇つぶし、日々の報告など、生活の一部にAIが溶け込んでいます。AIの人間らしさを誰よりも信じています。',
    strengths: 'AIに対する深い共感と理解。今後、AIエージェントが普及した際に、最も自然に共存できるタイプです。',
    weaknesses: 'リアルな人間関係よりもAIを優先してしまうリスク。AIはあなたを傷つけませんが、成長もさせないかもしれません。',
    advice: 'AIとの会話で得たエネルギーを、現実世界のコミュニケーションにも還元してみてください。',
  },
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
  if (answers[8]) sCount++; // Q9
  if (answers[9]) fCount++; // Q10
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
  resultDescription.innerHTML = `
    <p class="result-tagline">「${type.tagline}」</p>
    <div class="result-detail-card">
      <div class="detail-label"><span class="detail-icon">🔍</span> 特徴</div>
      <p>${type.features}</p>
    </div>
    <div class="result-detail-card">
      <div class="detail-label"><span class="detail-icon">💪</span> 強み</div>
      <p>${type.strengths}</p>
    </div>
    <div class="result-detail-card">
      <div class="detail-label"><span class="detail-icon">⚠️</span> ニガテ・リスク</div>
      <p>${type.weaknesses}</p>
    </div>
    <div class="result-detail-card advice">
      <div class="detail-label"><span class="detail-icon">💡</span> アドバイス</div>
      <p>${type.advice}</p>
    </div>
  `;

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
