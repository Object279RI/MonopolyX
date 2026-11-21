/**
 * ============================================================================
 * MONOPOLYX - CLIENT-SIDE VANILLA JAVASCRIPT ENGINE
 * ============================================================================
 * Fitur Unggulan:
 * - Rebranded to MonopolyX
 * - Opsi Pion Foto Profil Upload
 * - Sistem Upgrade 3 Tingkat & Landmark (Maksimal Rp 20.000.000)
 * - Fitur Ambil Alih Properti Lawan (Takeover 1.5x nilai properti)
 * - Fitur Bebas Parkir (Bebas Pilih Kotak Tujuan di Papan)
 * - 3D CSS Dice Roll dengan Web Audio API sound synthesis
 * - AI Bot Cerdas & Natural (Delay 1-1.5 detik per aksi)
 */

// ==========================================
// 1. DATA PETAK PAPAN (40 CELLS)
// ==========================================
const BOARD_DATA = [
  { id: 0, name: "START", type: "start", desc: "Terima Rp 2.000.000 saat lewat/mendarat" },
  { id: 1, name: "Medan", type: "property", group: "brown", color: "#8B4513", price: 600000, rent: [20000, 100000, 300000, 600000, 900000, 1200000], housePrice: 500000 },
  { id: 2, name: "Dana Umum", type: "chest", icon: "📦" },
  { id: 3, name: "Palembang", type: "property", group: "brown", color: "#8B4513", price: 600000, rent: [40000, 200000, 600000, 1200000, 1800000, 2400000], housePrice: 500000 },
  { id: 4, name: "Pajak Penghasilan", type: "tax", amount: 2000000, icon: "💸" },
  { id: 5, name: "St. Gambir", type: "station", price: 2000000, icon: "🚂" },
  { id: 6, name: "Semarang", type: "property", group: "lightblue", color: "#87CEEB", price: 1000000, rent: [60000, 300000, 900000, 1800000, 2700000, 3600000], housePrice: 500000 },
  { id: 7, name: "Kesempatan", type: "chance", icon: "❓" },
  { id: 8, name: "Yogyakarta", type: "property", group: "lightblue", color: "#87CEEB", price: 1000000, rent: [60000, 300000, 900000, 1800000, 2700000, 3600000], housePrice: 500000 },
  { id: 9, name: "Solo", type: "property", group: "lightblue", color: "#87CEEB", price: 1200000, rent: [80000, 400000, 1200000, 2400000, 3600000, 4800000], housePrice: 500000 },
  { id: 10, name: "Penjara", type: "jail", icon: "🔒" },
  { id: 11, name: "Bandung", type: "property", group: "pink", color: "#FF69B4", price: 1400000, rent: [100000, 500000, 1500000, 3000000, 4500000, 6000000], housePrice: 1000000 },
  { id: 12, name: "PLN (Listrik)", type: "utility", price: 1500000, icon: "⚡" },
  { id: 13, name: "Surabaya", type: "property", group: "pink", color: "#FF69B4", price: 1400000, rent: [100000, 500000, 1500000, 3000000, 4500000, 6000000], housePrice: 1000000 },
  { id: 14, name: "Malang", type: "property", group: "pink", color: "#FF69B4", price: 1600000, rent: [120000, 600000, 1800000, 3600000, 5400000, 7200000], housePrice: 1000000 },
  { id: 15, name: "Bandara Soetta", type: "station", price: 2000000, icon: "✈️" },
  { id: 16, name: "Makassar", type: "property", group: "orange", color: "#FF8C00", price: 1800000, rent: [140000, 700000, 2100000, 4200000, 6300000, 8400000], housePrice: 1000000 },
  { id: 17, name: "Dana Umum", type: "chest", icon: "📦" },
  { id: 18, name: "Manado", type: "property", group: "orange", color: "#FF8C00", price: 1800000, rent: [140000, 700000, 2100000, 4200000, 6300000, 8400000], housePrice: 1000000 },
  { id: 19, name: "Denpasar", type: "property", group: "orange", color: "#FF8C00", price: 2000000, rent: [160000, 800000, 2400000, 4800000, 7200000, 9600000], housePrice: 1000000 },
  { id: 20, name: "Parkir Bebas", type: "free", icon: "🚗" },
  { id: 21, name: "Balikpapan", type: "property", group: "red", color: "#E74C3C", price: 2200000, rent: [180000, 900000, 2700000, 5400000, 8100000, 10800000], housePrice: 1500000 },
  { id: 22, name: "Kesempatan", type: "chance", icon: "❓" },
  { id: 23, name: "Pontianak", type: "property", group: "red", color: "#E74C3C", price: 2200000, rent: [180000, 900000, 2700000, 5400000, 8100000, 10800000], housePrice: 1500000 },
  { id: 24, name: "Banjarmasin", type: "property", group: "red", color: "#E74C3C", price: 2400000, rent: [200000, 1000000, 3000000, 6000000, 9000000, 12000000], housePrice: 1500000 },
  { id: 25, name: "St. Tugu", type: "station", price: 2000000, icon: "🚂" },
  { id: 26, name: "Bogor", type: "property", group: "yellow", color: "#F1C40F", price: 2600000, rent: [220000, 1100000, 3300000, 6600000, 9900000, 13200000], housePrice: 1500000 },
  { id: 27, name: "Depok", type: "property", group: "yellow", color: "#F1C40F", price: 2600000, rent: [220000, 1100000, 3300000, 6600000, 9900000, 13200000], housePrice: 1500000 },
  { id: 28, name: "PDAM (Air)", type: "utility", price: 1500000, icon: "💧" },
  { id: 29, name: "Tangerang", type: "property", group: "yellow", color: "#F1C40F", price: 2800000, rent: [240000, 1200000, 3600000, 7200000, 10800000, 14400000], housePrice: 1500000 },
  { id: 30, name: "Masuk Penjara", type: "gotojail", icon: "👮" },
  { id: 31, name: "Bekasi", type: "property", group: "green", color: "#2ECC71", price: 3000000, rent: [260000, 1300000, 3900000, 7800000, 11700000, 15600000], housePrice: 2000000 },
  { id: 32, name: "Batam", type: "property", group: "green", color: "#2ECC71", price: 3000000, rent: [260000, 1300000, 3900000, 7800000, 11700000, 15600000], housePrice: 2000000 },
  { id: 33, name: "Dana Umum", type: "chest", icon: "📦" },
  { id: 34, name: "Padang", type: "property", group: "green", color: "#2ECC71", price: 3200000, rent: [280000, 1500000, 4500000, 9000000, 13500000, 18000000], housePrice: 2000000 },
  { id: 35, name: "Bandara Bali", type: "station", price: 2000000, icon: "✈️" },
  { id: 36, name: "Kesempatan", type: "chance", icon: "❓" },
  { id: 37, name: "Bali", type: "property", group: "darkblue", color: "#2C3E50", price: 3500000, rent: [350000, 1750000, 5000000, 11000000, 15000000, 20000000], housePrice: 2000000 },
  { id: 38, name: "Pajak Mewah", type: "tax", amount: 1000000, icon: "💎" },
  { id: 39, name: "Jakarta", type: "property", group: "darkblue", color: "#2C3E50", price: 4000000, rent: [500000, 2000000, 6000000, 14000000, 17000000, 25000000], housePrice: 2000000 }
];

// Color group groupings
const COLOR_GROUPS = {
  brown: [1, 3],
  lightblue: [6, 8, 9],
  pink: [11, 13, 14],
  orange: [16, 18, 19],
  red: [21, 23, 24],
  yellow: [26, 27, 29],
  green: [31, 32, 34],
  darkblue: [37, 39]
};

const STATIONS = [5, 15, 25, 35];
const UTILITIES = [12, 28];

// ==========================================
// 2. KARTU DANA UMUM & KESEMPATAN
// ==========================================
const CHANCE_CARDS = [
  { text: "Maju sampai ke START! (Terima Rp 2.000.000)", action: "move_to", target: 0 },
  { text: "Terbang langsung ke Jakarta untuk urusan bisnis!", action: "move_to", target: 39 },
  { text: "Liburan mendadak ke Bali! Maju ke petak Bali.", action: "move_to", target: 37 },
  { text: "Maju ke Stasiun Gambir terdekat.", action: "move_to", target: 5 },
  { text: "Bank membagikan dividen investasi. Terima Rp 1.500.000", action: "money", amount: 1500000 },
  { text: "Mundur 3 petak ke belakang.", action: "move_steps", steps: -3 },
  { text: "Melanggar lampu merah! Bayar tilang Rp 200.000 ke kas umum.", action: "money", amount: -200000 },
  { text: "Renovasi seluruh asetmu! Bayar Rp 250.000 per rumah & Rp 1.000.000 per hotel.", action: "repairs", house: 250000, hotel: 1000000 },
  { text: "Kartu Bebas Penjara! Simpan kartu ini untuk digunakan nanti.", action: "jail_free" },
  { text: "Tertangkap operasi tertib! Masuk Penjara sekarang juga!", action: "go_jail" },
  { text: "Ulang tahun! Dapatkan hadiah Rp 200.000 dari masing-masing pemain.", action: "collect_all", amount: 200000 },
  { text: "Keuntungan ekspor kopi nusantara! Dapatkan Rp 1.000.000.", action: "money", amount: 1000000 }
];

const CHEST_CARDS = [
  { text: "Kesalahan perhitungan bank yang menguntungkan Anda! Terima Rp 2.000.000.", action: "money", amount: 2000000 },
  { text: "Bayar biaya periksa dokter dan vitamin Rp 500.000.", action: "money", amount: -500000 },
  { text: "Penjualan kain batik sukses besar! Terima Rp 800.000.", action: "money", amount: 800000 },
  { text: "Maju langsung ke petak START! Terima Rp 2.000.000.", action: "move_to", target: 0 },
  { text: "Menerima warisan keluarga berupa uang tunai Rp 1.200.000.", action: "money", amount: 1200000 },
  { text: "Kartu Bebas Penjara! Simpan untuk keluar dari penjara secara gratis.", action: "jail_free" },
  { text: "Bayar asuransi kesehatan tahunan Rp 600.000.", action: "money", amount: -600000 },
  { text: "Kembalian kelebihan bayar pajak (Tax Refund)! Dapatkan Rp 400.000.", action: "money", amount: 400000 },
  { text: "Masuk Penjara! Jangan lewat START, jangan terima Rp 2.000.000.", action: "go_jail" },
  { text: "Juara kompetisi inovasi startup nasional! Dapatkan hadiah Rp 1.500.000.", action: "money", amount: 1500000 },
  { text: "Traktir makan malam bersama teman. Bayar Rp 150.000 ke setiap pemain.", action: "pay_all", amount: 150000 },
  { text: "Investasi emas digital cair! Terima laba Rp 750.000.", action: "money", amount: 750000 }
];

