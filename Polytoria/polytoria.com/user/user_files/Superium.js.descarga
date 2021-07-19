var localStorage = window.localStorage;
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}
  var lastUser = 0;

let cm_p = `<div class="row" id='poly-cmsg-{0}'>
          <div class="col-auto">
            <a href="/user/{1}" class="avatar" id='poly-cmsg-avatar-{0}'>
              <img src="{3}" alt="..." class="avatar-img rounded-circle">
            </a>
          </div>
          <div class="col">
          <i id='poly-cmsg-user-{0}'>{4}</i>
            <div class="card" style="padding: 5px 10px; text-align: right">
              {2}
            </div>
          </div>
        </div>`;

let cm_a = `<div class="row" id='poly-cmsg-{0}'>
              <div class="col">
              <i id='poly-cmsg-user-{0}'></i>
                <div class="card bg-primary text-white" style="padding: 5px 10px;">
                  {2}
                </div>
              </div>
              <div class='col-auto'>
                <a href="/user/{1}" class="avatar" id='poly-cmsg-avatar-{0}'>
                  <img src="{3}" alt="..." class="avatar-img rounded-circle">
                </a>
              </div>
            </div>`;

$("#poly-chat-toggler").click(function() {
  $("#poly-chat-toggler").toggleClass("active");
  $("#poly-chat-container").toggleClass("active");

  localStorage.setItem('chatOpened', $("#poly-chat-container").hasClass("active"));
});

function OpenChat(cid) {
  $("#chat-close-btn").html("X")
  $.getJSON("/api/fetch/chat/chats?id=" + cid, function(data) {
    localStorage.setItem('chatID', cid);
    $("#poly-chat-messages").html("");
    data.forEach((item, i) => {
      var msg = cm_p;
      if (item['sender'] == true) {
        msg = cm_a;
      }

      msg = msg.format(item['id'], item['author'], item['content'], item['user_thumbnail'], item['username']);
      $("#poly-chat-messages").append(msg);

      if (lastUser == item['author']) {
        $("#poly-cmsg-user-" + item['id']).html("")
      //  $("#poly-cmsg-avatar-" + item['id']).html("")
      }

      lastUser = item['author']
    });

    $(".poly-active-chat").removeClass("hidden");
    $(".poly-conversations").addClass("hidden");

    var scroll    = $('#poly-chat-messages');
    var height = scroll[0].scrollHeight;
    scroll.scrollTop(height);
  });
}

function SendChat() {
  let msg = $("#chat-input-bar").val();
  $("#chat-input-bar").val("");
  $.post("/api/chat/send", {id: localStorage.getItem("chatID"), msg: msg}, function (data) {
    if (!data.startsWith("OK-MSG:")) {
      $(".poly-chat").addClass("shake")
      $("#poly-chat-errmsg").html("<i class=\"fe fe-alert-circle\"></i>&nbsp; " + data);
      setTimeout(function() {
        $(".poly-chat").removeClass("shake")
        setTimeout(function() {
          $("#poly-chat-errmsg").html("&nbsp;");
        }, 500)
      }, 500);
    } else {
      let cm_a = `<div class="row" id='poly-cmsg-{0}'>
                    <div class="col">
                      <div class="card bg-primary text-white" style="padding: 5px 10px;">
                        {2}
                      </div>
                    </div>
                    <div class='col-auto'>
                      <a href="/user/{1}" class="avatar">
                        <img src="https://superium.net/assets/thumbnails/avatars/headshots/{3}.png" alt="..." class="avatar-img rounded-circle">
                      </a>
                    </div>
                  </div>`;
      cm_a = cm_a.format(0,0,data.replace("OK-MSG:", ""), poly_userdata['AvatarHash'])
      $("#poly-chat-messages").append(cm_a)
      var scroll    = $('#poly-chat-messages');
      var height = scroll[0].scrollHeight;
      scroll.scrollTop(height);
    }
  });
}

