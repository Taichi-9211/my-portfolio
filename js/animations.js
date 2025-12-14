document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. スクロールアニメーション (Intersection Observer)
  // ==========================================
  const observerOptions = {
    threshold: 0.15, // 要素が15%見えたら発火
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // クラスを追加してCSSでアニメーションさせる
        entry.target.classList.add("is-visible");
        // 一度表示したら監視を解除
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // ==========================================
  // 2. ヒーローセクションのパララックス効果
  // ==========================================
  const hero = document.querySelector("#hero");
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const scrollPercent = scrolled / window.innerHeight;

      hero.style.transform = `translateY(${scrolled * 0.4}px)`;

      const heroContent = hero.querySelector(".section-inner");
      if (heroContent) {
        heroContent.style.opacity = 1 - scrollPercent * 1.5;
      }
    });
  }

  // ==========================================
  // 3. 数字のカウントアップアニメーション
  // ==========================================
  const countupElements = document.querySelectorAll(".stat-number");
  let hasAnimated = false;

  const animateCounters = () => {
    countupElements.forEach((element) => {
      const text = element.textContent;
      const target = parseInt(text.replace(/[^0-9]/g, ""), 10);
      const suffix = text.replace(/[0-9]/g, "");

      let current = 0;
      const increment = target / 50;

      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target + suffix;
          clearInterval(counter);
        } else {
          element.textContent = Math.floor(current) + suffix;
        }
      }, 30);
    });
  };

  window.addEventListener("scroll", () => {
    const statsSection = document.querySelector(".about-stats");
    if (statsSection && !hasAnimated) {
      const rect = statsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        animateCounters();
        hasAnimated = true;
      }
    }
  });

  // ==========================================
  // 4. 画像ポップアップ機能 (ここを追加・統合)
  // ==========================================
  const modal = document.getElementById("popup-modal");
  const modalImg = document.getElementById("img01");
  const images = document.querySelectorAll(".works-img");
  const closeBtn = document.querySelector(".close-btn");

  // モーダル要素が存在する場合のみ実行（エラー防止）
  if (modal && modalImg) {
    // 各画像をクリックした時の処理
    images.forEach((img) => {
      img.addEventListener("click", function () {
        modal.style.display = "block"; // ポップアップを表示
        modalImg.src = this.src; // 画像パスを設定
      });
    });

    // 閉じるボタン (×) をクリックした時の処理
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }

    // 背景（黒い部分）をクリックしても閉じる処理
    // window.onclick は他の処理と競合するため addEventListener に変更
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});