// ==========================================
// 3. SOUND ENGINE (WEB AUDIO API - ZERO EXTERNAL FILES)
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, duration, type = 'sine', gainVal = 0.15) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio playTone error", e);
    }
  }

  dice() {
    this.init();
    if (!this.ctx) return;
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        this.playTone(180 + Math.random() * 240, 0.04, 'triangle', 0.2);
      }, i * 70);
    }
  }

  hop() {
    this.playTone(420, 0.06, 'sine', 0.2);
  }

  buy() {
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((f, idx) => {
      setTimeout(() => this.playTone(f, 0.12, 'triangle', 0.25), idx * 80);
    });
  }

  rent() {
    this.init();
    if (!this.ctx) return;
    this.playTone(600, 0.08, 'sawtooth', 0.15);
    setTimeout(() => this.playTone(350, 0.18, 'sawtooth', 0.18), 70);
  }

  card() {
    this.init();
    if (!this.ctx) return;
    this.playTone(700, 0.08, 'sine', 0.15);
    setTimeout(() => this.playTone(950, 0.15, 'sine', 0.2), 80);
  }

  build() {
    this.init();
    if (!this.ctx) return;
    this.playTone(280, 0.08, 'square', 0.25);
    setTimeout(() => this.playTone(340, 0.12, 'square', 0.25), 90);
  }

  jail() {
    this.init();
    if (!this.ctx) return;
    this.playTone(180, 0.3, 'sawtooth', 0.3);
    setTimeout(() => this.playTone(110, 0.4, 'sawtooth', 0.35), 180);
  }

  win() {
    this.init();
    if (!this.ctx) return;
    const fanfare = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
    fanfare.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 0.2, 'triangle', 0.3), i * 140);
    });
  }
}

const sounds = new SoundFX();

// ==========================================
// 4. GAME STATE
// ==========================================
const gameState = {
  players: [],
  currentPlayerIndex: 0,
  doublesStreak: 0,
  diceValues: [1, 1],
  chanceDeck: [],
  chestDeck: [],
  propertiesState: {}, // cellId: { ownerId, houses: 0 }
  isRolling: false,
  isMoving: false,
  gameStarted: false,
  pendingLanding: null,
  activePendingModal: null
};

// ==========================================
// 5. HELPER FUNCTIONS
// ==========================================
function formatMoney(amount) {
  const num = Math.round(amount || 0);
  const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `Rp ${formatted}`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function addLog(msg, type = "normal") {
  const list = document.getElementById("log-list");
  if (!list) return;
  const li = document.createElement("li");
  li.className = `log-item ${type}`;
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  li.innerHTML = `<span class="log-time">[${time}]</span> <span class="log-msg">${msg}</span>`;
  list.insertBefore(li, list.firstChild);
  while (list.children.length > 50) {
    list.removeChild(list.lastChild);
  }
}

// Floating money animation above player cards
function showMoneyAnimation(playerId, amount) {
  const card = document.getElementById(`player-card-${playerId}`);
  const container = document.getElementById("money-anim-container");
  if (!card || !container || amount === 0) return;

  const rect = card.getBoundingClientRect();
  const el = document.createElement("div");
  const isPos = amount > 0;
  el.className = `money-float ${isPos ? 'money-plus' : 'money-minus'}`;
  el.innerText = `${isPos ? '+' : ''}${formatMoney(amount)}`;
  el.style.left = `${rect.left + rect.width / 2 - 40}px`;
  el.style.top = `${rect.top - 10}px`;
  container.appendChild(el);

  setTimeout(() => {
    if (el.parentNode) el.parentNode.removeChild(el);
  }, 1600);
}

// Smooth count-up / count-down for money display
function animateMoneyCount(playerId, targetAmount) {
  const card = document.getElementById(`player-card-${playerId}`);
  if (!card) return;
  const moneyEl = card.querySelector(".player-money");
  if (!moneyEl) return;

  const currentText = moneyEl.getAttribute("data-value") || "0";
  const start = parseInt(currentText, 10);
  const end = targetAmount;
  moneyEl.setAttribute("data-value", end);

  const duration = 600;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * easeProgress);
    moneyEl.innerText = formatMoney(current);
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      moneyEl.innerText = formatMoney(end);
    }
  }
  requestAnimationFrame(update);
}

// ==========================================
// 6. PROFIL PEMAIN & LOCALSTORAGE
// ==========================================
const DEFAULT_PROFILE = {
  name: "Pemain 1",
  avatar: "👨",
  pion: "🏎️",
  pionPhoto: "",
  color: "#FF6B35",
  botsCount: 2
};

