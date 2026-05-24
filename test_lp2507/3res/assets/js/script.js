document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.hamburger');
  var menu = document.querySelector('nav.hamburger_menu');

  if (!hamburger || !menu) {
    console.error('ハンバーガーメニューの要素が見つかりません');
    return;
  }

  // ハンバーガーボタンのクリック処理
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('open');
    menu.classList.toggle('open');
  });

  // 外部クリックでメニューを閉じる処理
  document.addEventListener('click', function(event) {
    var target = event.target;
    var its_menu = menu.contains(target);
    var its_hamburger = hamburger.contains(target);
    var menu_is_open = menu.classList.contains('open');

    if (!its_menu && !its_hamburger && menu_is_open) {
      hamburger.classList.remove('open');
      menu.classList.remove('open');
    }
  });
});






$(document).ready(function(){
  $('.slider').slick({
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 300,
    fade: true,
    arrows: false,
    slidesToShow: 1,
    adaptiveHeight: true
    // その他のオプション...
  });
});



$(document).ready(function(){
  $(".works-carousel").owlCarousel({
    loop: true,
    margin: 25,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000, // スライド間の待機時間を延長
    autoplayHoverPause: true,
    autoplaySpeed: 1000, // スライドの切り替わるスピードを短縮
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  });
});

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 25,
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000, // スライド間の待機時間を延長
    autoplayHoverPause: true,
    autoplaySpeed: 1000, // スライドの切り替わるスピードを短縮
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
    // ボタンが表示されるタイミングの設定
    window.onscroll = function() {
        var scrollTopBtn = document.getElementById("scrollTopBtn");
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    };

    // ボタンのクリックイベントを設定
    var scrollTopBtn = document.getElementById("scrollTopBtn");
    scrollTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // スムーズスクロールを有効化
        });
    });
});


// DOMが完全に読み込まれた後に関数を実行
document.addEventListener('DOMContentLoaded', function() {
  // 'mv-scroll'クラスを持つ要素を探す
  var scrollLink = document.querySelector('.mv-scroll');

  // 要素が存在するかを確認
  if (scrollLink) {
    // その要素に対してクリックイベントリスナーを追加
    scrollLink.addEventListener('click', function(e) {
      // デフォルトのアンカー動作を防止
      e.preventDefault();

      // 画面の高さ（100vh）に相当する量だけスクロール
      var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

      // スムーズなスクロールを実行
      window.scrollBy({
        top: vh,
        left: 0,
        behavior: 'smooth'
      });
    });
  }
});

  $(function() {
    $('a[href^="#"]').on('click', function(e) {
      e.preventDefault(); // デフォルトのジャンプを無効化
      const target = $($(this).attr('href'));
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 600); // 600ミリ秒かけてスクロール
      }
    });
  });

// // DOMが完全に読み込まれた後に関数を実行
// document.addEventListener('DOMContentLoaded', function() {
//   // 'mv-scroll'クラスを持つ要素を探す
//   var scrollLink = document.querySelector('.mv-scroll');
//
//   // その要素に対してクリックイベントリスナーを追加
//   scrollLink.addEventListener('click', function(e) {
//     // デフォルトのアンカー動作を防止
//     e.preventDefault();
//
//     // 画面の高さ（100vh）に相当する量だけスクロール
//     var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
//
//     // スムーズなスクロールを実行
//     window.scrollBy({
//       top: vh,
//       left: 0,
//       behavior: 'smooth'
//     });
//   });
// });
