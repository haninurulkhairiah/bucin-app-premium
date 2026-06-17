// ============================================================
//  KONFIGURASI FIREBASE
//  Ganti nilai di bawah ini dengan config dari Firebase Console Anda:
//  Firebase Console > Project Settings > Your Apps > SDK setup
// ============================================================
import { initializeApp }           from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection,
         addDoc, getDocs, query,
         orderBy, limit,
         serverTimestamp }          from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAc4oBVikGBAQRTdCPkpGDgpMoorPG5O54",
    authDomain: "haniff-cf91a.firebaseapp.com",
    projectId: "haniff-cf91a",
    storageBucket: "haniff-cf91a.firebasestorage.app",
    messagingSenderId: "788915796555",
    appId: "1:788915796555:web:7f321068d5768cfc5aebce",
    measurementId: "G-8M91TSDT9E"
  };
  
// ============================================================
//  INISIALISASI (skip jika masih placeholder)
// ============================================================
const isFirebaseReady = firebaseConfig.apiKey !== "API_KEY_ANDA";
let db = null;
if (isFirebaseReady) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
}

// ============================================================
//  NAVIGASI SCREEN
// ============================================================
window.goToScreen = function(num) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById('screen' + num);
    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (num === 2) initRevealObserver('#screen2');
    if (num === 3) initRevealObserver('#screen3');
    if (num === 4) initRevealObserver('#screen4');
    if (num === 5) initRevealObserver('#screen5');
    if (num === 7) loadComments();
};

// ============================================================
//  SCROLL REVEAL
// ============================================================
function initRevealObserver(screenSelector) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.12 });
    document.querySelectorAll(`${screenSelector} .reveal`).forEach(el => observer.observe(el));
}

// ============================================================
//  FLOATING PARTICLES
// ============================================================
const emojis = ['💖','💕','💗','✨','🌸','💞','💓','🌷','🎀','🫧'];
function createParticle() {
    const el = document.createElement('div');
    el.classList.add('particle');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left   = Math.random() * 100 + 'vw';
    el.style.fontSize = (Math.random() * 16 + 9) + 'px';
    const dur = Math.random() * 5 + 6;
    el.style.animationDuration = dur + 's';
    el.style.opacity = (Math.random() * 0.4 + 0.25).toFixed(2);
    document.getElementById('particles').appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
}
setInterval(createParticle, 450);

// ============================================================
//  TOMBOL "TIDAK" KABUR
// ============================================================
let noCount = 0;
const noTexts = ['Ga mau 😅','Ehh...','Pikir lagi~','Jangan dong!','Yakin nih? 🥺','Sini deh!','Percayain aku~','Hehe kabur...'];

window.runAway = function() {
    const btn = document.getElementById('noBtn');
    const area = document.querySelector('.answer-area');
    const maxX = (area.offsetWidth - btn.offsetWidth) / 2;
    const x = (Math.random() - 0.5) * maxX * 2;
    const y = (Math.random() - 0.5) * 60;
    btn.style.transition = 'transform 0.25s ease';
    btn.style.transform  = `translate(${x}px, ${y}px)`;
    noCount++;
    btn.textContent = noTexts[noCount % noTexts.length];
    if (noCount >= 6) {
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
    }
};

// ============================================================
//  TOMBOL "MAU" -> SCREEN 7  (3x klik dulu baru bisa masuk)
// ============================================================
let yesClickCount = 0;
const yesShifts = [
    { x: 75,  y: -25, rot:  4, text: 'Eh, yakin? 🤭',   hint: 'Ayo dong, jangan malu... 🥺' },
    { x: -65, y:  30, rot: -4, text: 'Beneran nih? 🫣',  hint: 'Sekali lagi... ayooo!! 💕'   },
];

