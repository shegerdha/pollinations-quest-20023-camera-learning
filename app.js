"use strict";

const MODEL = "openai/gpt-5.4-nano";
const MAX_EDGE = 1280;
const MAX_FILE_BYTES = 12 * 1024 * 1024;
const copy = {
  en: {
    tagline: "A pocket field guide",
    balance: "Your Pollinations balance",
    eyebrow: "A field guide for the curious",
    headline: "The world is full of small mysteries.",
    lede: "Point your camera at one. Get a clear explanation, the clues behind it, and something worth noticing next.",
    onePhoto: "One photo, one useful field note",
    lookHere: "LOOK CLOSELY",
    noPhoto: "No photo yet",
    photoReady: "Photo ready",
    emptyTitle: "Bring something into view",
    emptySubtitle: "Plants, street details, objects, textures. Start with whatever caught your eye.",
    localPreview: "Preview stays on this device",
    openCamera: "Open camera",
    choosePhoto: "Choose a photo",
    takePhoto: "Take photo",
    retake: "Choose another",
    privacy: "Your photo is sent only when you choose “Explain this photo.”",
    fieldNote: "FIELD NOTE",
    questionTitle: "What are we looking at?",
    questionHelp: "Choose a trail, then ask about a detail.",
    focusNature: "Nature",
    focusBuildings: "Buildings",
    focusObjects: "Everyday things",
    focusSurprise: "Surprise me",
    questionLabel: "A question to follow",
    optional: "OPTIONAL",
    questionPlaceholder: "Why are the leaves different colors?",
    analyze: "Explain this photo",
    connectHint: "Connect Pollinations above to analyze with your own balance.",
    connectedHint: "Connected. Your photo stays here until you ask for an explanation.",
    spendTitle: "Your balance stays yours.",
    spendText: "Connect with a one-day key capped at $0.05 for GPT-5.4 Nano. You can disconnect it any time.",
    resultTitle: "A note from the field",
    askAgain: "Ask about another detail",
    footerLeft: "Made for looking a little closer.",
    footerRight: "Images are resized in your browser before analysis.",
    needPhoto: "Choose or take a photo first.",
    needConnect: "Connect Pollinations above to use your own balance.",
    cameraUnavailable: "Camera access is not available here. Choose a photo instead.",
    cameraDenied: "Camera permission was blocked. You can still choose a photo.",
    cameraStarting: "Opening the camera…",
    cameraReady: "Camera ready. Frame a detail and take a photo.",
    fileTooLarge: "This image is over 12 MB. Choose a smaller photo.",
    imageInvalid: "That file could not be opened as an image.",
    analyzing: "Reading the visible clues…",
    sendNote: "Your photo is being sent to Pollinations for this explanation.",
    genericError: "The explanation could not be completed.",
    requestError: "Pollinations request failed",
    headings: "What I notice; Clues; Learn this; Look closer",
    focusPrompt: {
      nature: "nature, plants, animals, geology, or the sky",
      buildings: "buildings, architecture, street details, or materials",
      objects: "everyday objects, food, tools, or textures",
      surprise: "the most interesting visible detail"
    }
  },
  fa: {
    tagline: "راهنمای جیبیِ کشف",
    balance: "از موجودی پولینیشنز خودت",
    eyebrow: "برای کنجکاوها، یک راهنمای میدانی",
    headline: "دنیا پر از رازهای کوچک است.",
    lede: "دوربین را سمت یکی بگیر. توضیح روشن، نشانه‌های تصویر و چیزی که بعدش ارزش دیدن دارد را پیدا کن.",
    onePhoto: "یک عکس، یک یادداشت کاربردی",
    lookHere: "با دقت نگاه کن",
    noPhoto: "هنوز عکسی نیست",
    photoReady: "عکس آماده است",
    emptyTitle: "چیزی را جلوی دوربین بیاور",
    emptySubtitle: "گیاه، جزئیات خیابان، وسیله یا بافت؛ از هر چیزی که توجهت را جلب کرده شروع کن.",
    localPreview: "پیش‌نمایش روی همین دستگاه می‌ماند",
    openCamera: "بازکردن دوربین",
    choosePhoto: "انتخاب عکس",
    takePhoto: "گرفتن عکس",
    retake: "انتخاب عکس دیگر",
    privacy: "عکس فقط وقتی فرستاده می‌شود که «توضیح این عکس» را بزنی.",
    fieldNote: "یادداشت میدانی",
    questionTitle: "به چه چیزی نگاه می‌کنیم؟",
    questionHelp: "یک مسیر انتخاب کن و بعد دربارهٔ جزئیات بپرس.",
    focusNature: "طبیعت",
    focusBuildings: "ساختمان‌ها",
    focusObjects: "وسایل روزمره",
    focusSurprise: "غافلگیرم کن",
    questionLabel: "سؤال تکمیلی",
    optional: "اختیاری",
    questionPlaceholder: "چرا رنگ برگ‌ها با هم فرق دارد؟",
    analyze: "توضیح این عکس",
    connectHint: "برای تحلیل با موجودی خودت، بالا به پولینیشنز وصل شو.",
    connectedHint: "وصل شدی. عکس تا وقتی درخواست توضیح نکنی همین‌جا می‌ماند.",
    spendTitle: "موجودی‌ات دست خودت می‌ماند.",
    spendText: "اتصال یک‌روزه با سقف ۰٫۰۵ دلار برای GPT‑5.4 Nano؛ هر وقت بخواهی می‌توانی قطعش کنی.",
    resultTitle: "یادداشت میدانی",
    askAgain: "دربارهٔ جزئیات دیگری بپرس",
    footerLeft: "برای کمی دقیق‌تر دیدن.",
    footerRight: "عکس پیش از تحلیل در مرورگر کوچک می‌شود.",
    needPhoto: "اول یک عکس بگیر یا انتخاب کن.",
    needConnect: "برای استفاده از موجودی خودت، اول به پولینیشنز وصل شو.",
    cameraUnavailable: "دسترسی دوربین اینجا در دسترس نیست؛ می‌توانی عکس انتخاب کنی.",
    cameraDenied: "مجوز دوربین داده نشد؛ هنوز می‌توانی عکس انتخاب کنی.",
    cameraStarting: "دارم دوربین را باز می‌کنم…",
    cameraReady: "دوربین آماده است. کادر را ببند و عکس بگیر.",
    fileTooLarge: "حجم عکس بیشتر از ۱۲ مگابایت است؛ عکس کوچک‌تری انتخاب کن.",
    imageInvalid: "این فایل به‌عنوان عکس باز نشد.",
    analyzing: "دارم نشانه‌های تصویر را می‌خوانم…",
    sendNote: "عکس برای این توضیح به پولینیشنز فرستاده می‌شود.",
    genericError: "توضیح کامل نشد.",
    requestError: "درخواست پولینیشنز ناموفق بود",
    retry: "اتصال را بررسی کن و دوباره امتحان کن.",
    headings: "چیزی که می‌بینم؛ نشانه‌ها؛ چیز تازه‌ای که یاد گرفتم؛ بیشتر دقت کن",
    focusPrompt: {
      nature: "طبیعت، گیاهان، جانوران، زمین‌شناسی یا آسمان",
      buildings: "ساختمان‌ها، معماری، جزئیات خیابان یا مصالح",
      objects: "وسایل روزمره، خوراکی، ابزار یا بافت‌ها",
      surprise: "جالب‌ترین جزئیات قابل مشاهده"
    }
  }
};
const state = { language: "en", focus: "nature", stream: null, photo: null, photoUrl: null, busy: false };
const $ = (id) => document.getElementById(id);
const camera = $("camera");
const preview = $("photoPreview");
const fileInput = $("fileInput");
const connect = $("polliConnect");
const analyzeButton = $("analyzePhoto");
const result = $("result");
const resultCopy = $("resultCopy");
const cameraMessage = $("cameraMessage");

