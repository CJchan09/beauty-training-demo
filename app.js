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
  "Interactive Makeup Learning Prototype": "Interactive Makeup Learning Prototype",
  "© 2026 · 当前页面用于产品验证与合作讨论。": "© 2026 · This page is for product validation and partnership discussion.",
};

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

  window.localStorage.setItem("beautyTrainingLandingLang", lang);
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

const isLocal = ["127.0.0.1", "localhost"].includes(window.location.hostname);
const apkFileName = "Beauty_Training_Demo_2.6.0_Test.apk";
const demoUrl = isLocal
  ? `${window.location.protocol}//${window.location.hostname}:4181/`
  : new URL("./demo/", window.location.href).href;
const apkUrl = isLocal
  ? `./downloads/${apkFileName}`
  : `https://github.com/CJchan09/beauty-training-demo/releases/latest/download/${apkFileName}`;

document.querySelectorAll("[data-demo-link]").forEach((link) => {
  link.href = demoUrl;
});

document.querySelectorAll("[data-apk-link]").forEach((link) => {
  link.href = apkUrl;
});

const savedLang = window.localStorage.getItem("beautyTrainingLandingLang");
translatePage(savedLang === "en" ? "en" : "zh");

document.querySelector("[data-lang-toggle]")?.addEventListener("click", () => {
  translatePage(currentLang === "en" ? "zh" : "en");
});

document.querySelector("[data-copy-youtube]")?.addEventListener("click", async () => {
  await copyText(copyContent[currentLang].youtube);
  setStatus(copyContent[currentLang].youtubeStatus);
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

  await copyText(message);
  setStatus(copyContent[currentLang].status);
});
