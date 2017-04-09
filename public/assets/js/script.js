$(document).ready(()=>{
$('#big-header').addClass('animated zoomIn');

$('#big-header').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', smallTextAnimate());

function smallTextAnimate(){
    $('#header-body').addClass('animated fadeIn');
}

function grabArticles(){
    $.get('/articles', (data)=>{
        var pitchforkSection = $('#pitchfork-items-body');
        var cosSection = $('#cos-items-body');
        var stereogumSection = $('#stereogum-items-body');

        pitchforkSection.empty();
        cosSection.empty();
        stereogumSection.empty();
        console.log(data)
        for(let i = 0; i < data.length;i++){
            if(data[i].website === "pitchfork"){
                pitchforkSection.append("<p><a href='"+ data[i].link +"' target='_blank'>"+data[i].title+"</a></p>");
            } else if(data[i].website === "cos") {
                cosSection.append("<p><a href='"+ data[i].link +"' target='_blank'>"+data[i].title+"</a></p>");
            } else if(data[i].website === "stereogum") {
                stereogumSection.append("<p><a href='"+ data[i].link +"' target='_blank'>"+data[i].title+"</a></p>");
            }
        }
    })
}


function submitQuery(){
    $(document).on("submit", "#search-form", (e)=>{
    // e.preventDefault();
    var searchQuery = {
        term: $("#search-query").val()
    }
    // console.log(searchQuery);
    $.post("scrape", searchQuery).done((data)=>{
        console.log(data);
        grabArticles();
    })
    
});
}


$("#refresh-nav").on("click", (e)=>{
    e.preventDefault();
    grabArticles();
})


// closes search modal when search modal is active with "uk-open"
$(document).keypress((e)=>{
    var modal = $("#modal-full");
    var open = modal.hasClass("uk-open");

    if(open){
        if(e.which == 13){
            modal.removeClass("uk-open");
            submitQuery();
        }
        grabArticles();
    }
})

});