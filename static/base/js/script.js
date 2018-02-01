$(document).ready(function() {
    function setElementDimensions() {
        let window_height = $(window).height();
        let window_width = $(window).width();

        // set dimensions of key elements at the top of page
        $('#particles-js').css('min-height', window_height);
        $('#header').css('min-height', window_height * 1.1);
        $('#navbar').attr('data-sps-offset', window_height);
        $('#footer').css('min-height', window_height * 0.8);

        // center elements
        setElementsCenter('particles-overlay');
        setElementsCenter('citations', 'footer');

        setElementHeight();
    }

    function setElementHeight() {
        // set project card height to a ratio of the width
        let el_width = $('.project-view:first-child').width();
        // let ratio = 9.0 / 16.0;
        let ratio = 9.0 / 15.0;
        $('.project-view').css({'height': el_width * ratio});
        $('.project-img').css({'max-width': el_width});
        $('.flipper .front').css({'height': el_width * ratio});
        $('.flipper .front').css({ 'width': el_width });
        $('.flipper .back').css({ 'height': el_width * ratio });
        $('.flipper .back').css({'width': el_width});
    }

    function setElementsCenter(strElementId, strDivId='none') {
        // this function centers elements to the window
        // or a designated parent div
        let container_height;
        let container_width;
        if (strDivId== 'none') {
            container_height = $(window).height();
            container_width = $(window).width();
        }
        else {
            container_height = $('#' + strDivId).height();
            container_width = $('#' + strDivId).width();
        }
        let el_height = $('#' + strElementId).height();
        let el_width = $('#' + strElementId).width();

        let half_height = (container_height - el_height) / 2;
        let half_width = (container_width - el_width) / 2;
        $('#' + strElementId).css('top', half_height);
        $('#' + strElementId).css('left', half_width);
    }

    function setElementsCenterToDiv(strElementId, strDivId) {
        // this function centers elements to a designated parent div
        let div_height = $('#' + strDivId).height();
        let div_width = $('#' + strDivId).width();
        let el_height = $('#' + strElementId).height();
        let el_width = $('#' + strElementId).width();

        let half_height = (div_height - el_height) / 2;
        let half_width = (div_width - el_width) / 2;
        $('#' + strElementId).css('top', half_height);
        $('#' + strElementId).css('left', half_width);
    }

    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load('particles-js', '/static/base/js/particles-js/particlesjs-config.json', function () {
        // modify size and position of key elements to the window dimensions
        setElementDimensions();
    });


    // on window resize, adjust element dimensions
    $(window).resize(function() {
        setElementDimensions();
        setElementHeight();
    });


    // hover over main link causes animation
    // font size changes while remaining centered in div
    $('#particles_link').hover(function () {
        // hover handlerIn
        let aDuration = 1000; // 1 second
        $('#particles_link  h1').animate({
            "font-size": "5.25rem"
        }, aDuration);
        $('#particles_link  h2').animate({
            "font-size": "4.75rem"
        }, {
            duration: aDuration,
            step: function(now, fx) {
                setElementsCenter('particles-overlay');
            }
        });
    }, function(event) {
        // hover handlerOut
        let aDuration = 1000; // 1 second
        $('#particles_link  h1').animate({
            "font-size": "5.5rem"
        }, aDuration);
        $('#particles_link  h2').animate({
            "font-size": "4.5rem"
        }, {
            duration: aDuration,
            step: function(now, fx) {
                setElementsCenter('particles-overlay');
            }
        });
    });
    

    // Add smooth scrolling to all links
    $("a").on('click', function (event) {
        // Make sure this.hash (href) has a value before overriding default behavior
        if (
            this.hash == "#about" || 
            this.hash == "#projects" ||
            this.hash == "#skills" ||
            this.hash == "#resume" || 
            this.hash == "#contact"
        ) {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of 
            // milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {
                // Add hash (#) to URL when done scrolling 
                // (default click behavior)
                window.location.hash = hash;
            });
        }
    });


    // *** START Project Modal SECTION ***
    // AJAX -- Fetch() GET Handler
    function fetch_get_handler(
        get_url,        // get route string
        res_container,  // container for HTML response as jQuery selected object
        context,        // additional data used in callback (optional)
        callback,       // optional callback to complete upon receiving response
    ) {
        fetch(get_url, {
            credentials: 'include'
        })
        .then(response => response.text())
        .then(response => {
            if (res_container && res_container != "") { 
                res_container.html(response);
            }
        })
        .then(response => {
            if (callback && typeof (callback) === 'function') { callback(context); }
        })
    }

    // Filter By Language and Replace Projects //
    $(document).on('click', '.project-filter', function (event) {
        event.preventDefault();
        language = $(this).attr('href');
        language = language.replace('#', '');
        language_class = '.project-' + language;
        aDuration = 750;
        if (language == "All") {

            $('.project-view:hidden').fadeIn(aDuration, "linear");
        }
        else {
            $('.project-view:visible').fadeOut(
                aDuration,
                "linear",
                function(event) {
                    $(language_class + ':hidden').fadeIn(aDuration, "linear")
                }
            );
        }
    });

    // Get Project Information and Display Modal //
    $(document).on('click', '.project-more', function(event) {
        event.preventDefault();
        get_url = $(this).attr('href');
        callback = function () {
            $('#modal').modal('show');
            $('#pImgCarousel').carousel('cycle');
        }
        fetch_get_handler(
            get_url = get_url,
            res_container = $('#modal-container'),
            context = "",
            callback = callback
        );
    });

    // remove tempoarary modals after hidden
    $('body').on('hidden.bs.modal', '#modal', function () {
        $('#modal').remove();
    });
    // *** END Project Modal SECTION *** 

    
    // *** START reCaptcha Section ***
    // reCaptcha functions to view email and send message
    var recaptcha_el = document.getElementById("email_link");
    var onCaptchaSuccess = function (data_captcha) {
        var url = "/email"
        var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
        // ajax to get email html partial on captcha success
        // html partial is appended to body and shown in modal
        fetch(url, {
            method: "POST",
            body: data_captcha,
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            })
        })
            .then(response => response.text())
            .then(response => {
                $(document.body).append(response);
                $('#email_modal').modal('show');
            })
            .catch(function (error) {
                console.log(error.json());
            })
        // hide reCaptcha as it is no longer needed
        $('#recaptcha').css("display", "none");
    };

    recaptcha_el.onclick = function() {
        // determine whether the server provided the email modal
        var el_modal = document.getElementById('email_modal');
        if (el_modal == null) {
            // reCaptcha has not yet verified user is human
            var onclickCallback = function () {
                grecaptcha.render('recaptcha', {
                    'sitekey': '6LdegUAUAAAAADtMoHYI94jdEFOmshLNtVVFOemH',
                    'size': 'normal',
                    'theme': 'dark',
                    'callback': onCaptchaSuccess,
                });
            };
            onclickCallback();
        }
        else {
            // reCaptcha verification complete; show modal
            $("#email_modal").modal('show');
        }
        return false;
    }
    // *** END reCaptcha Section ***


    // *** START Send Message Modal Section ***
    // when user sends message through application
    // AJAX routine
    // - call the send message view function
    // - wait for the response 
    // - if successful, append and show modal partial
    // - if not successful, show errors
    $(document).on('click', '#send_email', function() {
        // hide email modal immediately for user experience
        $('#email_modal').modal('hide');
        // wait for modal to finish hiding before proceeding
        $('#email_modal').on('hidden.bs.modal', function() { 
            $(this).prop('disabled', true);
            // turn off event handler for email_modal
            $('#email_modal').off('hidden.bs.modal')

            var post_url = "/email/send_msg";
            // create an object of the form data
            var form_data_serialize = $('#email_form').serializeArray();
            var form_data_object = {};
            for (let i = 0; i < form_data_serialize.length; i++) {
                form_data_object[form_data_serialize[i]['name']] = form_data_serialize[i]['value'];
            }
            // compose the object as a JSON string ready to send via httprequest
            form_data_stringify = JSON.stringify(form_data_object);

            var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

            // ajax fetch to get response from email send function
            fetch(post_url, {
                method: "POST",
                body: form_data_stringify,
                credentials: 'include',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                })
            })
            .then(response => {
                // evaluate custom header to determine whether method succeeded
                let email_sent = response.headers.get('Response-Email-Sent');
                // use the response as an html partial (text)
                response.text().then(html_response => {
                    // hide the email modal before showing next modal
                    if (email_sent == "True") {
                        // success method; append new modal
                        $(document.body).append(html_response);
                        // clear the email form and re-enable submit
                        $('#cancel_email').click();
                        $(this).prop('disabled', false);
                        // show the message sent modal
                        $('#email_sent').modal('show');
                    }
                    else {
                        // error method; display errors on existing modal
                        $('#email_form').replaceWith(html_response);
                        $('#email_modal').modal('show');
                        $(this).prop('disabled', false);
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        });
    });

    // button to cancel the message -- clear all input
    $(document).on('click', '#cancel_email', function () {
        $('#eform_sender_name').val("");
        $('#eform_sender_email').val("");
        $('#eform_subject').val("");
        $('#eform_message_text').val("");
        $('.email_error').remove();
    });

    // remove email_sent modal after hidden
    $('body').on('hidden.bs.modal', '#email_sent', function () {
        $('#email_sent').remove();
    });
    // *** END Send Message Modal Section ***

    // *** START PDF.js Section ***
    // PDF.js functions to view PDF documents in canvas tag
    var url = "/static/base/img/JoshuaDaniel_resume.pdf";

    // Disable workers to avoid yet another cross-origin issue (workers need
    // the URL of the script to be loaded, and dynamically loading a cross-origin
    // script does not work).
    // PDFJS.disableWorker = true;

    // The workerSrc property shall be specified.
    PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

    var pdfDoc = null,
        pageNum = 1,
        pageRendering = false,
        pageNumPending = null,
        scale = 1.5,
        canvas = document.getElementById('pdf_canvas'),
        ctx = canvas.getContext('2d');

    /**
     * Get page info from document, resize canvas accordingly, and render page.
     * @param num Page number.
     */
    function renderPage(num) {
        pageRendering = true;
        // Using promise to fetch the page
        pdfDoc.getPage(num).then(function (page) {
            var viewport = page.getViewport(scale);
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            var renderTask = page.render(renderContext);

            // Wait for rendering to finish
            renderTask.promise.then(function () {
                pageRendering = false;
                if (pageNumPending !== null) {
                    // New page rendering is pending
                    renderPage(pageNumPending);
                    pageNumPending = null;
                }
            });
        });

        // Update page counters
        document.getElementById('page_num').textContent = num;
    }

    /**
     * If another page rendering in progress, waits until the rendering is
     * finised. Otherwise, executes rendering immediately.
     */
    function queueRenderPage(num) {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    }

    /**
     * Displays previous page.
     */
    function onPrevPage() {
        if (pageNum <= 1) {
            return;
        }
        pageNum--;
        queueRenderPage(pageNum);
    }
    $('#btn_previous_top').add('#btn_previous_btm').on('click', onPrevPage);

    /**
     * Displays next page.
     */
    function onNextPage() {
        if (pageNum >= pdfDoc.numPages) {
            return;
        }
        pageNum++;
        queueRenderPage(pageNum);
    }
    $('#btn_next_top').add('#btn_next_btm').on('click', onNextPage);
    // document.getElementById('btn-next_top').addEventListener('click', onNextPage);
    // document.getElementById('btn-next_btm').addEventListener('click', onNextPage);

    /**
     * Asynchronously downloads PDF.
     */
    PDFJS.getDocument(url).then(function (pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById('page_count').textContent = pdfDoc.numPages;

        // Initial/first page rendering
        renderPage(pageNum);
    });
})

