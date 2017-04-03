$(document).ready(()=>{
$('#big-header').addClass('animated zoomIn');

$('#big-header').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', smallTextAnimate());

function smallTextAnimate(){
    $('#small-header').addClass('animated fadeIn');
}



$(document).on("submit", "#search-form", (e)=>{
    e.preventDefault();
    var searchQuery = {
        term: $("#search-query").val()
    }
    // console.log(searchQuery);


    $.post("scrape", searchQuery).done((data)=>{
        console.log(data);
    })
});


});