function loadSavedProfile() {
  try {
    const raw = localStorage.getItem("monopolyx_user_profile") || localStorage.getItem("monopoli_user_profile");
    if (raw) return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch (e) {
    console.warn("Failed to load profile", e);
  }
  return { ...DEFAULT_PROFILE };
}

function saveProfile(profile) {
  try {
    localStorage.setItem("monopolyx_user_profile", JSON.stringify(profile));
  } catch (e) {
    console.warn("Failed to save profile", e);
  }
}

// ==========================================
// LANDMARK & UPGRADE HELPERS
// ==========================================
function getLandmarkMaxCap(cell) {
  if (cell.price <= 800000) return 8000000;
  if (cell.price <= 1200000) return 10000000;
  if (cell.price <= 1600000) return 12000000;
  if (cell.price <= 2000000) return 14000000;
  if (cell.price <= 2400000) return 16000000;
  if (cell.price <= 2800000) return 18000000;
  return 20000000; // Bali & Jakarta mencapai Rp 20 Juta!
}

function getLandmarkMultiplier(cell) {
  if (cell.price <= 1000000) return 3;
  if (cell.price <= 2000000) return 4;
  return 5;
}

function getPropertyValue(cell, propState) {
  if (!propState || !propState.level) return cell.price;
  if (cell.type !== "property") return cell.price;
  const lvl = propState.level;
  if (lvl === 1) return cell.price;
  if (lvl === 2) return cell.price * 2;
  if (lvl === 3) return cell.price * 4;
  if (lvl === 4) {
    const cap = getLandmarkMaxCap(cell);
    return Math.min(cap, cell.price * 8);
  }
  return cell.price;
}

function getUpgradeCost(cell, currentLevel) {
  const base = cell.housePrice || Math.round(cell.price * 0.5);
  if (currentLevel === 1) return base; // Upgrade ke Level 2 (harga awal update)
  if (currentLevel === 2) return Math.round(base * 1.25); // Upgrade ke Level 3 (+25% dari harga awal)
  if (currentLevel === 3) return Math.round(base * 1.50); // Upgrade ke Landmark (+50% dari harga awal)
  return 0;
}

// ==========================================
// 7. INITIALIZE LOBBY
// ==========================================
function initLobby() {
  const profile = loadSavedProfile();

  const nameInput = document.getElementById("player-name");
  const avatarPreview = document.getElementById("avatar-preview");
  const colorInput = document.getElementById("color-select");
  const botSelect = document.getElementById("bot-count-select");
  const avatarUploadInput = document.getElementById("avatar-upload-input");
  const pionUploadInput = document.getElementById("pion-upload-input");
  const pionUploadWrap = document.getElementById("pion-upload-wrap");
  const pionPhotoPreview = document.getElementById("pion-photo-preview");

  if (nameInput) nameInput.value = profile.name;
  if (colorInput) colorInput.value = profile.color;
  if (botSelect) botSelect.value = profile.botsCount.toString();

  // Update avatar preview
  function updateAvatarPreview(val) {
    if (!avatarPreview) return;
    if (val && (val.startsWith("data:image") || val.startsWith("http"))) {
      avatarPreview.innerHTML = `<img src="${val}" alt="Avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
    } else {
      avatarPreview.innerText = val || "👨";
    }
  }
  updateAvatarPreview(profile.avatar);

  // Update pion photo preview
  function updatePionPhotoPreview(val) {
    if (!pionPhotoPreview) return;
    if (val && (val.startsWith("data:image") || val.startsWith("http"))) {
      pionPhotoPreview.innerHTML = `<img src="${val}" alt="Pion" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
    } else {
      pionPhotoPreview.innerText = "📷";
    }
  }
  updatePionPhotoPreview(profile.pionPhoto);

  if (pionUploadWrap) {
    pionUploadWrap.style.display = (profile.pion === "custom_photo") ? "block" : "none";
  }

  // Avatar button selection
  const avatarButtons = document.querySelectorAll(".avatar-option");
  avatarButtons.forEach(btn => {
    if (btn.getAttribute("data-avatar") === profile.avatar) {
      btn.classList.add("selected");
    }
    btn.addEventListener("click", () => {
      avatarButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      const chosen = btn.getAttribute("data-avatar");
      profile.avatar = chosen;
      updateAvatarPreview(chosen);
      saveProfile(profile);
      sounds.init();
      sounds.hop();
    });
  });

  // Upload Avatar image via FileReader
  if (avatarUploadInput) {
    avatarUploadInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          profile.avatar = dataUrl;
          avatarButtons.forEach(b => b.classList.remove("selected"));
          updateAvatarPreview(dataUrl);
          saveProfile(profile);
          sounds.init();
          sounds.card();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Upload separate Pion image via FileReader
  if (pionUploadInput) {
    pionUploadInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          profile.pionPhoto = dataUrl;
          updatePionPhotoPreview(dataUrl);
          saveProfile(profile);
          sounds.init();
          sounds.card();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Pion selection
  const pionButtons = document.querySelectorAll(".pion-option");
  pionButtons.forEach(btn => {
    if (btn.getAttribute("data-pion") === profile.pion) {
      btn.classList.add("selected");
    }
    btn.addEventListener("click", () => {
      pionButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      const chosen = btn.getAttribute("data-pion");
      profile.pion = chosen;
      if (pionUploadWrap) {
        pionUploadWrap.style.display = (chosen === "custom_photo") ? "block" : "none";
      }
      saveProfile(profile);
      sounds.init();
      sounds.hop();
    });
  });

  // Color picker
  if (colorInput) {
    colorInput.addEventListener("input", (e) => {
      profile.color = e.target.value;
      saveProfile(profile);
    });
  }

  // Bot count
  if (botSelect) {
    botSelect.addEventListener("change", (e) => {
      profile.botsCount = parseInt(e.target.value, 10);
      saveProfile(profile);
    });
  }

  // Name change
  if (nameInput) {
    nameInput.addEventListener("input", (e) => {
      profile.name = e.target.value.trim() || "Pemain 1";
      saveProfile(profile);
    });
  }

  // Rules Modal
  const rulesBtn = document.getElementById("rules-btn");
  const rulesModal = document.getElementById("rules-modal");
  const rulesClose = document.getElementById("rules-close");
  if (rulesBtn && rulesModal) {
    rulesBtn.addEventListener("click", () => {
      rulesModal.classList.add("active");
      rulesModal.style.display = "flex";
      sounds.init();
      sounds.card();
    });
  }
  if (rulesClose && rulesModal) {
    rulesClose.addEventListener("click", () => {
      rulesModal.classList.remove("active");
      rulesModal.style.display = "none";
    });
  }

  // Start Game Button
  const startBtn = document.getElementById("start-btn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      sounds.init();
      sounds.dice();
      startGame(profile);
    });
  }
}

// ==========================================
// 8. GAME SETUP & INITIALIZATION
// ==========================================
const BOT_PRESETS = [
  { name: "Budi (Bot)", avatar: "🧑‍💼", pion: "🎩", color: "#3498DB" },
  { name: "Siti (Bot)", avatar: "👩‍💼", pion: "🚢", color: "#E74C3C" },
  { name: "Andi (Bot)", avatar: "🧑‍🔬", pion: "🤖", color: "#2ECC71" }
];

function startGame(humanProfile) {
  // Setup players array
  const players = [];

  // Human player
  players.push({
    id: 0,
    name: humanProfile.name || "Pemain 1",
    avatar: humanProfile.avatar || "👨",
    pion: humanProfile.pion || "🏎️",
    pionPhoto: humanProfile.pionPhoto || "",
    color: humanProfile.color || "#FF6B35",
    isBot: false,
    money: 15000000,
    position: 0,
    properties: [],
    lapsCompleted: 0,
    inJail: false,
    jailTurns: 0,
    jailFreeCards: 0,
    isBankrupt: false
  });

  // Bots
  const botCount = humanProfile.botsCount || 2;
  for (let i = 0; i < botCount; i++) {
    const preset = BOT_PRESETS[i % BOT_PRESETS.length];
    // Ensure unique pion & color from human
    let botPion = preset.pion;
    if (botPion === humanProfile.pion) {
      botPion = (botPion === "🐱") ? "🚀" : "🐱";
    }
    players.push({
      id: i + 1,
      name: preset.name,
      avatar: preset.avatar,
      pion: botPion,
      pionPhoto: "",
      color: preset.color,
      isBot: true,
      money: 15000000,
      position: 0,
      properties: [],
      lapsCompleted: 0,
      inJail: false,
      jailTurns: 0,
      jailFreeCards: 0,
      isBankrupt: false
    });
  }

  gameState.players = players;
  gameState.currentPlayerIndex = 0;
  gameState.doublesStreak = 0;
  gameState.chanceDeck = shuffle(CHANCE_CARDS);
  gameState.chestDeck = shuffle(CHEST_CARDS);
  gameState.propertiesState = {};
  gameState.gameStarted = true;

  // Initialize properties state
  BOARD_DATA.forEach(cell => {
    if (cell.type === "property" || cell.type === "station" || cell.type === "utility") {
      gameState.propertiesState[cell.id] = { ownerId: null, level: 0, houses: 0, lastUpgradeLap: 0 };
    }
  });

  // Switch screens
  const lobbyScreen = document.getElementById("lobby-screen");
  const gameScreen = document.getElementById("game-screen");
  if (lobbyScreen) lobbyScreen.style.display = "none";
  if (gameScreen) {
    gameScreen.style.display = "flex";
    gameScreen.classList.add("active");
  }

  // Render players cards in side panel
  renderPlayerCards();

  // Render board pawns
  renderAllPions();

  // Attach controls listeners
  setupGameControls();

  addLog("🎮 Permainan MonopolyX dimulai! Selamat bermain!", "highlight");
  addLog(`Giliran pertama: ${players[0].name}`);

  updateTurnUI();
}

// Render player cards
function renderPlayerCards() {
  gameState.players.forEach((p, idx) => {
    const card = document.getElementById(`player-card-${idx}`);
    if (!card) return;
    card.style.display = "flex";

    const avatarDiv = card.querySelector(".player-avatar");
    if (avatarDiv) {
      if (p.avatar.startsWith("data:image") || p.avatar.startsWith("http")) {
        avatarDiv.innerHTML = `<img src="${p.avatar}" alt="${p.name}">`;
      } else {
        avatarDiv.innerText = p.avatar;
      }
    }

    const nameDiv = card.querySelector(".player-name-display") || card.querySelector(".player-name");
    if (nameDiv) nameDiv.innerText = p.name;

    const pionDiv = card.querySelector(".player-pion-display") || card.querySelector(".player-pion");
    if (pionDiv) {
      if (p.pion === "custom_photo") {
        const photoSrc = p.pionPhoto || (p.avatar && (p.avatar.startsWith("data:image") || p.avatar.startsWith("http")) ? p.avatar : "");
        if (photoSrc) {
          pionDiv.innerHTML = `<span style="display:inline-flex;align-items:center;gap:6px;">
            <img src="${photoSrc}" alt="Pion" style="width:20px;height:20px;border-radius:50%;border:2px solid ${p.color};object-fit:cover;">
            <span style="font-size:0.75rem;color:#ddd;">Foto Pion</span>
          </span>`;
        } else {
          pionDiv.innerHTML = `<span style="display:inline-flex;align-items:center;gap:4px;">
            <span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${p.color};"></span>
            📷 Foto
          </span>`;
        }
      } else {
        pionDiv.innerHTML = `<span style="display:inline-flex;align-items:center;gap:4px;">
          <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${p.color};box-shadow:0 0 4px ${p.color};"></span>
          ${p.pion}
        </span>`;
      }
    }

    const moneyDiv = card.querySelector(".player-money");
    if (moneyDiv) {
      moneyDiv.innerText = formatMoney(p.money);
      moneyDiv.setAttribute("data-value", p.money);
    }

    const propsDiv = card.querySelector(".player-props-count") || card.querySelector(".player-properties");
    if (propsDiv) propsDiv.innerText = `🏠 ${p.properties.length} properti`;
  });

  // Hide unused cards
  for (let i = gameState.players.length; i < 4; i++) {
    const card = document.getElementById(`player-card-${i}`);
    if (card) card.style.display = "none";
  }
}

// ==========================================
// 9. RENDERING BOARD & 3D PIONS
// ==========================================
function renderAllPions() {
  // Clear all cell pions containers
  for (let i = 0; i < 40; i++) {
    const cell = document.getElementById(`cell-${i}`);
    if (cell) {
      const container = cell.querySelector(".pions-container");
      if (container) container.innerHTML = "";
    }
  }

  // Place active players' pawns
  gameState.players.forEach(p => {
    if (p.isBankrupt) return;
    const cell = document.getElementById(`cell-${p.position}`);
    if (cell) {
      let container = cell.querySelector(".pions-container");
      if (!container) {
        container = document.createElement("div");
        container.className = "pions-container";
        cell.appendChild(container);
      }

      const pionEl = document.createElement("div");
      pionEl.className = "pion";
      pionEl.id = `pion-player-${p.id}`;
      pionEl.style.backgroundColor = p.color;
      pionEl.title = p.name;

      // Custom photo pawn
      if (p.pion === "custom_photo") {
        pionEl.classList.add("pion-photo");
        pionEl.style.borderColor = p.color;
        const photoSrc = p.pionPhoto || (p.avatar && (p.avatar.startsWith("data:image") || p.avatar.startsWith("http")) ? p.avatar : "");
        if (photoSrc) {
          pionEl.innerHTML = `<img src="${photoSrc}" alt="${p.name}">`;
        } else {
          pionEl.innerText = "📷";
        }
      } else {
        pionEl.innerText = p.pion;
      }

      // Glow effect if this player's active turn
      if (p.id === gameState.currentPlayerIndex) {
        pionEl.style.boxShadow = `0 0 10px 2px ${p.color}, inset 0 2px 3px rgba(255,255,255,0.8)`;
      }

      container.appendChild(pionEl);
    }
  });
}

function updateCellOwnershipUI(cellId) {
  const cellEl = document.getElementById(`cell-${cellId}`);
  const state = gameState.propertiesState[cellId];
  if (!cellEl || !state) return;

  const owner = gameState.players.find(p => p.id === state.ownerId);
  let indicator = cellEl.querySelector(".owner-indicator");

  if (owner) {
    cellEl.classList.add("owned");
    cellEl.style.borderColor = owner.color;
    if (!indicator) {
      indicator = document.createElement("div");
      indicator.className = "owner-indicator";
      cellEl.appendChild(indicator);
    }
    indicator.style.backgroundColor = owner.color;
    indicator.title = `Milik: ${owner.name}`;

    // Update level / landmark visuals
    let housesContainer = cellEl.querySelector(".houses-container");
    if (!housesContainer) {
      housesContainer = document.createElement("div");
      housesContainer.className = "houses-container";
      cellEl.appendChild(housesContainer);
    }
    housesContainer.innerHTML = "";

    const level = state.level || 0;
    if (level === 4) {
      // Landmark (Level 4)
      cellEl.classList.add("has-landmark");
      const landmark = document.createElement("div");
      landmark.className = "landmark-icon";
      landmark.title = "👑 LANDMARK";
      landmark.innerText = "👑";
      housesContainer.appendChild(landmark);
    } else {
      cellEl.classList.remove("has-landmark");
      if (level > 1) {
        // Show level stars (Level 2 = ⭐, Level 3 = ⭐⭐)
        const starCount = level - 1;
        for (let s = 0; s < starCount; s++) {
          const star = document.createElement("span");
          star.className = "level-star";
          star.innerText = "⭐";
          housesContainer.appendChild(star);
        }
      }
    }
  } else {
    cellEl.classList.remove("owned");
    cellEl.classList.remove("has-landmark");
    cellEl.style.borderColor = "";
    if (indicator) indicator.remove();
    const housesContainer = cellEl.querySelector(".houses-container");
    if (housesContainer) housesContainer.innerHTML = "";
  }
}

// ==========================================
// 10. 3D DICE SYSTEM & WEB AUDIO
// ==========================================
function rollDice() {
  if (gameState.isRolling || gameState.isMoving) return Promise.resolve(null);
  gameState.isRolling = true;

  sounds.dice();

  const overlay = document.getElementById("dice-overlay");
  const die1 = document.getElementById("die-1");
  const die2 = document.getElementById("die-2");
  const resultText = document.getElementById("dice-result-text");

  if (overlay) {
    overlay.classList.add("active");
    overlay.style.display = "flex";
  }
  if (resultText) {
    resultText.classList.remove("show");
    resultText.innerText = "Mengocok dadu...";
  }

  // Add tumble animation
  if (die1) die1.classList.add("dice-rolling");
  if (die2) die2.classList.add("dice-rolling");

  const val1 = Math.floor(Math.random() * 6) + 1;
  const val2 = Math.floor(Math.random() * 6) + 1;
  gameState.diceValues = [val1, val2];

  return new Promise(resolve => {
    setTimeout(() => {
      if (die1) {
        die1.classList.remove("dice-rolling");
        die1.setAttribute("data-face", val1);
      }
      if (die2) {
        die2.classList.remove("dice-rolling");
        die2.setAttribute("data-face", val2);
      }

      const total = val1 + val2;
      const isDoubles = (val1 === val2);

      if (resultText) {
        resultText.innerText = `🎲 Dadu: ${val1} + ${val2} = ${total} ${isDoubles ? '✨ (KEMBAR!)' : ''}`;
        resultText.classList.add("show");
      }

      sounds.hop();

      // Close dice overlay after showing result
      setTimeout(() => {
        if (overlay) {
          overlay.classList.remove("active");
          overlay.style.display = "none";
        }
        gameState.isRolling = false;
        resolve({ val1, val2, total, isDoubles });
      }, 1000);
    }, 950);
  });
}

// ==========================================
// 11. STEP-BY-STEP PION HOP MOVEMENT ANIMATION
// ==========================================
async function movePlayer(player, steps) {
  gameState.isMoving = true;
  const totalCells = 40;
  const startPos = player.position;
  const direction = steps >= 0 ? 1 : -1;
  const absSteps = Math.abs(steps);

  for (let i = 1; i <= absSteps; i++) {
    let nextPos = (player.position + direction + totalCells) % totalCells;

    // Check pass start
    if (direction > 0 && nextPos === 0 && (startPos !== 0 || i > 1)) {
      player.lapsCompleted = (player.lapsCompleted || 0) + 1;
      player.money += 2000000;
      addLog(`⭐ ${player.name} melewati START & menyelesaikan Putaran ke-${player.lapsCompleted}! Terima Rp 2.000.000`, "highlight");
      showMoneyAnimation(player.id, 2000000);
      animateMoneyCount(player.id, player.money);
      sounds.buy();
    }

    player.position = nextPos;
    renderAllPions();

    // Trigger bounce animation on current pion
    const pionEl = document.getElementById(`pion-player-${player.id}`);
    if (pionEl) {
      pionEl.classList.remove("pion-bounce");
      void pionEl.offsetWidth; // trigger reflow
      pionEl.classList.add("pion-bounce");
    }

    sounds.hop();
    await sleep(260);
  }

  gameState.isMoving = false;
  return player.position;
}

// ==========================================
// 12. TURN MANAGEMENT & UI UPDATE
// ==========================================
function updateTurnUI() {
  const current = gameState.players[gameState.currentPlayerIndex];
  if (!current) return;

  const indicator = document.getElementById("turn-indicator");
  if (indicator) {
    const pionLabel = (current.pion === "custom_photo") ? "📷 Foto" : current.pion;
    indicator.innerHTML = `Giliran: <strong style="color:${current.color};">${current.name}</strong> ${pionLabel}`;
  }

  // Highlight active player card
  gameState.players.forEach((p, idx) => {
    const card = document.getElementById(`player-card-${idx}`);
    if (!card) return;
    if (idx === gameState.currentPlayerIndex && !p.isBankrupt) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });

  renderAllPions();

  // Control buttons visibility
  const btnRoll = document.getElementById("btn-roll");
  const btnBuy = document.getElementById("btn-buy");
  const btnBuild = document.getElementById("btn-build");
  const btnEndTurn = document.getElementById("btn-end-turn");
  const btnJailPay = document.getElementById("btn-jail-pay");
  const btnJailRoll = document.getElementById("btn-jail-roll");
  const btnTakeover = document.getElementById("btn-takeover");
  const btnUpgradeCity = document.getElementById("btn-upgrade-city");

  // Reset states
  if (btnBuy) btnBuy.style.display = "none";
  if (btnBuild) btnBuild.style.display = "none";
  if (btnEndTurn) btnEndTurn.style.display = "none";
  if (btnJailPay) btnJailPay.style.display = "none";
  if (btnJailRoll) btnJailRoll.style.display = "none";
  if (btnTakeover) btnTakeover.style.display = "none";
  if (btnUpgradeCity) btnUpgradeCity.style.display = "none";

  if (!current.isBot) {
    if (current.inJail) {
      if (btnJailPay) btnJailPay.style.display = "inline-flex";
      if (btnJailRoll) btnJailRoll.style.display = "inline-flex";
      if (btnRoll) btnRoll.style.display = "none";
    } else {
      if (btnRoll) {
        btnRoll.style.display = "inline-flex";
        btnRoll.disabled = false;
      }
      // Check if player has buildable properties
      if (canPlayerBuildAnything(current) && btnBuild) {
        btnBuild.style.display = "inline-flex";
      }
    }
  } else {
    // Disable buttons during bot turn
    if (btnRoll) btnRoll.style.display = "none";
    // Trigger bot AI with human-friendly delay
    setTimeout(() => {
      runBotTurn(current);
    }, 1100);
  }
}

function nextTurn() {
  // Check win condition
  const activePlayers = gameState.players.filter(p => !p.isBankrupt);
  if (activePlayers.length <= 1) {
    triggerWinner(activePlayers[0] || gameState.players[0]);
    return;
  }

  // Advance index
  let attempts = 0;
  do {
    gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
    attempts++;
  } while (gameState.players[gameState.currentPlayerIndex].isBankrupt && attempts < gameState.players.length);

  gameState.doublesStreak = 0;
  updateTurnUI();
}

// ==========================================
// 13. LANDING HANDLER & PROPERTY PURCHASE
// ==========================================
async function handleLanding(player, cellIndex) {
  const cell = BOARD_DATA[cellIndex];
  addLog(`${player.name} mendarat di ${cell.name}.`);

  // Handle cell types
  if (cell.type === "start") {
    // When on START, human can choose any owned property to upgrade
    if (!player.isBot) {
      const ownedCities = player.properties.filter(id => BOARD_DATA[id].type === "property");
      if (ownedCities.length > 0) {
        const btnUpgrade = document.getElementById("btn-upgrade-city");
        if (btnUpgrade) {
          btnUpgrade.innerText = "⭐ Upgrade Properti (START)";
          btnUpgrade.style.display = "inline-flex";
          btnUpgrade.onclick = () => openBuildModal(player);
        }
        addLog(`⭐ ${player.name} mendarat di START! Silakan pilih properti kota milikmu untuk di-upgrade.`);
        openBuildModal(player);
        return;
      }
    } else {
      handleBotBuildingAI(player);
    }
    return finishTurnActions(player);
  }

  if (cell.type === "property" || cell.type === "station" || cell.type === "utility") {
    const propState = gameState.propertiesState[cell.id];
    if (propState.ownerId === null) {
      // Unowned: allow buy
      if (!player.isBot) {
        showPropertyModal(player, cell);
      } else {
        // Bot decision
        handleBotBuyDecision(player, cell);
      }
      return;
    } else if (propState.ownerId !== player.id) {
      // Owned by someone else: PAY RENT equal to current property value
      const owner = gameState.players.find(p => p.id === propState.ownerId);
      if (owner && !owner.isBankrupt && !owner.inJail) {
        const rentAmount = calculateRent(cell, propState, gameState.diceValues);
        addLog(`💰 ${player.name} membayar sewa ${formatMoney(rentAmount)} (setara nilai properti) ke ${owner.name}.`, "warning");
        sounds.rent();

        await executePayment(player, owner, rentAmount);
      }

      // Check TAKEOVER eligibility (Only non-landmark properties and player still solvent)
      // Tombol ambil alih hanya muncul saat di properti selain miliknya (+25% biaya)
      if (!player.isBankrupt && cell.type === "property" && propState.level < 4) {
        const curVal = getPropertyValue(cell, propState);
        const takeoverCost = Math.round(curVal * 1.25);

        if (!player.isBot) {
          if (player.money >= takeoverCost) {
            const btnTakeover = document.getElementById("btn-takeover");
            if (btnTakeover) {
              btnTakeover.style.display = "inline-flex";
              btnTakeover.innerText = `⚔️ Ambil Alih (${formatMoney(takeoverCost)})`;
              btnTakeover.onclick = () => showTakeoverPrompt(player, cell, owner, takeoverCost);
            }
            showTakeoverPrompt(player, cell, owner, takeoverCost);
            return; // Modal will handle finishTurnActions
          }
        } else {
          // Bot takeover decision if enough funds
          if (player.money >= takeoverCost + 1500000) {
            await sleep(700);
            executeTakeover(player, owner, cell, takeoverCost);
          }
        }
      }

      return finishTurnActions(player);
    } else {
      // Owned by self: allow upgrade if city and 1 lap completed since last update
      if (cell.type === "property" && propState.level < 4) {
        const lapReady = (player.lapsCompleted || 0) > (propState.lastUpgradeLap || 0);
        const cost = getUpgradeCost(cell, propState.level);

        if (!player.isBot) {
          const btnUpgrade = document.getElementById("btn-upgrade-city");
          const targetLvl = propState.level + 1;
          const targetName = (targetLvl === 4) ? "👑 Landmark" : `⭐ Tingkat ${targetLvl}`;

          if (btnUpgrade) {
            btnUpgrade.innerText = lapReady ? `Upgrade ${targetName}` : `Upgrade (Butuh 1 Putaran)`;
            btnUpgrade.style.display = "inline-flex";
            btnUpgrade.onclick = () => openBuildModal(player, cell.id);
          }

          if (lapReady && player.money >= cost) {
            addLog(`🏠 ${player.name} berada di properti miliknya (${cell.name}). Sudah 1 putaran penuh, siap di-upgrade!`);
            openBuildModal(player, cell.id);
            return;
          } else if (!lapReady) {
            addLog(`🏠 ${player.name} berada di ${cell.name}. Harus menyelesaikan 1 putaran lagi sebelum bisa upgrade berikutnya.`);
          } else {
            addLog(`🏠 ${player.name} berada di ${cell.name}. Saldo tidak cukup untuk upgrade (${formatMoney(cost)}).`);
          }
        } else {
          // Bot upgrade check
          if (lapReady && player.money >= cost + 1500000) {
            await sleep(600);
            upgradeProperty(player, cell.id);
          }
        }
      } else {
        addLog(`🏠 ${player.name} berada di properti miliknya sendiri (${propState.level === 4 ? '👑 Landmark' : cell.name}).`);
      }
      return finishTurnActions(player);
    }
  }

  if (cell.type === "tax") {
    sounds.rent();
    addLog(`💸 ${player.name} terkena ${cell.name}! Bayar ${formatMoney(cell.amount)}.`, "warning");
    await executePayment(player, null, cell.amount);
    return finishTurnActions(player);
  }

  if (cell.type === "chance") {
    await triggerCard("chance", player);
    return;
  }

  if (cell.type === "chest") {
    await triggerCard("chest", player);
    return;
  }

  if (cell.type === "gotojail") {
    sounds.jail();
    addLog(`🚨 ${player.name} tertangkap basah dan langsung masuk Penjara!`, "warning");
    await sendToJail(player);
    return finishTurnActions(player, false);
  }

  if (cell.type === "jail") {
    addLog(`👀 ${player.name} hanya berkunjung ke Penjara.`);
    return finishTurnActions(player);
  }

  if (cell.type === "free") {
    // BEBAS PARKIR: Teleport to any cell
    await handleBebasParkir(player);
    return;
  }

  finishTurnActions(player);
}

// ==========================================
// 14. RENT CALCULATION
// ==========================================
function calculateRent(cell, propState, diceValues) {
  if (cell.type === "property") {
    // Sewa setara harga/nilai properti saat itu
    return getPropertyValue(cell, propState);
  }

  if (cell.type === "station") {
    const owner = gameState.players.find(p => p.id === propState.ownerId);
    if (!owner) return 250000;
    const stationsOwned = STATIONS.filter(sId => gameState.propertiesState[sId].ownerId === owner.id).length;
    const rates = [250000, 500000, 1000000, 2000000];
    return rates[Math.min(stationsOwned - 1, 3)] || 250000;
  }

  if (cell.type === "utility") {
    const owner = gameState.players.find(p => p.id === propState.ownerId);
    const diceSum = (diceValues && (diceValues[0] + diceValues[1])) || 7;
    if (!owner) return diceSum * 40000;
    const utilsOwned = UTILITIES.filter(uId => gameState.propertiesState[uId].ownerId === owner.id).length;
    return utilsOwned >= 2 ? diceSum * 100000 : diceSum * 40000;
  }

  return 100000;
}

function ownsFullGroup(player, groupName) {
  const groupCellIds = COLOR_GROUPS[groupName];
  if (!groupCellIds) return false;
  return groupCellIds.every(id => gameState.propertiesState[id].ownerId === player.id);
}

// ==========================================
// 15. PAYMENT & BANKRUPTCY LOGIC
// ==========================================
async function executePayment(fromPlayer, toPlayer, amount) {
  showMoneyAnimation(fromPlayer.id, -amount);
  fromPlayer.money -= amount;

  if (toPlayer) {
    toPlayer.money += amount;
    showMoneyAnimation(toPlayer.id, amount);
    animateMoneyCount(toPlayer.id, toPlayer.money);
  }

  animateMoneyCount(fromPlayer.id, fromPlayer.money);

  // Check debt
  if (fromPlayer.money < 0) {
    await resolveDebtOrBankruptcy(fromPlayer, toPlayer);
  }
}

async function resolveDebtOrBankruptcy(player, creditor) {
  addLog(`⚠️ ${player.name} kehabisan saldo uang tunai!`, "warning");

  // Try auto-downgrading levels first if in debt
  let raised = 0;
  for (const cellId of player.properties) {
    const propState = gameState.propertiesState[cellId];
    const cell = BOARD_DATA[cellId];
    if (propState && propState.level > 1 && cell && cell.housePrice) {
      while (propState.level > 1 && player.money < 0) {
        propState.level--;
        const refund = Math.floor(cell.housePrice * 0.5);
        player.money += refund;
        raised += refund;
        updateCellOwnershipUI(cellId);
      }
    }
  }

  if (raised > 0) {
    addLog(`🔨 ${player.name} menurunkan tingkat bangunan untuk mendapatkan ${formatMoney(raised)}.`);
    animateMoneyCount(player.id, player.money);
  }

  // If still bankrupt, declare bankruptcy
  if (player.money < 0) {
    player.isBankrupt = true;
    sounds.jail();
    addLog(`💔 ${player.name} BANGKRUT dan tersingkir dari permainan!`, "warning");

    // Transfer or liquidate properties
    player.properties.forEach(cellId => {
      if (creditor && !creditor.isBankrupt) {
        gameState.propertiesState[cellId].ownerId = creditor.id;
        creditor.properties.push(cellId);
      } else {
        gameState.propertiesState[cellId].ownerId = null;
        gameState.propertiesState[cellId].level = 0;
        gameState.propertiesState[cellId].houses = 0;
      }
      updateCellOwnershipUI(cellId);
    });
    player.properties = [];

    // Mark card as bankrupt
    const card = document.getElementById(`player-card-${player.id}`);
    if (card) {
      card.classList.add("bankrupt");
      const badge = card.querySelector(".bankrupt-badge");
      if (badge) badge.style.display = "block";
    }

    renderPlayerCards();
    renderAllPions();

    if (!player.isBot) {
      showBankruptOverlay("Kamu telah dinyatakan bangkrut! Permainan berakhir untukmu.");
    }

    // === CHECK WIN CONDITION AFTER EVERY BANKRUPTCY ===
    const activePlayers = gameState.players.filter(p => !p.isBankrupt);
    if (activePlayers.length <= 1) {
      setTimeout(() => triggerWinner(activePlayers[0] || gameState.players[0]), 1500);
      return;
    }
  }
}

function showBankruptOverlay(msg) {
  const overlay = document.getElementById("bankrupt-overlay");
  const text = document.getElementById("bankrupt-text");
  const okBtn = document.getElementById("bankrupt-ok");
  if (overlay && text) {
    text.innerText = msg;
    overlay.classList.add("active");
    overlay.style.display = "flex";
  }
  if (okBtn) {
    okBtn.onclick = () => {
      overlay.classList.remove("active");
      overlay.style.display = "none";
      // After dismissing, check if game should continue
      const activePlayers = gameState.players.filter(p => !p.isBankrupt);
      if (activePlayers.length <= 1) {
        triggerWinner(activePlayers[0] || gameState.players[0]);
      }
    };
  }
}

// ==========================================
// 16. PROPERTY PURCHASE MODAL (HUMAN)
// ==========================================
function showPropertyModal(player, cell) {
  const modal = document.getElementById("property-modal");
  if (!modal) return;

  const colorBar = document.getElementById("prop-modal-color-bar");
  const nameEl = document.getElementById("prop-modal-name");
  const priceEl = document.getElementById("prop-modal-price");
  const rentEl = document.getElementById("prop-modal-rent");
  const table = document.getElementById("prop-rent-table");
  const buyBtn = document.getElementById("prop-modal-buy");
  const passBtn = document.getElementById("prop-modal-pass");

  if (colorBar) colorBar.style.backgroundColor = cell.color || "#888";
  if (nameEl) nameEl.innerText = `${cell.icon || '🏠'} ${cell.name}`;
  if (priceEl) priceEl.innerText = formatMoney(cell.price);
  if (rentEl) {
    rentEl.innerText = (cell.rent && cell.rent[0]) ? formatMoney(cell.rent[0]) : (cell.type === "station" ? "Rp 250.000+" : "Dadu x 40.000");
  }

  // Fill rent table
  if (table) {
    const tbody = table.querySelector("tbody");
    if (tbody) {
      tbody.innerHTML = "";
      if (cell.rent) {
        const rows = [
          { label: "Tanpa Bangunan", val: cell.rent[0] },
          { label: "1 Rumah", val: cell.rent[1] },
          { label: "2 Rumah", val: cell.rent[2] },
          { label: "3 Rumah", val: cell.rent[3] },
          { label: "4 Rumah", val: cell.rent[4] },
          { label: "1 Hotel", val: cell.rent[5] }
        ];
        rows.forEach(r => {
          const tr = document.createElement("tr");
          tr.innerHTML = `<td>${r.label}</td><td>${formatMoney(r.val)}</td>`;
          tbody.appendChild(tr);
        });
        table.style.display = "table";
      } else {
        table.style.display = "none";
      }
    }
  }

  // Buy button logic
  if (buyBtn) {
    buyBtn.disabled = player.money < cell.price;
    buyBtn.onclick = () => {
      modal.classList.remove("active");
      modal.style.display = "none";
      buyProperty(player, cell);
    };
  }

  if (passBtn) {
    passBtn.onclick = () => {
      modal.classList.remove("active");
      modal.style.display = "none";
      addLog(`${player.name} memutuskan untuk tidak membeli ${cell.name}.`);
      finishTurnActions(player);
    };
  }

  modal.classList.add("active");
  modal.style.display = "flex";
}

function buyProperty(player, cell) {
  if (player.money < cell.price) return;

  player.money -= cell.price;
  player.properties.push(cell.id);
  gameState.propertiesState[cell.id].ownerId = player.id;
  gameState.propertiesState[cell.id].level = 1; // Tingkat 1 (Dasar)
  gameState.propertiesState[cell.id].houses = 0;
  gameState.propertiesState[cell.id].lastUpgradeLap = player.lapsCompleted || 0; // Wajib selesaikan 1 putaran sebelum upgrade

  sounds.buy();
  showMoneyAnimation(player.id, -cell.price);
  animateMoneyCount(player.id, player.money);
  addLog(`🎉 ${player.name} membeli ${cell.name} seharga ${formatMoney(cell.price)}! Selesaikan 1 putaran untuk bisa upgrade.`, "highlight");

  updateCellOwnershipUI(cell.id);
  renderPlayerCards();

  finishTurnActions(player);
}

// Bot Buy Decision
function handleBotBuyDecision(bot, cell) {
  // Keep reserve of Rp 1.500.000
  const reserve = 1500000;
  if (bot.money >= cell.price + reserve) {
    buyProperty(bot, cell);
  } else {
    addLog(`${bot.name} menolak membeli ${cell.name} untuk berhemat.`);
    finishTurnActions(bot);
  }
}

// ==========================================
// 17. 3D FLIP CARD SYSTEM (CHANCE & DANA UMUM)
// ==========================================
async function triggerCard(type, player) {
  const deck = (type === "chance") ? gameState.chanceDeck : gameState.chestDeck;
  if (deck.length === 0) {
    if (type === "chance") gameState.chanceDeck = shuffle(CHANCE_CARDS);
    else gameState.chestDeck = shuffle(CHEST_CARDS);
  }

  const card = deck.shift();
  sounds.card();

  const modal = document.getElementById("card-modal");
  const modalContent = document.getElementById("card-modal-content");
  const flipInner = modalContent ? modalContent.querySelector(".card-flip-inner") : null;
  const titleEl = document.getElementById("card-type-title");
  const textEl = document.getElementById("card-modal-text");
  const okBtn = document.getElementById("card-modal-close");

  if (titleEl) {
    titleEl.innerText = (type === "chance") ? "❓ KESEMPATAN" : "📦 DANA UMUM";
  }
  if (textEl) {
    textEl.innerText = card.text;
  }

  if (flipInner) {
    flipInner.classList.remove("flipped");
  }

  if (modal) {
    modal.classList.add("active");
    modal.style.display = "flex";
  }

  // Auto flip card after opening
  await sleep(350);
  if (flipInner) {
    flipInner.classList.add("flipped");
  }

  return new Promise(resolve => {
    async function handleOk() {
      if (modal) {
        modal.classList.remove("active");
        modal.style.display = "none";
      }
      await executeCardAction(card, player);
      resolve();
    }

    if (!player.isBot) {
      if (okBtn) {
        okBtn.onclick = handleOk;
      }
    } else {
      // Auto-dismiss for bots after readable delay
      setTimeout(handleOk, 1600);
    }
  });
}

async function executeCardAction(card, player) {
  addLog(`🃏 Kartu: "${card.text}"`);

  if (card.action === "money") {
    sounds.buy();
    player.money += card.amount;
    showMoneyAnimation(player.id, card.amount);
    animateMoneyCount(player.id, player.money);
    if (player.money < 0) await resolveDebtOrBankruptcy(player, null);
    finishTurnActions(player);
  } else if (card.action === "move_to") {
    const diff = (card.target - player.position + 40) % 40;
    await movePlayer(player, diff);
    await handleLanding(player, player.position);
  } else if (card.action === "move_steps") {
    await movePlayer(player, card.steps);
    await handleLanding(player, player.position);
  } else if (card.action === "go_jail") {
    await sendToJail(player);
    finishTurnActions(player, false);
  } else if (card.action === "jail_free") {
    player.jailFreeCards = (player.jailFreeCards || 0) + 1;
    addLog(`✨ ${player.name} mendapatkan Kartu Bebas Penjara!`);
    finishTurnActions(player);
  } else if (card.action === "repairs") {
    let houses = 0;
    let hotels = 0;
    player.properties.forEach(cId => {
      const h = gameState.propertiesState[cId].houses || 0;
      if (h === 5) hotels++;
      else houses += h;
    });
    const cost = (houses * card.house) + (hotels * card.hotel);
    addLog(`🛠️ Biaya perbaikan (${houses} rumah, ${hotels} hotel): ${formatMoney(cost)}.`);
    await executePayment(player, null, cost);
    finishTurnActions(player);
  } else if (card.action === "collect_all") {
    const others = gameState.players.filter(p => p.id !== player.id && !p.isBankrupt);
    for (const other of others) {
      await executePayment(other, player, card.amount);
    }
    finishTurnActions(player);
  } else if (card.action === "pay_all") {
    const others = gameState.players.filter(p => p.id !== player.id && !p.isBankrupt);
    for (const other of others) {
      await executePayment(player, other, card.amount);
    }
    finishTurnActions(player);
  } else {
    finishTurnActions(player);
  }
}

// ==========================================
// 18. JAIL SYSTEM
// ==========================================
async function sendToJail(player) {
  player.inJail = true;
  player.jailTurns = 0;
  player.position = 10;
  renderAllPions();
  sounds.jail();
}

async function handleJailTurn(player, payFine = false) {
  if (player.jailFreeCards > 0) {
    player.jailFreeCards--;
    player.inJail = false;
    player.jailTurns = 0;
    addLog(`🎟️ ${player.name} menggunakan Kartu Bebas Penjara!`, "highlight");
    sounds.buy();
    updateTurnUI();
    return;
  }

  if (payFine) {
    if (player.money >= 500000) {
      player.money -= 500000;
      player.inJail = false;
      player.jailTurns = 0;
      showMoneyAnimation(player.id, -500000);
      animateMoneyCount(player.id, player.money);
      addLog(`💰 ${player.name} membayar denda Rp 500.000 dan bebas dari Penjara.`);
      sounds.buy();
      updateTurnUI();
    } else {
      addLog(`❌ Uang tidak cukup untuk membayar denda penjara.`);
    }
    return;
  }

  // Roll for doubles
  const dice = await rollDice();
  if (dice.isDoubles) {
    player.inJail = false;
    player.jailTurns = 0;
    addLog(`✨ Dadu kembar (${dice.val1} & ${dice.val2})! ${player.name} BEBAS dari Penjara!`, "highlight");
    await movePlayer(player, dice.total);
    await handleLanding(player, player.position);
  } else {
    player.jailTurns++;
    addLog(`🔒 Dadu tidak kembar. ${player.name} masih di penjara (Percobaan ke-${player.jailTurns}/3).`);
    if (player.jailTurns >= 3) {
      addLog(`⏰ Sudah 3x gagal, wajib bayar denda Rp 500.000.`);
      await executePayment(player, null, 500000);
      player.inJail = false;
      player.jailTurns = 0;
      await movePlayer(player, dice.total);
      await handleLanding(player, player.position);
    } else {
      nextTurn();
    }
  }
}

// ==========================================
// 19. BUILDING & LANDMARK UPGRADES (3 TINGKAT + LANDMARK)
// ==========================================
function canPlayerBuildAnything(player) {
  if (player.isBankrupt || player.inJail) return false;
  // Tombol update hanya muncul saat ada di properti sendiri atau di start
  const atStart = (player.position === 0);
  const currentCell = BOARD_DATA[player.position];
  const atOwnProp = currentCell && currentCell.type === "property" && gameState.propertiesState[currentCell.id] && gameState.propertiesState[currentCell.id].ownerId === player.id;
  if (!atStart && !atOwnProp) return false;

  return player.properties.some(id => {
    const cell = BOARD_DATA[id];
    const propState = gameState.propertiesState[id];
    if (cell && cell.type === "property" && propState && propState.level < 4) {
      const lapReady = (player.lapsCompleted || 0) > (propState.lastUpgradeLap || 0);
      const cost = getUpgradeCost(cell, propState.level);
      return lapReady && player.money >= cost;
    }
    return false;
  });
}

function openBuildModal(player, specificCellId = null) {
  const modal = document.getElementById("build-modal");
  const buildList = document.getElementById("build-list");
  const closeBtn = document.getElementById("build-modal-close");
  const descEl = document.getElementById("build-modal-desc");
  if (!modal || !buildList) return;

  buildList.innerHTML = "";

  const atStart = (player.position === 0);
  if (descEl) {
    if (atStart && specificCellId === null) {
      descEl.innerText = "Kamu di START! Pilih kota mana saja milikmu untuk di-upgrade (Syarat: sudah menyelesaikan minimal 1 putaran).";
    } else {
      const cellName = specificCellId !== null ? BOARD_DATA[specificCellId].name : "";
      descEl.innerText = `Upgrade ${cellName} milikmu (Tingkat 1-3 gandakan nilai & sewa 2x lipat, atau bangun Landmark permanen kebal ambil alih)!`;
    }
  }

  let candidates = [];
  if (specificCellId !== null && specificCellId !== undefined) {
    // Specific cell requested (e.g., landed on own property)
    if (player.properties.includes(specificCellId)) {
      candidates = [specificCellId];
    }
  } else if (atStart) {
    // At START: free choice of all owned cities
    candidates = player.properties.filter(id => {
      const cell = BOARD_DATA[id];
      const ps = gameState.propertiesState[id];
      return cell && cell.type === "property" && ps && ps.level < 4;
    });
  } else {
    // Not at START and no specificCellId: restrict to current cell only
    const currentCell = BOARD_DATA[player.position];
    if (currentCell && currentCell.type === "property" && player.properties.includes(currentCell.id)) {
      const ps = gameState.propertiesState[currentCell.id];
      if (ps && ps.level < 4) {
        candidates = [currentCell.id];
      }
    }
  }

  let buildableFound = false;

  candidates.forEach(cellId => {
    const cell = BOARD_DATA[cellId];
    const propState = gameState.propertiesState[cellId];
    if (!cell || !propState || propState.level >= 4) return;

    buildableFound = true;
    const currentLvl = propState.level;
    const targetLvl = currentLvl + 1;
    const cost = getUpgradeCost(cell, currentLvl);
    const isLandmark = (targetLvl === 4);
    const lapReady = (player.lapsCompleted || 0) > (propState.lastUpgradeLap || 0);

    let curLvlLabel = "Tingkat 1 (Dasar)";
    if (currentLvl === 2) curLvlLabel = "Tingkat 2 (⭐)";
    if (currentLvl === 3) curLvlLabel = "Tingkat 3 (⭐⭐)";

    let nextLvlLabel = `Tingkat ${targetLvl} (Nilai & Sewa 2x lipat)`;
    if (isLandmark) {
      const cap = getLandmarkMaxCap(cell);
      nextLvlLabel = `👑 LANDMARK (Nilai & Sewa melonjak hingga ${formatMoney(cap)} & Kebal Akuisisi)`;
    }

    const lapStatusHtml = lapReady
      ? `<span style="font-size:0.75rem;color:#10b981;font-weight:600;">✅ Syarat putaran terpenuhi (${player.lapsCompleted} putaran selesai)</span>`
      : `<span style="font-size:0.75rem;color:#f59e0b;font-weight:600;">⏳ Butuh 1 putaran lagi (Terakhir update: putaran ke-${propState.lastUpgradeLap || 0}, saat ini: putaran ke-${player.lapsCompleted || 0})</span>`;

    const canAfford = player.money >= cost;
    const canUpgradeNow = lapReady && canAfford;

    const item = document.createElement("div");
    item.className = "build-item";
    item.innerHTML = `
      <div class="build-info">
        <span class="build-name" style="color:${cell.color};font-weight:700;">${cell.icon || '🏠'} ${cell.name}</span>
        <span class="build-cost">${formatMoney(cost)} <small style="font-weight:normal;color:#aaa;">(+25% per tingkat)</small></span>
        <span style="font-size:0.75rem;color:#bbb;">Saat ini: <strong>${curLvlLabel}</strong></span>
        <span style="font-size:0.75rem;color:#FFD700;">Berikutnya: ${nextLvlLabel}</span>
        ${lapStatusHtml}
      </div>
      <button class="btn-primary btn-sm build-action-btn" ${!canUpgradeNow ? 'disabled' : ''}>
        ${!lapReady ? '⏳ Butuh 1 Putaran' : (!canAfford ? 'Uang Kurang' : (isLandmark ? '👑 Bangun Landmark' : `Upgrade Tingkat ${targetLvl}`))}
      </button>
    `;

    const btn = item.querySelector(".build-action-btn");
    if (canUpgradeNow) {
      btn.onclick = () => {
        upgradeProperty(player, cellId);
        openBuildModal(player, specificCellId); // Refresh modal
      };
    }

    buildList.appendChild(item);
  });

  if (!buildableFound) {
    buildList.innerHTML = `<p style="text-align:center;color:#aaa;padding:20px;">Tidak ada kota milikmu yang dapat di-upgrade saat ini atau seluruh kota sudah mencapai status Landmark.</p>`;
  }

  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.classList.remove("active");
      modal.style.display = "none";
      finishTurnActions(player);
    };
  }

  modal.classList.add("active");
  modal.style.display = "flex";
}

