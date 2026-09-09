const status = document.querySelector(".copy-status");
let statusTimer;
let currentLang = "zh";

const textPairs = {
  "跳到主要内容": "Skip to main content",
  "现有体验": "Experience",
  "参与改进": "Feedback",
  "品牌合作": "Brand partners",
  "下载测试版": "Download test build",
  "INTERACTIVE MAKEUP LEARNING PROTOTYPE": "INTERACTIVE MAKEUP LEARNING PROTOTYPE",
  "不是只看教程，而是亲手把每一步慢慢完成。先从自然妆开始，边练习、边发现真正需要被教会的化妆技巧。":
    "Not just a tutorial to watch. Beauty Training Demo lets users practice each makeup step by hand, starting with a natural everyday look while helping us learn what should be taught next.",
  "在线体验 Demo": "Try the web demo",
  "下载 Android 测试版": "Download Android test build",
  "8 个练习步骤": "8 practice steps",
  "3 种练习脸型": "3 practice face types",
  "目前无需登录": "No login required",
  "刷到哪里，妆效才出现": "Makeup appears where the user brushes",
  "不同脸型使用不同定位": "Different face types use calibrated placement",
  "看它现在能做什么": "See what it does now",
  "STEP-BY-STEP": "STEP-BY-STEP",
  "FACE-SPECIFIC": "FACE-SPECIFIC",
  "SHADE-BASED": "SHADE-BASED",
  "LEARN BY DOING": "LEARN BY DOING",
  "01 / 现在": "01 / NOW",
  "先把“怎样化”真正练一遍": "Practice the real steps first",
  "当前版本专注单妆教学。每一步都有明确位置、颜色选择和完成进度，让练习不只是按一下就结束。":
    "This version focuses on one natural makeup lesson. Each step has clear placement, shade choices, and progress so the practice feels active rather than automatic.",
  "均匀底妆": "Even foundation",
  "轻扫腮红": "Soft blush",
  "整理眉形": "Shape brows",
  "晕染眼影": "Blend eyeshadow",
  "描画眼线": "Apply eyeliner",
  "试戴美瞳": "Try color lenses",
  "完成唇妆": "Finish lip color",
  "搭配饰品": "Style accessories",
  "跟着动作出现": "Responds to touch",
  "手指经过的地方才慢慢出现妆效，让练习保留“亲手完成”的感觉。":
    "The effect appears only where the user brushes, preserving the feeling of doing the makeup by hand.",
  "针对不同脸型": "Calibrated per face",
  "浅、中、深三种练习脸型分别校准眼睛、嘴唇和上妆范围。":
    "Light, medium, and deep skin practice faces use separate eye, lip, and makeup-area placement.",
  "从正常审美开始": "Starts with natural taste",
  "底妆与唇妆以自然、日常色为主，眼影保留少量有趣变化。":
    "Foundation and lip colors stay natural and wearable, while eyeshadow keeps a small range of playful options.",
  "02 / 和观众一起改": "02 / BUILD WITH VIEWERS",
  "这款 App 对你有用吗？": "Would this app be useful to you?",
  "这是我们最想在 YouTube 听见的答案。你可以先组合一份反馈，再直接贴到留言区。":
    "This is the question we want to ask on YouTube. Users can prepare feedback here and paste it into the comments.",
  "复制 YouTube 提问文案": "Copy YouTube question",
  "你觉得目前的方向：": "What do you think of the direction?",
  "有用，我会想继续试": "Useful, I would keep trying it",
  "有潜力，但还要补内容": "Promising, but it needs more content",
  "暂时不适合我": "Not suitable for me yet",
  "你最希望增加什么？": "What should be added next?",
  "妆前与护肤": "Skin prep",
  "修容与高光": "Contour and highlight",
  "睫毛教学": "Lash tutorial",
  "更多日常妆容": "More everyday looks",
  "品牌色号试妆": "Brand shade try-on",
  "还有什么应该被教会？": "What else should it teach?",
  "复制我的反馈": "Copy my feedback",
  "03 / 品牌合作可能": "03 / BRAND PARTNERSHIP",
  "把真实产品与色号，放进可体验的教学里": "Bring real products and shades into an interactive lesson",
  "品牌方可把自己的粉底、眼影、眼线和唇色整理成专属选择，让使用者在学习过程中认识产品，而不是只看到一张广告图。":
    "Brands can turn foundation, eyeshadow, eyeliner, and lip shades into guided choices users experience during practice instead of only seeing a static ad.",
  "品牌产品与色号资料库": "Product and shade library",
  "围绕产品设计教学步骤": "Lessons designed around products",
  "从体验反馈了解热门色号": "Feedback signals for popular shades",
  "BRAND SHADE LAB": "BRAND SHADE LAB",
  "未来概念": "Future concept",
  "选择色号，比较适合自己的上脸感觉。": "Choose a shade and compare how it may look on the face.",
  "未来：直接预览完整妆效": "Future: preview the full makeup look",
  "选好品牌与色号后，生成近似完成妆的照片，用来判断颜色是否适合自己的脸。":
    "After choosing a brand and shade, users could generate a near-finished makeup preview to judge whether the color suits them.",
  "04 / 产品路线": "04 / ROADMAP",
  "教学先做好，试妆再长出来": "Build the lesson first, then grow into try-on",
  "互动单妆教学": "Interactive single-look lesson",
  "把自然妆的每一步练清楚，继续优化妆效、位置与提示。":
    "Make every step of the natural look clear, then keep refining effects, placement, and prompts.",
  "由真实反馈决定课程": "Let real feedback shape lessons",
  "根据 YouTube 测试者最常提出的问题，增加真正需要的教学。":
    "Add lessons based on the questions YouTube testers ask most often.",
  "品牌色号一键试妆": "One-tap brand shade try-on",
  "从逐步学习延伸到完整妆效预览，协助比较产品与色号。":
    "Extend from step-by-step learning into full-look previews that help compare products and shades.",
  "ANDROID TEST BUILD · V2.6.0": "ANDROID TEST BUILD · V2.6.0",
  "先用真实操作，告诉我们哪里还不够好。": "Test it hands-on and tell us what still needs work.",
  "目前是产品验证版本。安装前请允许浏览器下载 APK；新版会覆盖原来的测试版。":
    "This is a product validation build. Allow your browser to download the APK; newer builds will replace the previous test version.",
  "下载测试 APK": "Download test APK",
  "先在线体验": "Try online first",
  "Android 7.0+ · 约 202 MB · 测试版本": "Android 7.0+ · About 202 MB · Test build",
  "ANDROID TEST BUILD · V2.7.0": "ANDROID TEST BUILD · V2.7.0",
  "Android 7.0+ · 约 216 MiB（227 MB）· 本地测试版": "Android 7.0+ · About 216 MiB (227 MB) · Local test build",
  "Interactive Makeup Learning Prototype": "Interactive Makeup Learning Prototype",
  "© 2026 · 当前页面用于产品验证与合作讨论。": "© 2026 · This page is for product validation and partnership discussion.",
};

