$(document).ready(()=>{
$('#big-header').addClass('animated zoomIn');

$('#big-header').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', smallTextAnimate());

function smallTextAnimate(){
    $('#small-header').addClass('animated fadeIn');
}
});