function burstConfetti(originEl) {
    const confettiEmojis = ['💖','💕','✨','🌸','💞','💗','🎀','💓','🌷','⭐'];
    const rect = originEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < 18; i++) {
        const el = document.createElement('div');
        el.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
        el.style.cssText = `
            position:fixed;
            left:${cx}px; top:${cy}px;
            font-size:${Math.random() * 16 + 12}px;
            pointer-events:none; z-index:9999;
            transform:translate(-50%,-50%);
            transition:none;
        `;
        document.body.appendChild(el);
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const dist  = Math.random() * 130 + 60;
        const dx    = Math.cos(angle) * dist;
        const dy    = Math.sin(angle) * dist;
        requestAnimationFrame(() => {
            el.style.transition = `transform ${0.6 + Math.random() * 0.5}s cubic-bezier(.2,.8,.4,1), opacity 0.8s ease`;
            el.style.transform  = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${Math.random() * 0.8 + 0.6}) rotate(${Math.random()*360}deg)`;
            el.style.opacity    = '0';
        });
        setTimeout(() => el.remove(), 1400);
    }
}

window.handleYes = async function() {
    const yesBtn  = document.getElementById('yesBtn');
    const hint    = document.getElementById('yesHint');

    if (yesClickCount < 2) {
        const shift = yesShifts[yesClickCount];
        // Geser tombol
        yesBtn.style.transition = 'transform 0.35s cubic-bezier(.36,.07,.19,.97)';
        yesBtn.style.transform  = `translate(${shift.x}px, ${shift.y}px) rotate(${shift.rot}deg) scale(1.06)`;
        yesBtn.textContent = shift.text;
        if (hint) hint.textContent = shift.hint;
        yesClickCount++;

        // Efek guncang sebentar
        yesBtn.classList.add('btn-yes-shake');
        setTimeout(() => yesBtn.classList.remove('btn-yes-shake'), 500);
        return;
    }

    // Klik ke-3 — reset posisi lalu konfeti + pindah screen
    yesBtn.style.transition = 'transform 0.2s ease';
    yesBtn.style.transform  = 'scale(1.15)';
    yesBtn.textContent = '💖 Yeay!!';
    burstConfetti(yesBtn);
    await new Promise(r => setTimeout(r, 700));
    await saveMessage("Jawaban: MAU BANGET! 💞", "Aku 🥰");
    goToScreen(7);
};

// ============================================================
//  FORM KOMENTAR
// ============================================================
const form       = document.getElementById('messageForm');
const statusMsg  = document.getElementById('statusMsg');
const submitBtn  = document.getElementById('submitBtn');
const textarea   = document.getElementById('userMessage');
const charCount  = document.getElementById('charCount');

// Hitung karakter
textarea.addEventListener('input', () => {
    charCount.textContent = `${textarea.value.length} / 200`;
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message  = textarea.value.trim();
    const name     = (document.getElementById('userName').value.trim()) || 'Seseorang 🌸';
    if (!message) return;

    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled    = true;

    const ok = await saveMessage(message, name);

    if (ok === true) {
        statusMsg.style.color = '#27ae60';
        statusMsg.textContent = 'Pesan kamu sudah tersimpan! 💌';
        // Tambahkan bubble baru ke atas list tanpa reload
        prependCommentBubble(name, message, new Date());
    } else if (ok === false) {
        statusMsg.style.color = '#c0185e';
        statusMsg.textContent = 'Tersimpan! (Mode demo — isi firebaseConfig di app.js untuk menyimpan beneran) 🌸';
        prependCommentBubble(name, message, new Date());
    } else {
        statusMsg.style.color = 'red';
        statusMsg.textContent = 'Gagal mengirim. Coba lagi ya.';
    }

    form.reset();
    charCount.textContent = '0 / 200';
    submitBtn.textContent = 'Kirim Pesan 💌';
    submitBtn.disabled    = false;
});

// ============================================================
//  MUAT KOMENTAR DARI FIRESTORE
// ============================================================
async function loadComments() {
    const listEl = document.getElementById('commentsList');
    listEl.innerHTML = '<p class="loading-comments">Memuat pesan... 🌸</p>';

    if (!isFirebaseReady) {
        listEl.innerHTML = '<p class="no-comments">Belum ada pesan. Jadilah yang pertama! 🌷</p>';
        return;
    }

    try {
        const q = query(collection(db, "bucin_messages"), orderBy("waktu", "desc"), limit(30));
        const snap = await getDocs(q);

        if (snap.empty) {
            listEl.innerHTML = '<p class="no-comments">Belum ada pesan. Jadilah yang pertama! 🌷</p>';
            return;
        }

        listEl.innerHTML = '';
        snap.forEach(doc => {
            const d = doc.data();
            const time = d.waktu ? d.waktu.toDate() : new Date();
            appendCommentBubble(d.nama || 'Seseorang 🌸', d.pesan, time);
        });
    } catch (err) {
        console.error("Error loading comments:", err);
        listEl.innerHTML = '<p class="no-comments">Gagal memuat pesan. Coba refresh ya 😅</p>';
    }
}

// ============================================================
//  RENDER BUBBLE KOMENTAR
// ============================================================
function prependCommentBubble(name, msg, time) {
    const list = document.getElementById('commentsList');
    const noCom = list.querySelector('.no-comments');
    if (noCom) noCom.remove();

    const bubble = buildBubble(name, msg, time);
    list.prepend(bubble);
}

function appendCommentBubble(name, msg, time) {
    const list = document.getElementById('commentsList');
    list.appendChild(buildBubble(name, msg, time));
}

function buildBubble(name, msg, time) {
    const wrap = document.createElement('div');
    wrap.classList.add('comment-bubble');
    wrap.innerHTML = `
        <p class="comment-bubble-name">💌 ${escapeHtml(name)}</p>
        <p class="comment-bubble-msg">${escapeHtml(msg)}</p>
        <p class="comment-bubble-time">${formatTime(time)}</p>
    `;
    return wrap;
}

// ============================================================
//  HELPER: SIMPAN KE FIRESTORE
// ============================================================
async function saveMessage(pesan, nama) {
    if (!isFirebaseReady) {
        await new Promise(r => setTimeout(r, 700));
        return false; // demo mode
    }
    try {
        await addDoc(collection(db, "bucin_messages"), {
            nama, pesan, waktu: serverTimestamp()
        });
        return true;
    } catch (err) {
        console.error("Firestore error:", err);
        return null;
    }
}

// ============================================================
//  HELPER UTILS
// ============================================================
function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatTime(dateObj) {
    if (!dateObj) return '';
    const d = new Date(dateObj);
    if (isNaN(d.getTime())) return '';
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const mt = String(d.getMonth() + 1).padStart(2, '0');
    const yy = d.getFullYear();
    return `${hh}:${mm} - ${dd}/${mt}/${yy}`;
}

// ============================================================
//  MUSIC PLAYER
// ============================================================
window.toggleMusic = function() {
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggle');
    if (bgMusic.paused) {
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        musicBtn.classList.add('playing');
    } else {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
    }
};

// ============================================================
//  LANGUAGE TRANSLATIONS
// ============================================================
const translations = {
    id: {
        tagline: "Hai, kamu...", sub_tagline: "Ada yang pengen aku ceritain 🌙", btn_open: "Buka pesan ❤️",
        greet: "Selamat pagi, selamat siang, selamat malam...", greet_sub: "kapanpun kamu buka ini 🌙",
        secret_title: "\"Aku mau cerita sesuatu.\"", secret_sub: "Sesuatu yang udah lama aku pendam.",
        who1: "Ada satu orang yang tanpa disengaja", who2: "bikin hari-hariku jadi beda.",
        smile_block: "<p class='msg-normal'>Yang bikin aku senyum sendiri tengah malam,</p><p class='msg-normal'>padahal nggak ada yang lucu.</p><p class='msg-normal'>Yang namanya tiba-tiba muncul di pikiran,</p><p class='msg-normal'>padahal lagi ngerjain hal lain.</p>",
        type_block: "<p class='msg-normal'>Yang kadang bikin aku ngetik panjang</p><p class='msg-normal'>terus dihapus lagi karena nggak tau</p><p class='msg-big'>gimana cara ngungkapinnya.</p>",
        its_you: "Itu kamu.", btn_more: "Masih ada lagi... 🌸",
        like_title: "\"Aku suka banyak hal dari kamu.\"",
        like_laugh_block: "<p class='msg-normal'>Aku suka caramu ketawa —</p><p class='msg-normal'>yang kadang sampe nutup mulut sendiri,</p><p class='msg-normal'>lucu banget.</p>",
        like_tell_block: "<p class='msg-normal'>Aku suka caramu cerita hal-hal kecil</p><p class='msg-big'>kayak itu penting banget.</p><p class='msg-normal'>Dan memang itu penting,</p><p class='msg-normal'>karena <span class='highlight'>kamu</span> yang cerita.</p>",
        quote1: "\"Kamu tuh kayak lagu favorit. Nggak pernah capek didengerinnya.\"", quote1_credit: "— aku 🎵",
        think_block: "<p class='msg-normal'>Tiap hari aku nemuin satu alasan baru</p><p class='msg-big'>kenapa aku nggak bisa berhenti mikirin kamu.</p>",
        not_forced_block: "<p class='msg-normal'>Bukan karena aku maksa,</p><p class='msg-normal'>tapi karena kamu emang</p><p class='msg-big italic'>susah untuk dilupain.</p><p class='msg-emoji'>💕</p>",
        not_regret_block: "<p class='msg-normal'>Jadi...</p><p class='msg-big'>aku nggak mau nyesal</p><p class='msg-normal'>karena nggak pernah bilang.</p>",
        btn_next: "Lanjut... 💌",
        honest_title: "\"Kalau boleh jujur...\"",
        honest1_block: "<p class='msg-normal'>Aku nggak tau ini bakal ke mana,</p><p class='msg-normal'>aku nggak bisa janjiin hal-hal yang aku sendiri nggak yakin.</p>",
        honest2: "Tapi satu yang aku tau pasti —",
        quote2: "\"Aku mau ada buat kamu. Beneran.\"", quote2_credit: "— bukan cuma kata-kata 🤍",
        days_block: "<p class='msg-normal'>Di hari-hari kamu seneng,</p><p class='msg-normal'>aku mau ikut seneng.</p><p class='msg-normal'>Di hari-hari kamu capek,</p><p class='msg-big'>aku mau jadi tempat kamu istirahat.</p>",
        just_you_block: "<p class='msg-normal'>Nggak perlu sempurna,</p><p class='msg-normal'>nggak perlu pura-pura.</p><p class='msg-big italic'>Cukup jadi kamu aja.</p><p class='msg-emoji'>🌸</p>",
        enough_block: "<p class='msg-normal'>Karena kamu apa adanya</p><p class='msg-big'>udah lebih dari cukup buat aku.</p><p class='msg-emoji'>💞</p>",
        btn_gallery: "Liat foto kita dulu yuk... 📸",
        gallery_title: "\"Momen kita...\"", gallery_sub: "yang selalu bikin aku senyum sendiri 🥺",
        ph1: "Tambah foto di<br>assets/photo1.jpg", ph2: "Tambah foto di<br>assets/photo2.jpg", ph3: "Tambah foto di<br>assets/photo3.jpg", ph4: "Tambah foto di<br>assets/photo4.jpg", ph5: "Tambah foto di<br>assets/photo5.jpg",
        cap1: "Momen pertama ✨", cap2: "Selalu seru bareng 🌸", cap3: "Kita berdua 💞", cap4: "Kenangan manis 🍬", cap5: "Favorit aku 🌷", cap6: "Suka banget 💖",
        btn_question: "Ada yang mau aku tanya... 🥺", q_intro: "Satu pertanyaan doang...", q_question: "\"Kamu mau nggak jadi milikku?\"", q_hint: "Jawab jujur ya, aku nggak akan marah 🙏",
        yes_text: "MAU BANGET! 💞", no_text: "Ga mau 😅",
        final_thanks: "Yeay!! Makasih ya~ 🥰", final_p1: "Aku bakal jagain kamu, sungguh.", final_p2: "Selamanya? Kita lihat aja nanti... tapi aku serius. 💖",
        form_title: "Tinggalkan Pesanmu", form_desc: "Kamu juga mau bilang sesuatu? Tuliskan di sini~ ❤️", name_placeholder: "Nama kamu (opsional)", msg_placeholder: "Tulis pesan kamu di sini...", form_submit: "Kirim Pesan 💌",
        comments_title: "💌 Pesan dari semua orang", comments_loading: "Memuat pesan... 🌸",
        shift1_text: "Eh, yakin? 🤭", shift1_hint: "Ayo dong, jangan malu... 🥺", shift2_text: "Beneran nih? 🫣", shift2_hint: "Sekali lagi... ayooo!! 💕"
    },
    en: {
        tagline: "Hey, you...", sub_tagline: "There's something I want to tell you 🌙", btn_open: "Open message ❤️",
        greet: "Good morning, good afternoon, good evening...", greet_sub: "whenever you open this 🌙",
        secret_title: "\"I want to tell you something.\"", secret_sub: "Something I've kept for a long time.",
        who1: "There is one person who accidentally", who2: "made my days different.",
        smile_block: "<p class='msg-normal'>Who makes me smile to myself at midnight,</p><p class='msg-normal'>even when nothing is funny.</p><p class='msg-normal'>Whose name suddenly pops into my mind,</p><p class='msg-normal'>even when I'm doing other things.</p>",
        type_block: "<p class='msg-normal'>Who sometimes makes me type long messages</p><p class='msg-normal'>and delete them again because I don't know</p><p class='msg-big'>how to express it.</p>",
        its_you: "It's you.", btn_more: "There's more... 🌸",
        like_title: "\"I like many things about you.\"",
        like_laugh_block: "<p class='msg-normal'>I like the way you laugh —</p><p class='msg-normal'>sometimes even covering your mouth,</p><p class='msg-normal'>it's so cute.</p>",
        like_tell_block: "<p class='msg-normal'>I like how you talk about small things</p><p class='msg-big'>like they're so important.</p><p class='msg-normal'>And they are important,</p><p class='msg-normal'>because <span class='highlight'>you're</span> the one telling them.</p>",
        quote1: "\"You're like a favorite song. Never getting tired of listening to it.\"", quote1_credit: "— me 🎵",
        think_block: "<p class='msg-normal'>Every day I find one new reason</p><p class='msg-big'>why I can't stop thinking about you.</p>",
        not_forced_block: "<p class='msg-normal'>Not because I'm forcing it,</p><p class='msg-normal'>but because you are</p><p class='msg-big italic'>hard to forget.</p><p class='msg-emoji'>💕</p>",
        not_regret_block: "<p class='msg-normal'>So...</p><p class='msg-big'>I don't want to regret</p><p class='msg-normal'>never telling you.</p>",
        btn_next: "Next... 💌",
        honest_title: "\"To be honest...\"",
        honest1_block: "<p class='msg-normal'>I don't know where this is going,</p><p class='msg-normal'>I can't promise things I'm not sure of myself.</p>",
        honest2: "But one thing I know for sure —",
        quote2: "\"I want to be there for you. Really.\"", quote2_credit: "— not just words 🤍",
        days_block: "<p class='msg-normal'>On your happy days,</p><p class='msg-normal'>I want to be happy too.</p><p class='msg-normal'>On your tiring days,</p><p class='msg-big'>I want to be your resting place.</p>",
        just_you_block: "<p class='msg-normal'>No need to be perfect,</p><p class='msg-normal'>no need to pretend.</p><p class='msg-big italic'>Just be yourself.</p><p class='msg-emoji'>🌸</p>",
        enough_block: "<p class='msg-normal'>Because you, as you are,</p><p class='msg-big'>are more than enough for me.</p><p class='msg-emoji'>💞</p>",
        btn_gallery: "Let's see our photos first... 📸",
        gallery_title: "\"Our moments...\"", gallery_sub: "that always make me smile to myself 🥺",
        ph1: "Add photo in<br>assets/photo1.jpg", ph2: "Add photo in<br>assets/photo2.jpg", ph3: "Add photo in<br>assets/photo3.jpg", ph4: "Add photo in<br>assets/photo4.jpg", ph5: "Add photo in<br>assets/photo5.jpg",
        cap1: "First moment ✨", cap2: "Always fun together 🌸", cap3: "The two of us 💞", cap4: "Sweet memories 🍬", cap5: "My favorite 🌷", cap6: "Love it 💖",
        btn_question: "There's something I want to ask... 🥺", q_intro: "Just one question...", q_question: "\"Do you want to be mine?\"", q_hint: "Answer honestly, I won't be mad 🙏",
        yes_text: "YES, I DO! 💞", no_text: "No 😅",
        final_thanks: "Yay!! Thank you~ 🥰", final_p1: "I will take care of you, I promise.", final_p2: "Forever? We'll see... but I'm serious. 💖",
        form_title: "Leave a Message", form_desc: "Do you want to say something too? Write it here~ ❤️", name_placeholder: "Your name (optional)", msg_placeholder: "Write your message here...", form_submit: "Send Message 💌",
        comments_title: "💌 Messages from everyone", comments_loading: "Loading messages... 🌸",
        shift1_text: "Wait, really? 🤭", shift1_hint: "Come on, don't be shy... 🥺", shift2_text: "Are you sure? 🫣", shift2_hint: "One more time... come on!! 💕"
    },
    ja: {
        tagline: "ねえ、君...", sub_tagline: "伝えたいことがあるんだ 🌙", btn_open: "メッセージを開く ❤️",
        greet: "おはよう、こんにちは、こんばんは...", greet_sub: "いつ開いてもいいように 🌙",
        secret_title: "「話したいことがあるんだ。」", secret_sub: "ずっと心に秘めていたこと。",
        who1: "偶然にも", who2: "僕の毎日を変えてくれた人がいる。",
        smile_block: "<p class='msg-normal'>真夜中に一人で笑ってしまうのは、</p><p class='msg-normal'>別に面白いことがあったわけじゃない。</p><p class='msg-normal'>急に名前が頭に浮かぶのは、</p><p class='msg-normal'>他のことをしている時でも。</p>",
        type_block: "<p class='msg-normal'>長いメッセージを打っては</p><p class='msg-normal'>消してしまうのは、</p><p class='msg-big'>どう伝えたらいいか分からないから。</p>",
        its_you: "それは、君だ。", btn_more: "まだあるよ... 🌸",
        like_title: "「君の好きなところがたくさんある。」",
        like_laugh_block: "<p class='msg-normal'>君の笑い方が好き —</p><p class='msg-normal'>たまに口を隠して笑うところとか、</p><p class='msg-normal'>すごく可愛い。</p>",
        like_tell_block: "<p class='msg-normal'>小さなことを話す君が好き</p><p class='msg-big'>まるでそれがすごく重要なことみたいに。</p><p class='msg-normal'>そしてそれは本当に重要なんだ、</p><p class='msg-normal'>だって<span class='highlight'>君</span>が話しているから。</p>",
        quote1: "「君はまるでお気に入りの歌みたい。何度聴いても飽きない。」", quote1_credit: "— 僕 🎵",
        think_block: "<p class='msg-normal'>毎日、新しい理由を見つけるんだ</p><p class='msg-big'>君のことが頭から離れない理由を。</p>",
        not_forced_block: "<p class='msg-normal'>無理しているわけじゃない、</p><p class='msg-normal'>ただ君が</p><p class='msg-big italic'>忘れられないだけなんだ。</p><p class='msg-emoji'>💕</p>",
        not_regret_block: "<p class='msg-normal'>だから...</p><p class='msg-big'>後悔したくないんだ</p><p class='msg-normal'>伝えなかったことを。</p>",
        btn_next: "次へ... 💌",
        honest_title: "「正直に言うと...」",
        honest1_block: "<p class='msg-normal'>これがどうなるかは分からない、</p><p class='msg-normal'>自分でも確信のないことは約束できない。</p>",
        honest2: "でも、一つだけ確実に分かっているのは —",
        quote2: "「君のそばにいたい。本当に。」", quote2_credit: "— ただの言葉じゃない 🤍",
        days_block: "<p class='msg-normal'>君が嬉しい日は、</p><p class='msg-normal'>僕も一緒に喜びたい。</p><p class='msg-normal'>君が疲れた日は、</p><p class='msg-big'>僕が君の休む場所になりたい。</p>",
        just_you_block: "<p class='msg-normal'>完璧じゃなくていい、</p><p class='msg-normal'>無理して演じる必要もない。</p><p class='msg-big italic'>ただ、君のままでいて。</p><p class='msg-emoji'>🌸</p>",
        enough_block: "<p class='msg-normal'>ありのままの君で、</p><p class='msg-big'>僕にはもう十分すぎるから。</p><p class='msg-emoji'>💞</p>",
        btn_gallery: "先に写真を見よう... 📸",
        gallery_title: "「僕たちの瞬間...」", gallery_sub: "いつも僕を笑顔にさせてくれる 🥺",
        ph1: "写真を追加<br>assets/photo1.jpg", ph2: "写真を追加<br>assets/photo2.jpg", ph3: "写真を追加<br>assets/photo3.jpg", ph4: "写真を追加<br>assets/photo4.jpg", ph5: "写真を追加<br>assets/photo5.jpg",
        cap1: "最初の瞬間 ✨", cap2: "いつも楽しいね 🌸", cap3: "二人で 💞", cap4: "甘い思い出 🍬", cap5: "一番のお気に入り 🌷", cap6: "大好き 💖",
        btn_question: "聞きたいことがあるんだ... 🥺", q_intro: "質問は一つだけ...", q_question: "「僕のものになってくれない？」", q_hint: "正直に答えてね、怒らないから 🙏",
        yes_text: "喜んで！ 💞", no_text: "ごめん 😅",
        final_thanks: "やったー！！ありがとう〜 🥰", final_p1: "絶対に君を守るからね。", final_p2: "永遠に？それは分からないけど...本気だよ。 💖",
        form_title: "メッセージを残す", form_desc: "君も何か言いたい？ここに書いてね〜 ❤️", name_placeholder: "あなたの名前（任意）", msg_placeholder: "ここにメッセージを書いてね...", form_submit: "送信する 💌",
        comments_title: "💌 みんなからのメッセージ", comments_loading: "読み込み中... 🌸",
        shift1_text: "えっ、本当に？ 🤭", shift1_hint: "さあ、恥ずかしがらないで... 🥺", shift2_text: "本気なの？ 🫣", shift2_hint: "もう一回... さあ！！ 💕"
    },
    ko: {
        tagline: "저기요...", sub_tagline: "해주고 싶은 말이 있어요 🌙", btn_open: "메시지 열기 ❤️",
        greet: "좋은 아침, 좋은 오후, 좋은 저녁...", greet_sub: "언제 열어보든 🌙",
        secret_title: "\"할 말이 있어요.\"", secret_sub: "오랫동안 마음에 담아두었던 말.",
        who1: "우연히도", who2: "내 일상을 바꿔놓은 사람이 있어요.",
        smile_block: "<p class='msg-normal'>한밤중에 혼자 웃게 만드는 건,</p><p class='msg-normal'>특별히 재미있는 일이 있어서가 아니에요.</p><p class='msg-normal'>갑자기 이름이 떠오르는 건,</p><p class='msg-normal'>다른 일을 하고 있을 때도 그래요.</p>",
        type_block: "<p class='msg-normal'>가끔 긴 메시지를 썼다가</p><p class='msg-normal'>다시 지우는 이유는</p><p class='msg-big'>어떻게 표현해야 할지 모르겠어서요.</p>",
        its_you: "그게 바로 당신이에요.", btn_more: "아직 더 있어요... 🌸",
        like_title: "\"당신의 많은 점을 좋아해요.\"",
        like_laugh_block: "<p class='msg-normal'>나는 당신이 웃는 모습이 좋아요 —</p><p class='msg-normal'>가끔 입을 가리고 웃는 것도,</p><p class='msg-normal'>너무 귀여워요.</p>",
        like_tell_block: "<p class='msg-normal'>사소한 것들을 이야기하는 당신이 좋아요</p><p class='msg-big'>마치 그게 아주 중요한 것처럼.</p><p class='msg-normal'>그리고 그건 정말 중요해요,</p><p class='msg-normal'>왜냐하면 <span class='highlight'>당신</span>이 이야기하니까요.</p>",
        quote1: "\"당신은 가장 좋아하는 노래 같아요. 아무리 들어도 질리지 않죠.\"", quote1_credit: "— 나 🎵",
        think_block: "<p class='msg-normal'>매일 새로운 이유를 찾아요</p><p class='msg-big'>내가 당신 생각을 멈출 수 없는 이유를.</p>",
        not_forced_block: "<p class='msg-normal'>억지로 그러는 게 아니에요,</p><p class='msg-normal'>단지 당신이</p><p class='msg-big italic'>잊기 힘든 사람이라서요.</p><p class='msg-emoji'>💕</p>",
        not_regret_block: "<p class='msg-normal'>그래서...</p><p class='msg-big'>후회하고 싶지 않아요</p><p class='msg-normal'>말하지 않은 것을.</p>",
        btn_next: "다음... 💌",
        honest_title: "\"솔직히 말하면...\"",
        honest1_block: "<p class='msg-normal'>이게 어디로 갈지는 모르겠어요,</p><p class='msg-normal'>나도 확신할 수 없는 걸 약속할 순 없어요.</p>",
        honest2: "하지만 한 가지 확실한 건 —",
        quote2: "\"당신 곁에 있고 싶어요. 정말로.\"", quote2_credit: "— 빈말이 아니에요 🤍",
        days_block: "<p class='msg-normal'>당신이 기쁜 날엔,</p><p class='msg-normal'>나도 같이 기뻐하고 싶어요.</p><p class='msg-normal'>당신이 지친 날엔,</p><p class='msg-big'>내가 당신의 쉴 곳이 되고 싶어요.</p>",
        just_you_block: "<p class='msg-normal'>완벽하지 않아도 돼요,</p><p class='msg-normal'>애써 꾸밀 필요도 없어요.</p><p class='msg-big italic'>그냥 당신이면 충분해요.</p><p class='msg-emoji'>🌸</p>",
        enough_block: "<p class='msg-normal'>있는 그대로의 당신으로,</p><p class='msg-big'>나에겐 이미 차고 넘치니까요.</p><p class='msg-emoji'>💞</p>",
        btn_gallery: "우리 사진 먼저 볼까요... 📸",
        gallery_title: "\"우리의 순간들...\"", gallery_sub: "항상 나를 미소 짓게 해 🥺",
        ph1: "사진 추가<br>assets/photo1.jpg", ph2: "사진 추가<br>assets/photo2.jpg", ph3: "사진 추가<br>assets/photo3.jpg", ph4: "사진 추가<br>assets/photo4.jpg", ph5: "사진 추가<br>assets/photo5.jpg",
        cap1: "첫 순간 ✨", cap2: "항상 즐거워 🌸", cap3: "우리 둘 💞", cap4: "달콤한 추억 🍬", cap5: "내가 제일 좋아하는 🌷", cap6: "너무 좋아 💖",
        btn_question: "물어보고 싶은 게 있어요... 🥺", q_intro: "질문은 딱 하나...", q_question: "\"내 사람이 되어줄래요?\"", q_hint: "솔직하게 대답해줘요, 화내지 않을게요 🙏",
        yes_text: "네, 좋아요! 💞", no_text: "아니요 😅",
        final_thanks: "와!! 고마워요~ 🥰", final_p1: "내가 지켜줄게요, 정말로.", final_p2: "영원히? 그건 두고 봐야겠지만... 진심이에요. 💖",
        form_title: "메시지 남기기", form_desc: "당신도 하고 싶은 말이 있나요? 여기에 적어주세요~ ❤️", name_placeholder: "당신의 이름 (선택사항)", msg_placeholder: "여기에 메시지를 적어주세요...", form_submit: "메시지 보내기 💌",
        comments_title: "💌 모두가 남긴 메시지", comments_loading: "메시지 불러오는 중... 🌸",
        shift1_text: "어, 진짜요? 🤭", shift1_hint: "자, 부끄러워하지 말고... 🥺", shift2_text: "확실해요? 🫣", shift2_hint: "다시 한 번... 자!! 💕"
    },
    fr: {
        tagline: "Hé, toi...", sub_tagline: "J'ai quelque chose à te dire 🌙", btn_open: "Ouvrir le message ❤️",
        greet: "Bonjour, bon après-midi, bonsoir...", greet_sub: "peu importe quand tu ouvres ceci 🌙",
        secret_title: "\"Je veux te dire quelque chose.\"", secret_sub: "Quelque chose que je garde depuis longtemps.",
        who1: "Il y a une personne qui, sans le vouloir,", who2: "a rendu mes journées différentes.",
        smile_block: "<p class='msg-normal'>Qui me fait sourire tout seul à minuit,</p><p class='msg-normal'>même quand rien n'est drôle.</p><p class='msg-normal'>Dont le nom me vient soudainement à l'esprit,</p><p class='msg-normal'>même quand je fais autre chose.</p>",
        type_block: "<p class='msg-normal'>Qui me fait parfois taper de longs messages</p><p class='msg-normal'>et les supprimer ensuite parce que je ne sais pas</p><p class='msg-big'>comment l'exprimer.</p>",
        its_you: "C'est toi.", btn_more: "Il y a plus... 🌸",
        like_title: "\"J'aime beaucoup de choses chez toi.\"",
        like_laugh_block: "<p class='msg-normal'>J'aime ta façon de rire —</p><p class='msg-normal'>parfois même en couvrant ta bouche,</p><p class='msg-normal'>c'est tellement mignon.</p>",
        like_tell_block: "<p class='msg-normal'>J'aime comment tu parles des petites choses</p><p class='msg-big'>comme si elles étaient si importantes.</p><p class='msg-normal'>Et elles sont importantes,</p><p class='msg-normal'>parce que c'est <span class='highlight'>toi</span> qui les racontes.</p>",
        quote1: "\"Tu es comme une chanson préférée. On ne se lasse jamais de l'écouter.\"", quote1_credit: "— moi 🎵",
        think_block: "<p class='msg-normal'>Chaque jour je trouve une nouvelle raison</p><p class='msg-big'>pour laquelle je ne peux pas m'empêcher de penser à toi.</p>",
        not_forced_block: "<p class='msg-normal'>Ce n'est pas parce que je me force,</p><p class='msg-normal'>mais parce que tu es</p><p class='msg-big italic'>difficile à oublier.</p><p class='msg-emoji'>💕</p>",
        not_regret_block: "<p class='msg-normal'>Donc...</p><p class='msg-big'>Je ne veux pas regretter</p><p class='msg-normal'>de ne jamais te l'avoir dit.</p>",
        btn_next: "Suivant... 💌",
        honest_title: "\"Pour être honnête...\"",
        honest1_block: "<p class='msg-normal'>Je ne sais pas où ça va,</p><p class='msg-normal'>Je ne peux pas promettre des choses dont je ne suis pas sûr moi-même.</p>",
        honest2: "Mais une chose dont je suis sûr —",
        quote2: "\"Je veux être là pour toi. Vraiment.\"", quote2_credit: "— pas juste des mots 🤍",
        days_block: "<p class='msg-normal'>Les jours où tu es heureux,</p><p class='msg-normal'>je veux l'être aussi.</p><p class='msg-normal'>Les jours où tu es fatigué,</p><p class='msg-big'>je veux être ton lieu de repos.</p>",
        just_you_block: "<p class='msg-normal'>Pas besoin d'être parfait,</p><p class='msg-normal'>pas besoin de faire semblant.</p><p class='msg-big italic'>Sois juste toi-même.</p><p class='msg-emoji'>🌸</p>",
        enough_block: "<p class='msg-normal'>Parce que toi, tel que tu es,</p><p class='msg-big'>c'est plus qu'assez pour moi.</p><p class='msg-emoji'>💞</p>",
        btn_gallery: "Regardons nos photos d'abord... 📸",
        gallery_title: "\"Nos moments...\"", gallery_sub: "qui me font toujours sourire 🥺",
        ph1: "Ajouter photo<br>assets/photo1.jpg", ph2: "Ajouter photo<br>assets/photo2.jpg", ph3: "Ajouter photo<br>assets/photo3.jpg", ph4: "Ajouter photo<br>assets/photo4.jpg", ph5: "Ajouter photo<br>assets/photo5.jpg",
        cap1: "Premier moment ✨", cap2: "Toujours amusant 🌸", cap3: "Nous deux 💞", cap4: "Doux souvenirs 🍬", cap5: "Mon préféré 🌷", cap6: "J'adore 💖",
        btn_question: "J'ai quelque chose à te demander... 🥺", q_intro: "Juste une question...", q_question: "\"Veux-tu être à moi ?\"", q_hint: "Réponds honnêtement, je ne serai pas fâché 🙏",
        yes_text: "OUI, JE LE VEUX ! 💞", no_text: "Non 😅",
        final_thanks: "Youpi !! Merci~ 🥰", final_p1: "Je prendrai soin de toi, promis.", final_p2: "Pour toujours ? On verra... mais je suis sérieux. 💖",
        form_title: "Laisser un message", form_desc: "Tu veux dire quelque chose aussi ? Écris-le ici~ ❤️", name_placeholder: "Ton nom (facultatif)", msg_placeholder: "Écris ton message ici...", form_submit: "Envoyer le message 💌",
        comments_title: "💌 Messages de tout le monde", comments_loading: "Chargement des messages... 🌸",
        shift1_text: "Attends, vraiment ? 🤭", shift1_hint: "Allez, ne sois pas timide... 🥺", shift2_text: "Tu es sûr ? 🫣", shift2_hint: "Encore une fois... allez !! 💕"
    }
};

window.setLanguage = function(lang) {
    // Update active button highlight
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Map lang code to Google Translate language code
    const gtLangMap = {
        id: 'id',
        en: 'en',
        ja: 'ja',
        ko: 'ko',
        fr: 'fr'
    };

    const targetLang = gtLangMap[lang] || lang;

    // Trigger Google Translate
    triggerGoogleTranslate(targetLang);
};

function triggerGoogleTranslate(lang) {
    // If switching back to Indonesian (default), restore the page
    if (lang === 'id') {
        // Reset Google Translate by clicking the "Show Original" if available
        const restoreEl = document.querySelector('.goog-te-menu-value');
        // Try to find and reset via cookie method
        const iframe = document.querySelector('.goog-te-banner-frame');
        if (iframe) {
            const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            const restoreBtn = innerDoc.querySelector('.goog-te-banner-content .goog-te-button button');
            if (restoreBtn) { restoreBtn.click(); return; }
        }
        // Cookie-based reset for Google Translate
        const googCookie = '/id/id';
        document.cookie = `googtrans=${googCookie}; path=/`;
        document.cookie = `googtrans=${googCookie}; domain=${location.hostname}; path=/`;
        location.reload();
        return;
    }

    // Use Google Translate's select element (most reliable method)
    const tryTranslate = (attempts = 0) => {
        const teSelect = document.querySelector('.goog-te-combo');
        if (teSelect) {
            teSelect.value = lang;
            teSelect.dispatchEvent(new Event('change', { bubbles: true }));
        } else if (attempts < 20) {
            // Widget not ready yet, retry
            setTimeout(() => tryTranslate(attempts + 1), 300);
        }
    };

    // Also set cookie as fallback (for page reloads)
    document.cookie = `googtrans=/id/${lang}; path=/`;
    document.cookie = `googtrans=/id/${lang}; domain=${location.hostname}; path=/`;
    
    tryTranslate();
}


// ============================================================
//  AUTOPLAY MUSIC (ON FIRST INTERACTION)
// ============================================================
let hasInteracted = false;
document.addEventListener('click', () => {
    if (!hasInteracted) {
        hasInteracted = true;
        const bgMusic = document.getElementById('bgMusic');
        const musicBtn = document.getElementById('musicToggle');
        if (bgMusic && bgMusic.paused) {
            bgMusic.play().then(() => {
                if(musicBtn) musicBtn.classList.add('playing');
            }).catch(e => console.log("Autoplay prevented:", e));
        }
    }
}, { once: true });

// ============================================================
//  SETTINGS & THEME
// ============================================================
window.openSettings = function() {
    // Hide all screens, show settings screen
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById('settingsScreen').classList.remove('hidden');
    window.scrollTo(0, 0);
};
window.closeSettings = function() {
    // Go back to screen 1
    goToScreen(1);
};

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        // Auto
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }
}

window.changeTheme = function(theme) {
    localStorage.setItem('bucin_theme', theme);
    applyTheme(theme);
};

// Initialize Theme
const savedTheme = localStorage.getItem('bucin_theme') || 'auto';
const themeRadio = document.querySelector(`input[name="theme"][value="${savedTheme}"]`);
if (themeRadio) themeRadio.checked = true;
applyTheme(savedTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (localStorage.getItem('bucin_theme') === 'auto') applyTheme('auto');
});

// ============================================================
//  PARTICLES TOGGLE
// ============================================================
window.toggleParticles = function() {
    const isChecked = document.getElementById('particlesToggle').checked;
    const particlesDiv = document.getElementById('particles');
    if (particlesDiv) {
        particlesDiv.style.display = isChecked ? 'block' : 'none';
    }
};

// ============================================================
//  PRAYER TIMES
// ============================================================
let currentPrayerData = null;

window.fetchPrayerTimes = function() {
    const btn = document.getElementById('getLocationBtn');
    if (!navigator.geolocation) {
        alert("Geolocation tidak didukung di browser ini.");
        return;
    }
    
    btn.textContent = "📍 Mencari lokasi...";
    btn.disabled = true;

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const date = new Date();
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            const dateStr = `${dd}-${mm}-${yyyy}`;

            fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lon}&method=11`)
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        currentPrayerData = data.data.timings;
                        applyPrayerOffset();
                        document.getElementById('prayerSchedule').classList.remove('hidden');
                        btn.textContent = "✅ Jadwal Diperbarui";
                    }
                })
                .catch(e => {
                    console.error("Gagal mengambil jadwal", e);
                    btn.textContent = "❌ Gagal mengambil data";
                })
                .finally(() => {
                    setTimeout(() => { btn.disabled = false; btn.textContent = "📍 Perbarui Jadwal"; }, 3000);
                });
        },
        (error) => {
            console.error("Gagal mendapat lokasi:", error);
            alert("Akses lokasi ditolak atau gagal.");
            btn.textContent = "📍 Dapatkan Jadwal";
            btn.disabled = false;
        }
    );
};