function LoadConversations() {
  $("#chat-close-btn").html("")
  let ctemp = `<div class="list-group-item">
    <div class="row align-items-center">
      <div class="col-auto">
        <a href="javascript:OpenChat({3})" class="avatar">
          <img src="{2}" alt="..." class="avatar-img rounded-circle">
        </a>
      </div>
      <div class="col ml-n2">
        <h4 class="mb-1">
          <a href="javascript:OpenChat({3})">{0}</a>
        </h4>
        <p class="card-text small text-muted" style="max-width: 125px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          {1}
        </p>
      </div>
      <div class="col-auto">
        <div class="dropdown">
          <a href="#" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fe fe-more-vertical"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a href="#" class="dropdown-item text-danger">
              Report abuse
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  $.getJSON("/api/fetch/chat/conversations", function (data) {
    if (Object.keys(data).length == 0) {
      $("#chat-no-convos").removeClass("hidden");
    } else {
      $("#chat-no-convos").addClass("hidden");
    }
    $("#conversations-list").html("");
    data.forEach((item, i) => {
      let conv = ctemp.format(item['name'], item['message'], item['icon'], item['id']);
      $("#conversations-list").append(conv);
    });
  });
}

function CloseChat() {
  $("#poly-chat-toggler").toggleClass("active");
  $("#poly-chat-container").toggleClass("active");
  localStorage.setItem('chatOpened', $("#poly-chat-container").hasClass("active"));
  localStorage.removeItem('chatID');
  LoadConversations()
  $(".poly-active-chat").addClass("hidden");
  $(".poly-conversations").removeClass("hidden");

}

function StartConversation(userid, csrf) {
  $.post("/api/chat/start_conversation", { id: userid, csrf: csrf }, function (data) {
    if (data.startsWith("s:")) {
      var res = data.replace("s:", "");
      OpenChat(res);
      $("#poly-chat-toggler").addClass("notransition");
      $("#poly-chat-container").addClass("notransition");
      $("#poly-chat-toggler").addClass("active");
      $("#poly-chat-container").addClass("active");
      $("#poly-chat-toggler")[0].offsetHeight;
      $("#poly-chat-toggler").removeClass("notransition");
      $("#poly-chat-container").removeClass("notransition");
      localStorage.setItem('chatOpened', $("#poly-chat-container").hasClass("active"));
    } else {
      alert(data);
    }
  });
}

function ChatLoop() {
  if (localStorage.getItem("chatID") != null) {
    cid = localStorage.getItem("chatID");
    $.getJSON("/api/fetch/chat/newmessages?id=" + cid, function(data) {
      localStorage.setItem('chatID', cid);
      data.forEach((item, i) => {
        var msg = cm_p;
        if (item['sender'] == true) {
          msg = cm_a;
        }
        msg = msg.format(item['id'], item['author'], item['content'], item['user_thumbnail'], item['username']);
        $("#poly-chat-messages").append(msg);
        if (lastUser == item['author']) {
          //$("#poly-cmsg-user-" + item['id']).html("")
          //$("#poly-cmsg-avatar-" + item['id']).html("")
        }

        lastUser = item['author']
        var scroll    = $('#poly-chat-messages');
        var height = scroll[0].scrollHeight;
        scroll.scrollTop(height);
      });

      $(".poly-active-chat").removeClass("hidden");
      $(".poly-conversations").addClass("hidden");
    });
  } else {
    LoadConversations();
  }
}

$(document).ready(function() {
  if (localStorage.getItem("chatID") != null) {
    OpenChat(localStorage.getItem("chatID"))
  } else {
    LoadConversations();
  }

  if (localStorage.getItem("chatOpened") == "true") {
    $("#poly-chat-toggler").addClass("notransition");
    $("#poly-chat-container").addClass("notransition");
    $("#poly-chat-toggler").addClass("active");
    $("#poly-chat-container").addClass("active");
    $("#poly-chat-toggler")[0].offsetHeight;
    $("#poly-chat-toggler").removeClass("notransition");
    $("#poly-chat-container").removeClass("notransition");
  }

  document.getElementById("chat-input-bar").addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        SendChat();
    }
  });

  var chatLoop = setInterval(ChatLoop, 2000);
})