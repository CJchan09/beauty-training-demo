const status = document.querySelector(".copy-status");
let statusTimer;

function setStatus(message) {
  if (!status) return;
  window.clearTimeout(statusTimer);
  status.textContent = message;
  statusTimer = window.setTimeout(() => {
    status.textContent = "";
  }, 3500);
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

document.querySelector("[data-copy-youtube]")?.addEventListener("click", async () => {
  await copyText(
    "我正在测试一款 Beauty Training Demo：一步一步练习底妆、眉毛、眼影、眼线、美瞳、唇妆和饰品搭配。你觉得这个 App 有用吗？你最希望它再增加哪一种化妆教学？如果未来可以选择真实品牌和色号，直接预览上脸效果，你会想用吗？",
  );
  setStatus("YouTube 提问文案已复制。");
});

document.querySelector("[data-copy-feedback]")?.addEventListener("click", async () => {
  const form = document.querySelector("#feedback-form");
  if (!(form instanceof HTMLFormElement)) return;

  const data = new FormData(form);
  const usefulness = data.get("usefulness") || "未选择";
  const topics = data.getAll("topic");
  const suggestion = String(data.get("suggestion") || "").trim();
  const message = [
    "我体验了 Beauty Training Demo：",
    `1. 我觉得它：${usefulness}`,
    `2. 我希望增加：${topics.length ? topics.join("、") : "暂时没有"}`,
    `3. 其他建议：${suggestion || "暂时没有"}`,
  ].join("\n");

  await copyText(message);
  setStatus("反馈已复制，可以贴到 YouTube 留言。");
});
