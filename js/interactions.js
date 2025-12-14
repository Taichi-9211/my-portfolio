/* =========================================
   Loading Animation Logic
   ========================================= */
// ページのスクロールを禁止にする（ロード中）
document.body.style.overflow = "hidden";

document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const loadingText = document.getElementById("loading-text");
  const progressBar = document.getElementById("progress-bar");

  let progress = 0;
  // カウントアップの速度調整 (ミリ秒)
  const intervalTime = 20;

  // 擬似的なロードアニメーション
  const interval = setInterval(() => {
    // ランダムな数値で進捗を進める（自然な動きに見せるため）
    progress += Math.random() * 2.5;

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      // 100%になったら少し待ってからフェードアウト
      setTimeout(() => {
        loadingScreen.classList.add("loaded");
        document.body.style.overflow = ""; // スクロール禁止を解除

        // 【重要】ロード完了後にヒーローセクションのアニメーションを発火させる
        triggerHeroAnimations();
      }, 500);
    }

    // 表示の更新
    loadingText.textContent = Math.floor(progress) + "%";
    progressBar.style.width = progress + "%";
  }, intervalTime);

  // ヒーローセクションのアニメーションを強制発火させる関数
  function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll("#hero .animate-on-scroll");
    heroElements.forEach((el) => {
      el.classList.add("is-visible");
    });
  }
});

// ここから下は既存のコード...
// document.addEventListener("DOMContentLoaded", () => { ...

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  let lastScrollY = 0;

  // Scroll handler for header styling
  window.addEventListener("scroll", () => {
    lastScrollY = window.scrollY;

    if (lastScrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    updateNavOnScroll();
  });

  // Hamburger Menu Logic
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("header nav");
  const navLinks = document.querySelectorAll("header nav a");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      nav.classList.toggle("open");
    });

    // Close menu when a link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        nav.classList.remove("open");
      });
    });
  }

  function updateNavOnScroll() {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll("header nav a");
    const headerHeight = header.offsetHeight;

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;

      if (
        lastScrollY >= sectionTop &&
        lastScrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");

      console.log("[v0] Form submitted with data:", { name, email });

      // Create success message element
      const successMsg = document.createElement("div");
      successMsg.className = "success-message";
      successMsg.textContent =
        "メッセージありがとうございます。後ほどご連絡いたします。";
      successMsg.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(90deg, #00d9ff, #ff006e);
        color: #000;
        padding: 20px 30px;
        border-radius: 8px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        font-weight: 700;
      `;
      document.body.appendChild(successMsg);

      setTimeout(() => {
        successMsg.style.animation = "slideOut 0.3s ease";
        setTimeout(() => successMsg.remove(), 300);
      }, 3000);

      this.reset();
    });
  }

  // Work items 3D hover effect
  const workItems = document.querySelectorAll(".work-item");
  workItems.forEach((item, index) => {
    // Add staggered delay based on index for the scroll animation, not CSS animation
    item.style.transitionDelay = `${(index % 3) * 0.1}s`;

    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Other hover effects...
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card, index) => {
    // Stagger for scroll anim
    card.style.transitionDelay = `${index * 0.1}s`;

    card.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 30px 60px rgba(0, 217, 255, 0.2)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.boxShadow = "none";
    });
  });
});