function upgradeProperty(player, cellId) {
  const cell = BOARD_DATA[cellId];
  const propState = gameState.propertiesState[cellId];
  if (!cell || !propState || propState.level >= 4) return;

  const lapReady = (player.lapsCompleted || 0) > (propState.lastUpgradeLap || 0);
  if (!lapReady) {
    addLog(`⏳ ${player.name} harus menyelesaikan 1 putaran lagi sebelum meng-upgrade ${cell.name}!`);
    return;
  }

  const cost = getUpgradeCost(cell, propState.level);
  if (player.money < cost) {
    addLog(`❌ Saldo ${player.name} tidak cukup untuk upgrade ${cell.name} (${formatMoney(cost)}).`);
    return;
  }

  player.money -= cost;
  propState.level++;
  propState.lastUpgradeLap = player.lapsCompleted || 0; // Catat putaran saat upgrade

  sounds.build();
  showMoneyAnimation(player.id, -cost);
  animateMoneyCount(player.id, player.money);

  const lvl = propState.level;
  const newVal = getPropertyValue(cell, propState);
  if (lvl === 4) {
    sounds.win();
    addLog(`👑 LUAR BIASA! ${player.name} membangun LANDMARK di ${cell.name}! Nilai & Sewa melonjak jadi ${formatMoney(newVal)} (Kebal Akuisisi)!`, "highlight");
  } else {
    addLog(`🏗️ ${player.name} meng-upgrade ${cell.name} ke Tingkat ${lvl}! Nilai & sewa dikali 2x menjadi ${formatMoney(newVal)}!`, "highlight");
  }

  updateCellOwnershipUI(cellId);
  renderPlayerCards();
}

