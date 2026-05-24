/* 本来面目らぼ LP scripts */

(function () {
  'use strict';

  // ヘッダーのスクロール状態
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // モバイルナビ
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('primaryNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  // FAQ アコーディオン
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const q = item.querySelector('.faq-q');
    if (q) {
      q.addEventListener('click', function () {
        item.classList.toggle('open');
      });
    }
  });

  // スクロールリビール
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('in');
    });
  }
})();