Object.assign(textPairs, {
  "把色彩，": "PLAY.",
  "玩上脸。": "YOUR WAY.",
  "一笔腮红，一抹唇色。从第一步开始，亲手练出属于你的自然妆。": "A touch of blush. A little lip colour. Find your own everyday look, one hands-on step at a time.",
  "开始玩妆": "Let's play",
  "步骤，慢慢来": "steps, your pace",
  "打开你的化妆台": "Open your beauty table",
  "暂停动画": "Pause motion",
  "开启动画": "Play motion",
  "每一笔，": "Every brushstroke.",
  "都有新发现。": "A new discovery.",
  "向右滑动，探索化妆台": "Swipe to explore your beauty table",
  "往下滚动，探索化妆台": "Scroll to explore your beauty table",
  "唇色，随心情。": "Colour your mood.",
  "从温柔裸粉到莓果红，试着找到今天喜欢的颜色。": "From soft rose to berry red, find the shade that feels like you today.",
  "轻一点，刚刚好。": "Keep it soft.",
  "一点腮红，轻轻晕开。自然好气色，从柔和的一笔开始。": "A little blush, softly blended. Bring out a natural glow with one gentle brushstroke.",
  "亲手化，才好玩。": "The fun is doing it.",
  "让手指成为你的化妆刷，在每一次尝试里更有把握。": "Turn your fingertip into a makeup brush and build confidence with every try.",
  "拿起你的第一支刷": "Pick up your first brush",
  "不同的脸。": "Different faces.",
  "一样自在地玩。": "Same freedom to play.",
  "浅、中、深三种练习脸。每一张，都有自己的五官定位与自然妆练习。": "Three practice faces: light, medium and deep. Each has its own feature placement and natural-look lesson.",
  "浅肤色": "Light skin",
  "中肤色": "Medium skin",
  "深肤色": "Deep skin",
  "以上为当前教学 App 实际画面。": "Actual screens from the current teaching app.",
  "好看的妆，": "Your look.",
  "一步一步来。": "One step at a time.",
  "薄薄一层，刚好。": "Just one light layer.",
  "从脸中央向外推开，留下自然的光泽与自己的肤质。": "Blend outward from the centre and keep your natural skin texture glowing.",
  "轻轻定妆，保留光。": "Set softly, keep the light.",
  "粉饼是小小的收尾动作，让妆感清爽又不遮住表情。": "A small finishing step for a fresh look that keeps your expressions visible.",
  "颜色，慢慢叠。": "Build colour slowly.",
  "先从浅色开始，再加一点莓红或淡紫，练习看见层次。": "Start light, then add berry or lavender and learn to see the layers.",
  "睫毛，轻轻提气。": "Lift the eyes softly.",
  "把刷头靠近睫毛根部，慢慢向上，眼神就有了精神。": "Start at the roots and sweep upward to wake up the eyes.",
  "最后一抹，亮起来。": "Finish with a little shine.",
  "透明的光泽叠在喜欢的唇色上，完成属于你的日常妆。": "Layer a clear gloss over your favourite lip colour to finish your everyday look.",
  "去试试照片试妆": "Try photo try-on",
  "浅肤色 · 唇色练习": "Light skin · lip practice",
  "中肤色 · 唇色练习": "Medium skin · lip practice",
  "深肤色 · 唇色练习": "Deep skin · lip practice",
  "妆前": "Before",
  "唇色练习后": "After lip practice",
  "三种练习脸的妆前妆后对比": "Before and after across three practice faces",
  "前后图来自现有练习脸与唇色目标资产，用于展示教学范围，不代表任意自拍效果。": "These before-and-after images use existing practice-face and lip-target assets. They show the lesson range, not a promise for every selfie.",
});

