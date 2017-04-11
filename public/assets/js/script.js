$(document).ready(() => {
grabArticles();


$('body').on("click", ".open-note", function(){
    var thisId = $(this).attr('data-id');
    
    if(thisId) {
        $("#save-note").attr('data-id', thisId);
        $.get(`/articles/${thisId}`).done(function(data){
            console.log(data);

            if(data.note){
                console.log(data.note.body)
                $("#note-body-input").append(data.note.body)
            } else {
                console.log("no note")
            }
        })
    }
});


$('body').on("click", "#save-note", function(){
    var thisId = $(this).attr('data-id');
        var text = {
            body: $("#note-body-input").val()
        }
    $.post(`/articles/${thisId}`, text).done(function(data){
        console.log(data);
        
    })

})


///////////////////////////////////////////////////
//////  Animation  ///////
///////////////////////////////////////////////////
  $("#big-header").addClass("animated zoomIn");

  $("#big-header").one(
    "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
    smallTextAnimate()
  );

  function smallTextAnimate() {
    $("#header-body").addClass("animated fadeIn");
  }

///////////////////////////////////////////////////
////// End Animation  ///////
///////////////////////////////////////////////////

  $("#refresh-nav").on("click", e => {
    grabArticles();
  });

  // closes search modal when search modal is active with "uk-open"
  $(document).keypress(e => {
    var modal = $("#modal-full");
    var open = modal.hasClass("uk-open");

    if (open) {
      if (e.which == 13) {
        modal.removeClass("uk-open");
        submitQuery();
      }
      grabArticles();
    }
  });


///////////////////////////////////////////////////
//////  Add Articles To Page  ///////
///////////////////////////////////////////////////
  function grabArticles() {
    $.get("/articles", data => {
      var pitchforkSection = $("#pitchfork-items-body");
      var cosSection = $("#cos-items-body");
      var stereogumSection = $("#stereogum-items-body");

      pitchforkSection.empty();
      cosSection.empty();
      stereogumSection.empty();
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        var cardElement = $(
          "<div class='uk-card uk-card-secondary uk-card-body article-cards' data-id='" +
            data[i]._id +
            "'><a href='" +
            data[i].link +
            "' target='_blank'><h4 class='uk-card-title uk-text-small'>" +
            data[i].title +
            "</h4></a></div>"
        );

        var noteBtn = $(
          '<a class="uk-button uk-button-default open-note" href="#modal-overflow" data-id="' +
            data[i]._id +
            '"uk-toggle>Open</a>'
        );

        if (data[i].website === "pitchfork") {
          cardElement.append(noteBtn);
          pitchforkSection.append(cardElement);
        } else if (data[i].website === "cos") {
          cardElement.append(noteBtn);
          cosSection.append(cardElement);
        } else if (data[i].website === "stereogum") {
          cardElement.append(noteBtn);
          stereogumSection.append(cardElement);
        }
      }
    });
  }

///////////////////////////////////////////////////
////// END Add Articles To Page  ///////
///////////////////////////////////////////////////

function submitQuery() {
  $(document).on("submit", "#search-form", e => {
    // e.preventDefault();
    var searchQuery = {
      term: $("#search-query").val()
    };
    // console.log(searchQuery);
    $.post("scrape", searchQuery).done(data => {
      // console.log(data);
      grabArticles();
    });
  });
}

});