// Bot Building AI
function handleBotBuildingAI(bot) {
  if (bot.money < 2500000) return; // Keep buffer

  const atStart = (bot.position === 0);
  let upgradeTargets;

  if (atStart) {
    // At START: bot can choose any owned property
    upgradeTargets = [...bot.properties];
  } else {
    // Not at START: only upgrade current cell if owned
    const currentCell = BOARD_DATA[bot.position];
    if (currentCell && currentCell.type === "property" && bot.properties.includes(currentCell.id)) {
      upgradeTargets = [currentCell.id];
    } else {
      return; // Can't upgrade here
    }
  }

  for (const cellId of upgradeTargets) {
    const cell = BOARD_DATA[cellId];
    const propState = gameState.propertiesState[cellId];
    if (cell && cell.type === "property" && propState && propState.level < 4) {
      const lapReady = (bot.lapsCompleted || 0) > (propState.lastUpgradeLap || 0);
      if (!lapReady) continue;

      const cost = getUpgradeCost(cell, propState.level);
      // Bots aggressively prioritize Landmark upgrades
      const buffer = (propState.level === 3) ? 1200000 : 2200000;
      if (bot.money >= cost + buffer) {
        upgradeProperty(bot, cellId);
        break; // One upgrade per turn
      }
    }
  }
}