const attributePairs = {
  "Beauty Training Demo 首页": "Beauty Training Demo home",
  "主要导航": "Main navigation",
  "测试版资料": "Test build details",
  "Beauty Training Demo 实际画面": "Actual Beauty Training Demo screen",
  "App 中正在练习自然底妆的手机画面": "Actual app screen practicing a natural base",
  "产品重点": "Product highlights",
  "化妆品展示，可左右滚动": "Makeup showcase, scroll horizontally to explore",
  "无品牌鲜粉色口红": "Unbranded vivid-pink lipstick",
  "无品牌粉色腮红盘": "Unbranded pink blush compact",
  "无品牌柔软化妆刷": "Unbranded soft makeup brush",
  "浅肤色练习脸的真实 App 画面": "Actual app screen with the light-skin practice face",
  "中肤色练习脸的真实 App 画面": "Actual app screen with the medium-skin practice face",
  "深肤色练习脸的真实 App 画面": "Actual app screen with the deep-skin practice face",
  "无品牌暖米色粉底瓶": "Unbranded warm-beige foundation bottle",
  "无品牌浅米色粉饼": "Unbranded ivory pressed powder compact",
  "无品牌玫瑰紫六色眼影盘": "Unbranded rose-plum six-pan eyeshadow palette",
  "无品牌莓红盖睫毛膏": "Unbranded berry-cap mascara",
  "无品牌莓果色唇彩": "Unbranded berry lip gloss",
  "浅肤色练习脸妆前": "Light-skin practice face before lip practice",
  "浅肤色练习脸完成唇色后": "Light-skin practice face after lip practice",
  "中肤色练习脸妆前": "Medium-skin practice face before lip practice",
  "中肤色练习脸完成唇色后": "Medium-skin practice face after lip practice",
  "深肤色练习脸妆前": "Deep-skin practice face before lip practice",
  "深肤色练习脸完成唇色后": "Deep-skin practice face after lip practice",
  "当前化妆教学步骤": "Current makeup lesson steps",
  "未来品牌色号选择概念": "Future brand shade concept",
  "示例唇色色号": "Example lip shades",
  "三种练习脸的妆前妆后对比": "Before and after across three practice faces",
};
document.querySelectorAll('.shade-swatches button').forEach((button, index) => {
  attributePairs[`示例色号 ${index + 1}`] = `Example shade ${index + 1}`;
});
const originalAttributes = [...document.querySelectorAll('[alt], [aria-label]')].flatMap((element) =>
  ['alt', 'aria-label'].filter((attribute) => element.hasAttribute(attribute)).map((attribute) => ({ element, attribute, value: element.getAttribute(attribute) })),
);

