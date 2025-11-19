
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("a.brand, a.navbar-brand").forEach(function (el) {
        el.removeAttribute("href");
        el.style.cursor = "default";
        el.addEventListener("click", function (e) { e.preventDefault(); });
    });
    document.querySelectorAll('a[href="/"]').forEach(function (el) {
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

      		    const coId = $(this).attr('data-co-id');
      		    const offerId = $(this).attr('data-offer-id');
      		    const offerLocation = $(this).attr('data-location');
      		    const offerPosition = $(this).attr('data-position');
      		    const vendorName = $(this).attr('data-vendor');
      		    const cvid = $(this).attr('data-cvid');

      		    //build query string
      		    var qs = {
      		      url: window.location.href,
      		      chartOfferId: coId,
      		      offerId:offerId,
      		      offerLocation:offerLocation,
      		      offerPosition:offerPosition,
      		      cvid:cvid
      		    }

      		    const target_url = '/click?' + $.param(qs);

      		    if ($(this).prop("tagName") === 'A') {
      		      $(this).attr('href',target_url)
      		    }

              $(this).click((e) => {
                e.preventDefault();
                if(e.target.nodeName != 'BUTTON' && e.target.parentNode.nodeName != 'BUTTON') {
                  e.stopPropagation();
                  window.open(target_url,"_blank");
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
