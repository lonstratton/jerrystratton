// Declare the variable outside the $(document).ready block	
var scrollPosition = 0;

function saveScrollPosition() {
  scrollPosition = $(window).scrollTop();
}

function restoreScrollPosition() {
  $(window).scrollTop(scrollPosition);
}

function ensureSharedModal() {
  if (document.getElementById('sharedModal')) return;

  document.body.insertAdjacentHTML('beforeend', `
    <div id="sharedModal" class="modal" aria-hidden="true">
      <span class="close" id="modalClose">&times;</span>
      <div class="modal-content-wrap">
        <img id="sharedModalImage" class="modal-image" alt="">
        <iframe id="sharedModalIframe" class="modal-iframe" src="" allowfullscreen></iframe>
      </div>
    </div>
  `);
}

function openSharedModal(type, src) {
  ensureSharedModal();
  saveScrollPosition();

  var modal = document.getElementById('sharedModal');
  var image = document.getElementById('sharedModalImage');
  var iframe = document.getElementById('sharedModalIframe');

  $('body').css('overflow', 'hidden');

  image.classList.remove('is-active');
  iframe.classList.remove('is-active');

  image.src = '';
  iframe.src = '';

  if (type === 'image') {
    image.src = src;
    image.classList.add('is-active');
  }

  if (type === 'iframe') {
    iframe.src = src;
    iframe.classList.add('is-active');
  }

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');

  document.addEventListener('keydown', closeSharedModalOnEscape);
}

function closeSharedModal() {
  var modal = document.getElementById('sharedModal');
  var image = document.getElementById('sharedModalImage');
  var iframe = document.getElementById('sharedModalIframe');

  if (!modal) return;

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');

  image.classList.remove('is-active');
  iframe.classList.remove('is-active');

  image.src = '';
  iframe.src = '';

  $('body').css('overflow', 'auto');
  document.removeEventListener('keydown', closeSharedModalOnEscape);
  restoreScrollPosition();
}

function closeSharedModalOnEscape(event) {
  if (event.key === 'Escape') {
    closeSharedModal();
  }
}

function openModal(imageSrc) {
  openSharedModal('image', imageSrc);
}

function openiframeModal(iframeSrc) {
  openSharedModal('iframe', iframeSrc);
}

$(document).ready(function () {
  /* shared modal */
  ensureSharedModal();

  $(document).on('click', '#modalClose', function () {
    closeSharedModal();
  });

  $(document).on('click', '#sharedModal', function (e) {
    if (e.target.id === 'sharedModal') {
      closeSharedModal();
    }
  });

  $(document).on('click', '#sharedModalImage', function () {
    closeSharedModal();
  });

  // Smooth scrolling - css-tricks.com
  function filterPath(string) {
    return string.replace(/^\//, '').replace(/(index|default).[a-zA-Z]{3,4}$/, '').replace(/\/$/, '');
  }

  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');

  $('a[href*=#nav]').each(function () {
    var thisPath = filterPath(this.pathname) || locationPath;

    if (locationPath == thisPath && (location.hostname == this.hostname || !this.hostname) && this.hash.replace(/#/, '')) {
      var $target = $(this.hash),
        target = this.hash;

      if (target) {
        var targetOffset = $target.offset().top;

        $(this).click(function (event) {
          event.preventDefault();
          $(scrollElem).animate({
            scrollTop: targetOffset
          }, 'slow', function () {
            location.hash = target;
          });
        });
      }
    }
  });

  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i < argLength; i++) {
      var el = arguments[i],
        $scrollElement = $(el);

      if ($scrollElement.scrollTop() > 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop() > 0;
        $scrollElement.scrollTop(0);

        if (isScrollable) {
          return el;
        }
      }
    }
  }

  // Opacity
  function applyHoverEffect(className) {
    $(className).css({
      opacity: 0
    });

    $(className).hover(
      function () {
        $(this).stop().animate({
          opacity: 0.9
        }, 'slow');

        $(this).siblings('img').stop().animate({
          opacity: 0.7
        }, 'fast');
      },
      function () {
        $(this).stop().animate({
          opacity: 0
        }, 'fast');

        $(this).siblings('img').stop().animate({
          opacity: 1
        }, 'fast');
      }
    );
  }

  applyHoverEffect('.zoom');
  applyHoverEffect('.play');
});

/* ====================================================
   MOBILE HAMBURGER MENU (mq2)
   ==================================================== */
(function () {
    var toggle = document.getElementById('nav-toggle');
    var mobileNav = document.getElementById('mobile-nav');
    if (!toggle || !mobileNav) return;

    function openNav() {
        document.body.classList.add('nav-open');
        toggle.setAttribute('aria-expanded', 'true');
    }

    function closeNav() {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
    }

    function toggleNav() {
        if (document.body.classList.contains('nav-open')) {
            closeNav();
        } else {
            openNav();
        }
    }

    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleNav();
    });

    mobileNav.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            closeNav();
        }
    });

    document.addEventListener('click', function (e) {
        if (!document.body.classList.contains('nav-open')) return;
        if (mobileNav.contains(e.target) || toggle.contains(e.target)) return;
        closeNav();
    });

    document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeNav();
    }
});

})();
/* ====================================================
   THEME TOGGLE
   ==================================================== */
(function () {
  const buttons = document.querySelectorAll('.theme-toggle');
  if (!buttons.length) return;

  const saved = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
  } else if (saved === 'light') {
    document.body.classList.add('light-mode');
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const isDark =
        document.body.classList.contains('dark-mode') ||
        (!document.body.classList.contains('light-mode') &&
         systemDark.matches);

      if (isDark) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      }
    });
  });
})();