// ==========================================
// 19B. TAKEOVER (AMBIL ALIH PROPERTI)
// ==========================================
function showTakeoverPrompt(buyer, cell, owner, cost) {
  const modal = document.getElementById("takeover-modal");
  const cityEl = document.getElementById("takeover-modal-city");
  const ownerEl = document.getElementById("takeover-modal-owner");
  const levelEl = document.getElementById("takeover-modal-level");
  const costEl = document.getElementById("takeover-modal-cost");
  const descEl = document.getElementById("takeover-modal-desc");
  const buyBtn = document.getElementById("takeover-modal-buy");
  const passBtn = document.getElementById("takeover-modal-pass");
  const btnTakeover = document.getElementById("btn-takeover");

  const propState = gameState.propertiesState[cell.id];
  const lvlName = propState.level === 4 ? "👑 Landmark" : `Tingkat ${propState.level}`;

  if (descEl) descEl.innerText = `Kamu berada di kota milik lawan! Kamu bisa mengambil alih kepemilikannya dengan biaya +25% dari nilai saat ini.`;
  if (cityEl) cityEl.innerText = `${cell.icon || '🏠'} ${cell.name}`;
  if (ownerEl) ownerEl.innerText = owner.name;
  if (levelEl) levelEl.innerText = lvlName;
  if (costEl) costEl.innerText = formatMoney(cost);

  if (buyBtn) {
    buyBtn.disabled = buyer.money < cost;
    buyBtn.onclick = () => {
      modal.classList.remove("active");
      modal.style.display = "none";
      if (btnTakeover) btnTakeover.style.display = "none";
      executeTakeover(buyer, owner, cell, cost);
      finishTurnActions(buyer);
    };
  }

  if (passBtn) {
    passBtn.onclick = () => {
      modal.classList.remove("active");
      modal.style.display = "none";
      if (btnTakeover) btnTakeover.style.display = "none";
      addLog(`${buyer.name} membatalkan ambil alih ${cell.name}.`);
      finishTurnActions(buyer);
    };
  }

  if (btnTakeover) {
    btnTakeover.style.display = "inline-flex";
    btnTakeover.onclick = () => {
      modal.classList.add("active");
      modal.style.display = "flex";
    };
  }

  if (modal) {
    modal.classList.add("active");
    modal.style.display = "flex";
  }
}