window.applyPrayerOffset = function() {
    if (!currentPrayerData) return;
    
    const offset = parseInt(document.getElementById('prayerOffset').value) || 0;
    const scheduleDiv = document.getElementById('prayerSchedule');
    
    const keysToShow = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const names = {
        Fajr:    { label: 'Subuh',    emoji: '🌅' },
        Dhuhr:   { label: 'Dzuhur',   emoji: '☀️' },
        Asr:     { label: 'Ashar',    emoji: '🌤️' },
        Maghrib: { label: 'Maghrib',  emoji: '🌇' },
        Isha:    { label: 'Isya',     emoji: '🌙' }
    };
    
    let html = '';
    keysToShow.forEach(key => {
        let timeStr = currentPrayerData[key];
        if (offset !== 0) {
            let [h, m] = timeStr.split(':').map(Number);
            m += offset;
            if (m >= 60) { m -= 60; h += 1; }
            if (h >= 24) { h -= 24; }
            timeStr = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
        }
        html += `<div class="prayer-row">
            <span class="prayer-name">${names[key].emoji} ${names[key].label}</span>
            <span class="prayer-time">${timeStr}</span>
        </div>`;
    });
    
    scheduleDiv.innerHTML = html;
};

window.toggleMusicFromSettings = function() {
    const isChecked = document.getElementById('musicToggleSettings').checked;
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggle');
    if (isChecked) {
        bgMusic.play().catch(e => console.log("Play failed:", e));
        if (musicBtn) musicBtn.classList.add('playing');
    } else {
        bgMusic.pause();
        if (musicBtn) musicBtn.classList.remove('playing');
    }
};