const zhTexts = {};
Object.entries(textPairs).forEach(([zh, en]) => {
  zhTexts[en] = zh;
});

const inputValuePairs = {
  "有用，我会想继续试": "Useful, I would keep trying it",
  "有潜力，但还要补内容": "Promising, but it needs more content",
  "暂时不适合我": "Not suitable for me yet",
  "妆前与护肤": "Skin prep",
  "修容与高光": "Contour and highlight",
  "睫毛教学": "Lash tutorial",
  "更多日常妆容": "More everyday looks",
  "品牌色号试妆": "Brand shade try-on",
};

const zhInputValues = {};
Object.entries(inputValuePairs).forEach(([zh, en]) => {
  zhInputValues[en] = zh;
});

const copyContent = {
  zh: {
    youtube:
      "我正在测试一款 Beauty Training Demo：一步一步练习底妆、眉毛、眼影、眼线、美瞳、唇妆和饰品搭配。你觉得这个 App 有用吗？你最希望它再增加哪一种化妆教学？如果未来可以选择真实品牌和色号，直接预览上脸效果，你会想用吗？",
    youtubeStatus: "YouTube 提问文案已复制。",
    feedbackIntro: "我体验了 Beauty Training Demo：",
    usefulness: "1. 我觉得它：",
    topics: "2. 我希望增加：",
    suggestion: "3. 其他建议：",
    none: "暂时没有",
    status: "反馈已复制，可以贴到 YouTube 留言。",
    placeholder: "例如：眼线怎样画得更自然、不同脸型怎样选腮红位置……",
    unselected: "未选择",
  },
  en: {
    youtube:
      "I am testing Beauty Training Demo: an interactive app for practicing foundation, brows, eyeshadow, eyeliner, color lenses, lip color, and accessories step by step. Would this app be useful to you? What makeup lesson should it add next? If it could use real brand shades and preview the color on your face in the future, would you try it?",
    youtubeStatus: "YouTube question copied.",
    feedbackIntro: "I tried Beauty Training Demo:",
    usefulness: "1. I think it is: ",
    topics: "2. I hope it adds: ",
    suggestion: "3. Other suggestion: ",
    none: "None for now",
    status: "Feedback copied. You can paste it into YouTube comments.",
    placeholder: "For example: how to make eyeliner look natural, or how to place blush for different face shapes...",
    unselected: "Not selected",
  },
};

function setStatus(message) {
  if (!status) return;
  window.clearTimeout(statusTimer);
  status.textContent = message;
  statusTimer = window.setTimeout(() => {
    status.textContent = "";
  }, 3500);
}

function replaceTextNode(node, lang) {
  const text = node.nodeValue;
  const trimmed = text.trim();
  if (!trimmed) return;

  const translated = lang === "en" ? textPairs[trimmed] : zhTexts[trimmed];
  if (!translated) return;
  node.nodeValue = text.replace(trimmed, translated);
}