function setText(key, value) {
  const node = $(key);
  if (node) node.textContent = value;
}
function applyLanguage(language) {
  state.language = language;
  const words = copy[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  document.querySelectorAll("[data-copy]").forEach((node) => {
    const key = node.getAttribute("data-copy");
    if (words[key]) node.textContent = words[key];
  });
  $("questionInput").placeholder = words.questionPlaceholder;
  $("languageToggle").textContent = language === "en" ? "فارسی" : "English";
  $("languageToggle").setAttribute("aria-label", language === "en" ? "Switch to Persian" : "تغییر به انگلیسی");
  refreshPhotoState();
  syncConnection();
}
function refreshPhotoState() {
  setText("photoState", state.photo ? copy[state.language].photoReady : copy[state.language].noPhoto);
  analyzeButton.disabled = !state.photo || !getUserKey() || state.busy;
}
function getUserKey() {
  try { return connect && typeof connect.apiKey === "string" ? connect.apiKey : null; }
  catch (_) { return null; }
}
function syncConnection() {
  const words = copy[state.language];
  setText("connectHint", getUserKey() ? words.connectedHint : words.connectHint);
  refreshPhotoState();
}
function message(text, isError) {
  cameraMessage.textContent = text || "";
  cameraMessage.classList.toggle("error", Boolean(isError));
}
function stopCamera() {
  if (state.stream) {
    state.stream.getTracks().forEach((track) => track.stop());
    state.stream = null;
  }
  camera.srcObject = null;
  $("takePhoto").hidden = true;
}
function replacePhoto(blob) {
  if (state.photoUrl) URL.revokeObjectURL(state.photoUrl);
  state.photo = blob;
  state.photoUrl = URL.createObjectURL(blob);
  preview.src = state.photoUrl;
  preview.hidden = false;
  $("emptyScene").hidden = true;
  $("viewfinderCaption").hidden = false;
  $("retakePhoto").hidden = false;
  refreshPhotoState();
  message("");
  result.hidden = true;
}
async function openCamera() {
  const words = copy[state.language];
  message("");
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    message(words.cameraUnavailable, true);
    return;
  }
  stopCamera();
  message(words.cameraStarting);
  try {
    state.stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: { ideal: "environment" }, width: { ideal: 1600 }, height: { ideal: 1200 } }
    });
    camera.srcObject = state.stream;
    camera.hidden = false;
    await camera.play();
    preview.hidden = true;
    $("emptyScene").hidden = true;
    $("viewfinderCaption").hidden = true;
    $("takePhoto").hidden = false;
    $("retakePhoto").hidden = true;
    message(words.cameraReady);
  } catch (_) {
    stopCamera();
    camera.hidden = true;
    $("emptyScene").hidden = !state.photo;
    message(words.cameraDenied, true);
  }
}
function toBlobFromCanvas(canvas, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Image conversion failed")), "image/jpeg", quality);
  });
}
async function takePhoto() {
  if (!camera.videoWidth || !camera.videoHeight) return;
  const canvas = document.createElement("canvas");
  canvas.width = camera.videoWidth;
  canvas.height = camera.videoHeight;
  const context = canvas.getContext("2d", { alpha: false });
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(camera, 0, 0, canvas.width, canvas.height);
  const blob = await toBlobFromCanvas(canvas, 0.88);
  stopCamera();
  camera.hidden = true;
  replacePhoto(blob);
}
function readFile(file) {
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    message(copy[state.language].imageInvalid, true);
    return;
  }
  if (file.size > MAX_FILE_BYTES) {
    message(copy[state.language].fileTooLarge, true);
    return;
  }
  stopCamera();
  camera.hidden = true;
  replacePhoto(file);
}
function imageAsDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Could not read image"));
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.readAsDataURL(blob);
  });
}
async function compressForRequest(blob) {
  const bitmap = await createImageBitmap(blob);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d", { alpha: false });
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return toBlobFromCanvas(canvas, 0.78);
}
function focusName() {
  return copy[state.language].focusPrompt[state.focus];
}
function buildPrompt() {
  const words = copy[state.language];
  const question = $("questionInput").value.trim();
  const parts = [
    "You are Fieldnote, a careful and curious visual field guide.",
    "Respond in " + (state.language === "fa" ? "Persian" : "English") + ".",
    "Focus on " + focusName() + ".",
    "Describe only what is visible. Separate direct observations from plausible explanations.",
    "Do not identify people, infer sensitive traits, repeat private text, or make medical or safety-critical conclusions.",
    "Be concise and approachable. Use these four headings, each on its own line: " + words.headings + ".",
    "If uncertain, say what cannot be determined from the image."
  ];
  if (question) parts.push("The user's follow-up question is: " + question);
  return parts.join("\n");
}
function extractAnswer(data) {
  const content = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) return content.map((part) => part && (part.text || part.content) || "").join("\n").trim();
  return "";
}
async function analyze() {
  const words = copy[state.language];
  const key = getUserKey();
  if (!state.photo) { message(words.needPhoto, true); return; }
  if (!key) { message(words.needConnect, true); return; }
  state.busy = true;
  refreshPhotoState();
  result.hidden = false;
  result.setAttribute("aria-busy", "true");
  resultCopy.classList.remove("error");
  resultCopy.textContent = words.analyzing + " " + words.sendNote;
  $("askAgain").hidden = true;
  try {
    const photo = state.photo;
    const smaller = await compressForRequest(photo);
    const imageUrl = await imageAsDataUrl(smaller);
    const response = await fetch("https://gen.pollinations.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + key,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{
          role: "user",
          content: [
            { type: "text", text: buildPrompt() },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        }],
        max_tokens: 550
      }),
      signal: AbortSignal.timeout(45000)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const detail = data && data.error && data.error.message;
      throw new Error(detail || (words.requestError + " (" + response.status + ")."));
    }
    const answer = extractAnswer(data);
    if (!answer) throw new Error(words.genericError);
    resultCopy.textContent = answer;
    $("askAgain").hidden = false;
  } catch (error) {
    resultCopy.classList.add("error");
    resultCopy.textContent = (error && error.message) || words.genericError;
    $("askAgain").hidden = false;
  } finally {
    state.busy = false;
    result.setAttribute("aria-busy", "false");
    refreshPhotoState();
  }
}
function setFocus(button) {
  state.focus = button.dataset.focus;
  document.querySelectorAll(".focus-option").forEach((option) => {
    const selected = option === button;
    option.classList.toggle("selected", selected);
    option.setAttribute("aria-pressed", String(selected));
  });
}
$("languageToggle").addEventListener("click", () => applyLanguage(state.language === "en" ? "fa" : "en"));
$("openCamera").addEventListener("click", openCamera);
$("choosePhoto").addEventListener("click", () => fileInput.click());
$("retakePhoto").addEventListener("click", () => fileInput.click());
$("takePhoto").addEventListener("click", takePhoto);
fileInput.addEventListener("change", (event) => {
  readFile(event.target.files && event.target.files[0]);
  fileInput.value = "";
});
document.querySelectorAll(".focus-option").forEach((button) => button.addEventListener("click", () => setFocus(button)));
analyzeButton.addEventListener("click", analyze);
$("askAgain").addEventListener("click", () => {
  $("questionInput").focus();
  $("questionInput").scrollIntoView({ behavior: "smooth", block: "center" });
});
if (connect) connect.addEventListener("change", syncConnection);
window.addEventListener("pagehide", () => {
  stopCamera();
  if (state.photoUrl) URL.revokeObjectURL(state.photoUrl);
});
applyLanguage("en");
