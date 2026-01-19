// Declare the variable outside the $(document).ready block	
var scrollPosition; 

// Function to save scroll position
function saveScrollPosition() {
    scrollPosition = $(window).scrollTop();
}

// The Modal
function openModal(imageSrc) {
    saveScrollPosition(); // Save scroll position before opening the modal
    $('body').css('overflow', 'hidden'); // Prevent scrolling on the body
    document.getElementById('imageModal').style.display = 'block';
    document.getElementById('modalImage').src = imageSrc;

    // Close the modal when clicking on the image
    document.getElementById('modalImage').onclick = function() {
        closeModal();
    };

    // Close the modal on 'Escape' key press
    document.addEventListener('keydown', closeModalOnEscape);
}

function closeModalOnEscape(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
    $('body').css('overflow', 'auto'); // Allow scrolling on the body
    document.removeEventListener('keydown', closeModalOnEscape); // Remove the event listener
    restoreScrollPosition(); // Restore scroll position after closing the modal
}

// The Modal for Iframe
function openiframeModal(iframeSrc) {
    saveScrollPosition(); // Save scroll position before opening the modal
    $('body').css('overflow', 'hidden'); // Prevent scrolling on the body
    document.getElementById('iframeModal').style.display = 'block';
    document.getElementById('modaliframe').src = iframeSrc;

    // Close the modal when clicking on the iframe
    document.getElementById('modaliframe').onclick = function() {
        closeiframeModal();
    };

    // Close the modal on 'Escape' key press
    document.addEventListener('keydown', closeiframeModalOnEscape);
}

function closeiframeModalOnEscape(event) {
    if (event.key === 'Escape') {
        closeiframeModal();
    }
}

function closeiframeModal() {
    // Stop video playback before closing the modal
    var iframe = document.getElementById('modaliframe');
    iframe.src = '';
    document.getElementById('iframeModal').style.display = 'none';
    $('body').css('overflow', 'auto'); // Allow scrolling on the body
    document.removeEventListener('keydown', closeiframeModalOnEscape); // Remove the event listener
}


$(document).ready(function() {
    
// Smooth scrolling - css-tricks.com
	function filterPath(string) {
    return string.replace(/^\//,'').replace(/(index|default).[a-zA-Z]{3,4}$/,'').replace(/\/$/,'');
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
	
// OPACITY
   function applyHoverEffect(className) {
    $(className).css({
        "opacity": 0
    });
    $(className).hover(
        function () {
            $(this).stop().animate({
                "opacity": 0.9
            }, 'slow');
            $(this).siblings('img').stop().animate({
                "opacity": 0.7
            }, 'fast');
        },
        function () {
            $(this).stop().animate({
                "opacity": 0
            }, 'fast');
            $(this).siblings('img').stop().animate({
                "opacity": 1
            }, 'fast');
        }
    );
}

    applyHoverEffect(".zoom");
    applyHoverEffect(".play");
	
// END
});