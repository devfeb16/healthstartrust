
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("a.brand, a.navbar-brand").forEach(function (el) {
        el.removeAttribute("href");
        el.style.cursor = "default";
        el.addEventListener("click", function (e) { e.preventDefault(); });
    });
    document.querySelectorAll('a[href="./"]').forEach(function (el) {
        el.removeAttribute("href");
        el.style.cursor = "default";
        el.addEventListener("click", function (e) { e.preventDefault(); });
    });
});



        function updateLocation(state) {
            let url = new URL(window.location);
            url.searchParams.set("mst",state);
            window.location = url.href;
        }
    


            $(document).ready(function() {
        $('#hwr-link').popover({
    			html : true,
    			content: function() {
    				return $('#hwr-content').html();
    			}
    		});

        $('.filter-link').each(function(){
            // Filter link handler
        })

    	  $('.btn-offer-call').each(function() {
    	     var vendorName = $(this).attr('data-vendor');
    	     $(this).click((e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open($(this).attr('href'),"_self");
    	     });
    	  });


    		$('[data-co-id],[data-offer-id]').each(function () {

    		    if (!$(this).hasClass('btn-offer-call')) {

      		    // For static hosting, skip the click tracking and use existing href attributes
      		    // The elements already have direct links to external sites
      		    if ($(this).prop("tagName") === 'A' && $(this).attr('href') && !$(this).attr('href').startsWith('/click')) {
      		      // Keep existing href - no changes needed for static deployment
      		    }

              $(this).click((e) => {
                // Allow default click behavior for static hosting
                // Remove preventDefault to let direct links work
                if(e.target.nodeName != 'BUTTON' && e.target.parentNode.nodeName != 'BUTTON') {
                  // Let the default link behavior work
                }
              })
    		    }
        });

        $('[data-toggle="popover"]').popover()
    });


          $(window).scroll(
            function () {
              if ($(this).scrollTop() > 50) {
                if ($('.number-tooltip').css('display') !== 'none') {
                  $('.number-tooltip').tooltip('show')
                }
                // $('.tooltip-main').addClass('show');
              }
            }
          );
        


            document.addEventListener('DOMContentLoaded', function () {
                const isExpandableShow = document.body.classList.contains('expandableShow');

                document.querySelectorAll('.top-choices .accordianHeader').forEach(button => {
                    // If expandableShow is active, start with expanded state
                    if (isExpandableShow) {
                        button.classList.remove('collapsed'); // Ensure it's expanded
                    } else {
                        button.classList.add('collapsed'); // Default collapsed for non-expandableShow templates
                    }

                    button.addEventListener('click', function () {
                        this.classList.toggle('collapsed'); // Toggle on click
                    });
                });
            });
        


// Initialize Bootstrap modals
$(document).ready(function() {
    // Ensure Bootstrap modals work properly
    $('[data-toggle="modal"]').on('click', function(e) {
        var target = $(this).data('target');
        if (target) {
            $(target).modal('show');
            e.preventDefault();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const stickyModule = document.querySelector('.sticky-module');
    let lastScrollY = window.scrollY;
    function handleScroll() {
        const scrollY = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollY / docHeight) * 100;
        if (scrollPercent >= 5) {
            stickyModule.classList.add('visible');
        } else {
            stickyModule.classList.remove('visible');
        }
        lastScrollY = scrollY;
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
});

// Add hover effects for process steps
document.addEventListener('DOMContentLoaded', function() {
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        });
    });
});