function executeTakeover(buyer, previousOwner, cell, cost) {
  if (buyer.money < cost) return;

  buyer.money -= cost;
  previousOwner.money += cost;

  // Transfer ownership in player arrays
  previousOwner.properties = previousOwner.properties.filter(id => id !== cell.id);
  if (!buyer.properties.includes(cell.id)) {
    buyer.properties.push(cell.id);
  }

  // Update property state (preserve existing level, reset lastUpgradeLap for new owner)
  const propState = gameState.propertiesState[cell.id];
  propState.ownerId = buyer.id;
  propState.lastUpgradeLap = buyer.lapsCompleted || 0; // Pemilik baru wajib 1 putaran sebelum bisa upgrade

  sounds.win();
  showMoneyAnimation(buyer.id, -cost);
  showMoneyAnimation(previousOwner.id, cost);
  animateMoneyCount(buyer.id, buyer.money);
  animateMoneyCount(previousOwner.id, previousOwner.money);

  addLog(`⚡ PENGAMBILAN ALIH! ${buyer.name} berhasil merebut ${cell.name} dari ${previousOwner.name} seharga ${formatMoney(cost)} (+25%)!`, "highlight");

  updateCellOwnershipUI(cell.id);
  renderPlayerCards();
}

// ==========================================
// 19C. BEBAS PARKIR (TELEPORT BEBAS)
// ==========================================
async function handleBebasParkir(player) {
  sounds.card();
  addLog(`✈️ ${player.name} berhenti di Bebas Parkir! Aktifkan mode pilih tujuan ke kotak mana saja!`, "highlight");

  if (!player.isBot) {
    const boardEl = document.getElementById("board");
    const banner = document.getElementById("teleport-banner");

    if (banner) banner.style.display = "block";
    if (boardEl) boardEl.classList.add("teleport-mode");

    return new Promise(resolve => {
      const cells = document.querySelectorAll(".cell");
      function onCellClick(e) {
        const clickedCell = e.currentTarget;
        const targetId = parseInt(clickedCell.id.replace("cell-", ""), 10);

        // Remove listener from all cells
        cells.forEach(c => c.removeEventListener("click", onCellClick));
        if (boardEl) boardEl.classList.remove("teleport-mode");
        if (banner) banner.style.display = "none";

        addLog(`🎯 ${player.name} teleport ke ${BOARD_DATA[targetId].name}!`, "highlight");
        sounds.hop();

        player.position = targetId;
        renderAllPions();
        resolve(handleLanding(player, targetId));
      }

      cells.forEach(c => {
        c.addEventListener("click", onCellClick);
      });
    });
  } else {
    // Bot AI for Bebas Parkir
    await sleep(1200);

    let chosenCellIndex = 0; // Default START
    let bestScore = -1;

    for (let i = 0; i < BOARD_DATA.length; i++) {
      const cell = BOARD_DATA[i];
      if (i === 20 || i === 10 || i === 30) continue; // skip jail, parkir, gotojail

      const state = gameState.propertiesState[cell.id];
      if (cell.type === "property") {
        if (state.ownerId === null && player.money >= cell.price + 1000000) {
          const score = cell.price + 5000000;
          if (score > bestScore) {
            bestScore = score;
            chosenCellIndex = i;
          }
        } else if (state.ownerId === player.id && state.level < 4) {
          const cost = getUpgradeCost(cell, state.level);
          if (player.money >= cost + 1200000) {
            const score = (state.level === 3 ? 10000000 : 4000000) + cell.price;
            if (score > bestScore) {
              bestScore = score;
              chosenCellIndex = i;
            }
          }
        }
      }
    }

    addLog(`🎯 ${player.name} memilih teleport Bebas Parkir ke ${BOARD_DATA[chosenCellIndex].name}!`, "highlight");
    sounds.hop();
    player.position = chosenCellIndex;
    renderAllPions();
    await sleep(600);
    return handleLanding(player, chosenCellIndex);
  }
}