function translatePage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
  document.querySelector(".landing-page")?.setAttribute("data-lang", lang);
  document.querySelector("[data-lang-toggle]")?.setAttribute("aria-pressed", String(lang === "en"));

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "SVG", "TITLE"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => replaceTextNode(node, lang));
  originalAttributes.forEach(({ element, attribute, value }) => {
    element.setAttribute(attribute, lang === 'en' ? (attributePairs[value] || value) : value);
  });
  document.querySelector('.nav-download')?.setAttribute('aria-label', lang === 'en' ? 'Download Android test build' : '下载 Android 测试版');
  document.querySelector('[data-lang-toggle]')?.setAttribute('aria-label', lang === 'en' ? '切换到中文' : 'Switch to English');
  if (status) status.textContent = '';

  const suggestion = document.querySelector("#feedback-suggestion");
  if (suggestion instanceof HTMLTextAreaElement) {
    suggestion.placeholder = copyContent[lang].placeholder;
  }

  document.querySelectorAll("#feedback-form input[value]").forEach((input) => {
    const nextValue = lang === "en" ? inputValuePairs[input.value] : zhInputValues[input.value];
    if (nextValue) input.value = nextValue;
  });

  document
    .querySelector('meta[name="description"]')
    ?.setAttribute(
      "content",
      lang === "en"
        ? "Beauty Training Demo is an interactive makeup learning prototype for practicing a natural look step by step and gathering product feedback."
        : "Beauty Training Demo 是一个互动化妆学习原型，让使用者一步一步练习自然妆，并参与决定下一步教学内容。",
    );
  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute(
      "content",
      lang === "en"
        ? "Practice makeup step by step and help decide what it should teach next."
        : "一步一步练习化妆，也一起决定它下一步该教什么。",
    );

  try { window.localStorage.setItem("beautyTrainingLandingLang", lang); } catch { /* Private browsing may disable storage. */ }
  window.dispatchEvent(new Event('landing:language'));
  window.ScrollTrigger?.refresh();
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch { /* Fall through for non-secure previews or denied clipboard access. */ }
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error('Clipboard unavailable');
}

const isLocal = ["127.0.0.1", "localhost"].includes(window.location.hostname);
const isVisualPreview = ["raw.githack.com", "rawgit.com"].includes(window.location.hostname);
// Local review points to the candidate build. Public links stay on the existing
// released APK until CJ approves and the release assets are published.
const apkFileName = isLocal ? "Beauty_Training_Demo_2.7.0_Test.apk" : "Beauty_Training_Demo_2.6.0_Test.apk";
const demoUrl = isLocal
  ? `${window.location.protocol}//${window.location.hostname}:4182/`
  : isVisualPreview
    ? "./demo-v2/"
  : new URL("./demo/", window.location.href).href;
const apkUrl = isLocal
  ? `./downloads/${apkFileName}`
  : `https://github.com/CJchan09/beauty-training-demo/releases/latest/download/${apkFileName}`;

document.querySelectorAll("[data-demo-link]").forEach((link) => {
  link.href = demoUrl;
});

document.querySelectorAll("[data-apk-link]").forEach((link) => {
  link.href = apkUrl;
  link.download = apkFileName;
});

if (isLocal) {
  document.querySelector('[data-apk-version]').textContent = 'ANDROID TEST BUILD · V2.7.0';
  document.querySelector('[data-apk-details]').textContent = 'Android 7.0+ · 约 216 MiB（227 MB）· 本地测试版';
}

let savedLang;
try { savedLang = window.localStorage.getItem("beautyTrainingLandingLang"); } catch { /* Language still works without persistence. */ }
translatePage(savedLang === "en" ? "en" : "zh");

document.querySelector("[data-lang-toggle]")?.addEventListener("click", () => {
  translatePage(currentLang === "en" ? "zh" : "en");
});

document.querySelector("[data-copy-youtube]")?.addEventListener("click", async () => {
  try {
    await copyText(copyContent[currentLang].youtube);
    setStatus(copyContent[currentLang].youtubeStatus);
  } catch {
    setStatus(currentLang === 'en' ? 'Copy was blocked. Please allow clipboard access and try again.' : '复制被浏览器阻止，请允许剪贴板权限后重试。');
  }
});

