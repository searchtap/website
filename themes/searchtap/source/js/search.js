$(function () {
    $("#searchForm").submit(function (event) {
        event.preventDefault();
        sessionStorage.setItem("search-keyword", $('#searchTerm').val());

        if($('#searchTerm').val().trim() !== ""){
            window.location.href = "/faqs-detail.html";
        }

    })
});



$(document).ready(function () {
    var keyword = sessionStorage.getItem("search-keyword");
    if (keyword !== undefined && keyword !== null) {
        $('#searchTerm').val(keyword);
    }
});

jQuery(function () {
    var source = jQuery('#element-template').html();
    var template = Handlebars.compile(source);
    jQuery('#searchTerm').keyup(function () {
        if ($(this).val().trim() !== "") {
            var token = 'b8da1fb5f0d13bfb31f9ffdd4600d99c45ee2f577b09503fc3c870bf30448a0cd3521d17450a51add121e2913000f4bfce106d9646bffe6749a5b0850ee29c2f74827aae08c523a6fd893a2d633f6e13dd61c584cf85c56b690c29ddeb8cd7a6277df94cf8e7995e8a955b96facb2fa71577a0dfbe8782ffed97c03a3f7e0cbd';
            var data = {
                query: jQuery(this).val(),
                fields: ['id', 'title', 'body','category'],
                highlightFields : ['body'],
                searchFields: ['title', 'body'],
                offset: 0,
                pageSize: 10
            };
            jQuery.ajax({
                url: 'https://api.searchtap.io/api/v1/collections/searchtap-faqs/query',
                contentType: 'application/json',
                headers: {
                    'X-Auth-Token': token
                },
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(data),
                error: function (err) {
                    console.log(err)
                },
                success: function (data) {
                    if (data.totalHits === 0) {
                        $('#noResults').show();
                    } else {
                        $('#noResults').hide();
                        if(sessionStorage.getItem("search-keyword")!== undefined && $('#searchTerm').val() !== sessionStorage.getItem("search-keyword")){
                            $('#searchData').show();
                            sessionStorage.removeItem("search-keyword");
                        }
                    }
                    var result = template(data);
                    $.each($('.search-result'), function () {
                        $(this).remove();
                    });

                    $("#searchData").prepend(result);
                    // $('#searchData').html(result);
                }
            });
        } else {$('#searchData').hide();}
    });
    jQuery('#searchTerm').trigger('keyup');
});
jQuery(document).mouseup(function (e) {
    var container = jQuery("#searchData");
    if (!jQuery('#searchTerm').is(e.target)) {
        jQuery('#searchData').hide();
    }

    if (jQuery('#searchTerm').is(e.target) && jQuery('#searchTerm').val().trim() !== "") {
        jQuery('#searchData').show();
    }
});

$(document).ready(function () {
    if (sessionStorage.getItem("search-keyword") !== undefined) {
        var source = $('#page-template').html();
        var template = Handlebars.compile(source);
        var token = 'b8da1fb5f0d13bfb31f9ffdd4600d99c45ee2f577b09503fc3c870bf30448a0cd3521d17450a51add121e2913000f4bfce106d9646bffe6749a5b0850ee29c2f74827aae08c523a6fd893a2d633f6e13dd61c584cf85c56b690c29ddeb8cd7a6277df94cf8e7995e8a955b96facb2fa71577a0dfbe8782ffed97c03a3f7e0cbd';
        var data = {
            query: sessionStorage.getItem("search-keyword"),
            fields: ['id', 'title', 'body','category'],
            // highlightFields : ['body'],
            searchFields: ['title', 'body'],
            offset: 0,
            pageSize: 10
        };
        jQuery.ajax({
            url: 'https://api.searchtap.io/api/v1/collections/searchtap-faqs/query',
            contentType: 'application/json',
            headers: {
                'X-Auth-Token': token
            },
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify(data),
            error: function (err) {
                console.log(err)
            },
            success: function (data) {
                if (data.totalHits === 0) {
                    $("#faq-detail-keyword").html('No results found! <div class="clearfix"></div> <small style="font-size:13px !important;" id="" class="center-block mt10 mb10">Sorry, we couldn\'t find any results for that query. Please try using a different keyword or <a href="contact.html" class="text-green">send us your query.</a></small>')
                } else{
                    $("#faq-detail-keyword").html('Showing results for "' + $('#searchTerm').val() + '"');

                }
                var result = template(data);
                // jQuery.each(jQuery('.tile-row'), function () {
                //     jQuery(this).remove();
                // });
                //
                // jQuery("#data").prepend(result);
                $('#page-results').html(result);
            }
        });

    }
});