// ==========================================
// 20. BOT AUTOMATED TURN
// ==========================================
async function runBotTurn(bot) {
  if (bot.isBankrupt) return nextTurn();

  addLog(`🤖 Giliran ${bot.name}...`);

  // Handle in jail
  if (bot.inJail) {
    await sleep(1000);
    if (bot.jailFreeCards > 0) {
      handleJailTurn(bot);
    } else if (bot.money > 3000000) {
      handleJailTurn(bot, true); // pay fine
    } else {
      handleJailTurn(bot, false); // try doubles
    }
    return;
  }

  // Roll dice
  await sleep(600);
  const dice = await rollDice();
  if (!dice) return;

  // Check doubles streak
  if (dice.isDoubles) {
    gameState.doublesStreak++;
    if (gameState.doublesStreak >= 3) {
      addLog(`🚨 ${bot.name} melempar dadu kembar 3x berturut-turut! Langsung masuk Penjara!`, "warning");
      await sendToJail(bot);
      return nextTurn();
    }
  } else {
    gameState.doublesStreak = 0;
  }

  // Move
  await movePlayer(bot, dice.total);

  // Landing
  await handleLanding(bot, bot.position);

  // Bot building logic after moving
  handleBotBuildingAI(bot);

  // Finish turn or doubles
  if (dice.isDoubles && !bot.inJail && !bot.isBankrupt) {
    addLog(`✨ Dadu kembar! ${bot.name} mendapat giliran tambahan.`);
    setTimeout(() => runBotTurn(bot), 1200);
  } else {
    setTimeout(() => nextTurn(), 1000);
  }
}

// ==========================================
// 21. TURN COMPLETION & HUMAN CONTROLS
// ==========================================
function finishTurnActions(player, allowRollAgain = true) {
  if (player.isBot) return; // Handled in runBotTurn

  const btnEndTurn = document.getElementById("btn-end-turn");
  const btnRoll = document.getElementById("btn-roll");
  const btnBuild = document.getElementById("btn-build");
  const btnTakeover = document.getElementById("btn-takeover");
  const btnUpgradeCity = document.getElementById("btn-upgrade-city");

  const currentCell = BOARD_DATA[player.position];
  const currentPropState = currentCell ? gameState.propertiesState[currentCell.id] : null;

  // Tombol ambil alih hanya muncul saat di properti selain miliknya
  const isOpponentProp = currentCell && currentCell.type === "property" && currentPropState && currentPropState.ownerId !== null && currentPropState.ownerId !== player.id && currentPropState.level < 4;
  if (btnTakeover && !isOpponentProp) {
    btnTakeover.style.display = "none";
  }

  // Tombol update hanya muncul saat ada di properti sendiri atau di start
  const atStart = (player.position === 0);
  const atOwnProp = currentCell && currentCell.type === "property" && currentPropState && currentPropState.ownerId === player.id && currentPropState.level < 4;

  if (btnUpgradeCity) {
    if (atStart) {
      const ownedCities = player.properties.filter(id => BOARD_DATA[id].type === "property");
      if (ownedCities.length > 0) {
        btnUpgradeCity.innerText = "⭐ Upgrade Properti (START)";
        btnUpgradeCity.style.display = "inline-flex";
        btnUpgradeCity.onclick = () => openBuildModal(player);
      } else {
        btnUpgradeCity.style.display = "none";
      }
    } else if (atOwnProp) {
      const lapReady = (player.lapsCompleted || 0) > (currentPropState.lastUpgradeLap || 0);
      const targetLvl = currentPropState.level + 1;
      const targetName = (targetLvl === 4) ? "👑 Landmark" : `⭐ Tingkat ${targetLvl}`;
      btnUpgradeCity.innerText = lapReady ? `Upgrade ${targetName}` : `Upgrade (Butuh 1 Putaran)`;
      btnUpgradeCity.style.display = "inline-flex";
      btnUpgradeCity.onclick = () => openBuildModal(player, currentCell.id);
    } else {
      btnUpgradeCity.style.display = "none";
    }
  }

  if (btnBuild) {
    btnBuild.style.display = "none";
  }

  // Check if player rolled doubles and can roll again
  const rolledDoubles = (gameState.diceValues[0] === gameState.diceValues[1]);
  if (rolledDoubles && allowRollAgain && !player.inJail && gameState.doublesStreak < 3) {
    addLog(`✨ Dadu kembar! Kamu berhak melempar dadu sekali lagi.`, "highlight");
    if (btnRoll) {
      btnRoll.style.display = "inline-flex";
      btnRoll.disabled = false;
    }
    if (btnEndTurn) btnEndTurn.style.display = "none";
  } else {
    if (btnRoll) btnRoll.style.display = "none";
    if (btnEndTurn) btnEndTurn.style.display = "inline-flex";
  }
}

function setupGameControls() {
  const btnRoll = document.getElementById("btn-roll");
  const btnEndTurn = document.getElementById("btn-end-turn");
  const btnBuild = document.getElementById("btn-build");
  const btnJailPay = document.getElementById("btn-jail-pay");
  const btnJailRoll = document.getElementById("btn-jail-roll");
  const btnTakeover = document.getElementById("btn-takeover");
  const btnUpgradeCity = document.getElementById("btn-upgrade-city");

  if (btnRoll) {
    btnRoll.onclick = async () => {
      btnRoll.disabled = true;
      const player = gameState.players[gameState.currentPlayerIndex];
      const dice = await rollDice();
      if (!dice) return;

      if (dice.isDoubles) {
        gameState.doublesStreak++;
        if (gameState.doublesStreak >= 3) {
          addLog(`🚨 Kamu melempar dadu kembar 3x berturut-turut! Langsung masuk Penjara!`, "warning");
          await sendToJail(player);
          nextTurn();
          return;
        }
      } else {
        gameState.doublesStreak = 0;
      }

      await movePlayer(player, dice.total);
      await handleLanding(player, player.position);
    };
  }

  if (btnEndTurn) {
    btnEndTurn.onclick = () => {
      btnEndTurn.style.display = "none";
      if (btnTakeover) btnTakeover.style.display = "none";
      if (btnUpgradeCity) btnUpgradeCity.style.display = "none";
      nextTurn();
    };
  }

  if (btnBuild) {
    btnBuild.onclick = () => {
      const player = gameState.players[gameState.currentPlayerIndex];
      // Only free choice at START, otherwise upgrade current property only
      if (player.position === 0) {
        openBuildModal(player);
      } else {
        const currentCell = BOARD_DATA[player.position];
        if (currentCell && currentCell.type === "property") {
          openBuildModal(player, currentCell.id);
        }
      }
    };
  }

  if (btnJailPay) {
    btnJailPay.onclick = () => {
      const player = gameState.players[gameState.currentPlayerIndex];
      handleJailTurn(player, true);
    };
  }

  if (btnJailRoll) {
    btnJailRoll.onclick = () => {
      const player = gameState.players[gameState.currentPlayerIndex];
      handleJailTurn(player, false);
    };
  }
}

// ==========================================
// 22. WINNER SCREEN & CELEBRATION
// ==========================================
function triggerWinner(winner) {
  sounds.win();

  const gameScreen = document.getElementById("game-screen");
  const winnerScreen = document.getElementById("winner-screen");
  const avatarEl = document.getElementById("winner-avatar");
  const nameEl = document.getElementById("winner-name");
  const statsEl = document.getElementById("winner-stats");

  if (gameScreen) gameScreen.style.display = "none";
  if (winnerScreen) {
    winnerScreen.style.display = "flex";
    winnerScreen.classList.add("active");
  }

  if (avatarEl) {
    if (winner.avatar.startsWith("data:image") || winner.avatar.startsWith("http")) {
      avatarEl.innerHTML = `<img src="${winner.avatar}" alt="${winner.name}" style="width:100px;height:100px;border-radius:50%;object-fit:cover;border:4px solid #FFD700;">`;
    } else {
      avatarEl.innerHTML = `<span style="font-size:4.5rem;">${winner.avatar}</span>`;
    }
  }

  if (nameEl) {
    const pionBadge = (winner.pion === "custom_photo") ? "👑" : winner.pion;
    nameEl.innerText = `${winner.name} ${pionBadge}`;
  }

  if (statsEl) {
    statsEl.innerHTML = `
      <div style="background:rgba(255,255,255,0.08);padding:16px;border-radius:12px;margin:16px 0;text-align:center;">
        <p style="font-size:1.1rem;color:#FFD700;font-weight:700;">Total Kekayaan Bersih: ${formatMoney(winner.money)}</p>
        <p style="font-size:0.9rem;color:#ccc;margin-top:6px;">Jumlah Properti Dikuasai: ${winner.properties.length} Petak</p>
      </div>
    `;
  }

  // Create Confetti
  createConfetti();
}

function createConfetti() {
  const container = document.getElementById("confetti-container");
  if (!container) return;
  container.innerHTML = "";

  const colors = ["#FFD700", "#FF6B35", "#2ECC71", "#3498DB", "#E74C3C", "#9B59B6"];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.width = `${Math.random() * 10 + 6}px`;
    el.style.height = `${Math.random() * 14 + 6}px`;
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.top = `-20px`;
    el.style.opacity = Math.random() + 0.5;
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    el.style.animation = `confettiFall ${Math.random() * 3 + 2.5}s linear infinite`;
    el.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(el);
  }
}

// Add keyframes for confetti if needed
const style = document.createElement("style");
style.innerHTML = `
@keyframes confettiFall {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
`;
document.head.appendChild(style);

// ==========================================
// 23. DOM READY BOOTSTRAP
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initLobby();
});