document.querySelector("[data-copy-feedback]")?.addEventListener("click", async () => {
  const form = document.querySelector("#feedback-form");
  if (!(form instanceof HTMLFormElement)) return;

  const data = new FormData(form);
  const usefulness = data.get("usefulness") || copyContent[currentLang].unselected;
  const topics = data.getAll("topic");
  const suggestion = String(data.get("suggestion") || "").trim();
  const message = [
    copyContent[currentLang].feedbackIntro,
    `${copyContent[currentLang].usefulness}${usefulness}`,
    `${copyContent[currentLang].topics}${topics.length ? topics.join(currentLang === "en" ? ", " : "、") : copyContent[currentLang].none}`,
    `${copyContent[currentLang].suggestion}${suggestion || copyContent[currentLang].none}`,
  ].join("\n");

  try {
    await copyText(message);
    setStatus(copyContent[currentLang].status);
  } catch {
    setStatus(currentLang === 'en' ? 'Copy was blocked. Please allow clipboard access and try again.' : '复制被浏览器阻止，请允许剪贴板权限后重试。');
  }
});

// The shade lab remains an explicitly labelled future concept; selection only
// changes its sample swatch, never simulates a brand result or a live try-on.
document.querySelectorAll('.shade-swatches button').forEach((button, index) => {
  button.setAttribute('aria-pressed', String(index === 0));
  button.addEventListener('click', () => {
    document.querySelectorAll('.shade-swatches button').forEach((swatch) => swatch.setAttribute('aria-pressed', String(swatch === button)));
    document.querySelector('.shade-lab')?.style.setProperty('--selected-shade', button.style.backgroundColor);
  });
});

// Enhancement only: every chapter is visible and swipeable without GSAP.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('[data-motion-toggle]');
const table = document.querySelector('.makeup-table');
const tableViewport = document.querySelector('.table-viewport');
const track = document.querySelector('.table-track');
const progressBar = document.querySelector('.table-progress span');
let motionPaused = false;
let mediaContext;
let floatTweens = [];
let heroObserver;
let heroVisible = true;
let tableTrigger;
try { motionPaused = window.localStorage.getItem('beautyTrainingMotionPaused') === 'true'; } catch { /* Optional preference. */ }

function updateMotionLabels() {
  motionButton?.setAttribute('aria-pressed', String(motionPaused));
  if (motionButton) motionButton.textContent = currentLang === 'en' ? (motionPaused ? 'Play motion' : 'Pause motion') : (motionPaused ? '开启动画' : '暂停动画');
  const hint = document.querySelector('.table-hint');
  if (hint) {
    const text = table?.classList.contains('is-pinned')
      ? (currentLang === 'en' ? 'Scroll to explore your beauty table ↓' : '往下滚动，探索化妆台 ↓')
      : (currentLang === 'en' ? 'Swipe to explore your beauty table →' : '向右滑动，探索化妆台 →');
    hint.textContent = text;
    hint.hidden = reducedMotion.matches;
  }
}

function syncFloatingMotion() {
  const canPlay = !document.hidden && heroVisible && !motionPaused && !reducedMotion.matches;
  floatTweens.forEach((tween) => canPlay ? tween.resume() : tween.pause());
}

function updateNativeProgress() {
  if (!tableViewport || !progressBar || tableTrigger) return;
  const distance = tableViewport.scrollWidth - tableViewport.clientWidth;
  const progress = distance > 0 ? tableViewport.scrollLeft / distance : 1;
  progressBar.style.transform = `scaleX(${.07 + .93 * progress})`;
}

function setupMotion() {
  heroObserver?.disconnect();
  heroObserver = undefined;
  mediaContext?.revert();
  mediaContext = undefined;
  floatTweens = [];
  tableTrigger = undefined;
  table?.classList.remove('is-pinned');
  if (tableViewport) tableViewport.scrollLeft = 0;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger || reducedMotion.matches || motionPaused) {
    if (motionButton) motionButton.hidden = !gsap || reducedMotion.matches;
    updateMotionLabels();
    updateNativeProgress();
    return;
  }
  if (motionButton) motionButton.hidden = false;
  gsap.registerPlugin(ScrollTrigger);
  mediaContext = gsap.matchMedia();
  mediaContext.add({ desktop: '(min-width: 1000px) and (min-height: 700px) and (pointer: fine)', mobile: '(max-width: 999px), (max-height: 699px), (pointer: coarse)' }, (context) => {
    const { desktop } = context.conditions;
    const props = gsap.utils.toArray('.hero-prop');
    const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
    entrance.from('.hero-copy > *', { opacity: 0, y: 22, stagger: .075, duration: desktop ? .8 : .45 }, 0)
      .from('.hero-phone-wrap', { opacity: 0, y: desktop ? 70 : 20, rotation: 3, duration: desktop ? 1.2 : .65 }, .1);
    props.forEach((prop, index) => {
      entrance.from(prop, { opacity: 0, x: desktop ? Number(prop.dataset.enterX) : Number(prop.dataset.enterX) * .3, y: desktop ? Number(prop.dataset.enterY) : Number(prop.dataset.enterY) * .3, duration: desktop ? 1.15 : .6 }, .25 + index * .1);
      const float = gsap.to(prop.querySelector('img'), { y: desktop ? -14 - index * 2 : -6, rotation: desktop ? (index % 2 ? -3 : 3) : 1.5, duration: 3.2 + index * .55, delay: 1.5 + index * .2, ease: 'sine.inOut', repeat: -1, yoyo: true });
      floatTweens.push(float);
    });
    gsap.utils.toArray('.face-study').forEach((element, index) => gsap.from(element, { opacity: 0, y: desktop ? 50 : 20, duration: .7, delay: index * .08, ease: 'power2.out', scrollTrigger: { trigger: '.face-gallery', start: 'top 88%', once: true } }));

    if (desktop && table && tableViewport && track) {
      table.classList.add('is-pinned');
      const distance = () => Math.max(0, track.scrollWidth - tableViewport.clientWidth);
      const tween = gsap.to(track, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: {
          trigger: table, start: 'top top', end: () => `+=${Math.round(distance() * .85)}`,
          pin: true, scrub: .55, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate(self) { if (progressBar) progressBar.style.transform = `scaleX(${.07 + .93 * self.progress})`; },
        },
      });
      tableTrigger = tween.scrollTrigger;
    }
    updateMotionLabels();
    syncFloatingMotion();
    return () => {
      table?.classList.remove('is-pinned');
      tableTrigger = undefined;
      floatTweens = [];
      updateMotionLabels();
      updateNativeProgress();
    };
  });
  if ('IntersectionObserver' in window) {
    heroObserver = new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; syncFloatingMotion(); }, { threshold: 0 });
    const hero = document.querySelector('.landing-hero');
    if (hero) heroObserver.observe(hero);
  }
  syncFloatingMotion();
  updateMotionLabels();
}

motionButton?.addEventListener('click', () => {
  motionPaused = !motionPaused;
  try { window.localStorage.setItem('beautyTrainingMotionPaused', String(motionPaused)); } catch { /* Optional preference. */ }
  setupMotion();
});
reducedMotion.addEventListener('change', setupMotion);
document.addEventListener('visibilitychange', syncFloatingMotion);
window.addEventListener('landing:language', updateMotionLabels);
tableViewport?.addEventListener('scroll', updateNativeProgress, { passive: true });
tableViewport?.addEventListener('keydown', (event) => {
  if (!tableTrigger || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const increment = event.key === 'ArrowRight' ? .5 : -.5;
  const progress = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : Math.min(1, Math.max(0, tableTrigger.progress + increment));
  window.scrollTo({ top: tableTrigger.start + progress * (tableTrigger.end - tableTrigger.start), behavior: 'smooth' });
});
window.addEventListener('resize', updateNativeProgress, { passive: true });
window.addEventListener('load', () => window.ScrollTrigger?.refresh(), { once: true });
setupMotion();
