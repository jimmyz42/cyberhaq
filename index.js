var tabAudio = new Audio("sound/newTab.wav");
tabAudio.oncanplaythrough = function ( ) { }
tabAudio.onended = function ( ) { }

if(window.sessionStorage.length === 0) location.href = "misc/instructions.html";

$( document ).ready(function() {

    var autocompleteParams = {
        source: _.map(webpage_data, 'url'),
        messages: {
            noResults: '',
            results: function() {}
        },
        minLength: 0,
        focus: function() {
            if($(this).val() === '') $(this).autocomplete('search', '');
        },
    };
    var jackName = window.sessionStorage.getItem('jackName');
    var lucyName = window.sessionStorage.getItem('lucyName');

/////// Index.html messages

    parent.postMessage({
   type: 'chat-box-message',
   message: "You're finally here! Follow my instructions and do everything I say to avoid detection. The hit I got was an intercepted message from " + window.sessionStorage.getItem("jackName") + " and one of his clients, some druggie. Go to http://breakmycipher.io to decrypt it."
,
}, '*');


    $(document).on('click', '.urlbar', function() {
      $(this).select();
    });

	$(document).on('enterKey', '.urlbar', function(e) {
      var data = _.find(webpage_data, { url: $(this).val() })
        || _.find(webpage_data, { url: 'https://' + $(this).val() }) 
        || _.find(webpage_data, { url: 'https://www.' + $(this).val() }); 
      if(data) {
        $(this).val(data.url);
        $(this).siblings('.webpage-iframe').attr('src', data.src);
        $('#instruction-text').html(data.instructions);
        var tabID = $(this).parent().attr('id');
        $('a[href="#' + tabID + '"]').html(data.title + '&nbsp;&nbsp;');
      }
	});

    $(document).on('keyup', '.urlbar', function(e) {
	  if(e.keyCode == 13)
	  {
	    $(this).trigger("enterKey");
	  }
	});

    $(document).on('click', '.refresh-btn', function() {
      $(this).siblings('.urlbar').trigger('enterKey');
    });

// TAB STUFF

    var tabNum = 1; // Each tab created gets UNIQUE tab ID
    $('.x-btn').click(function() {
      var tab = $('a[href="#tab1"]').parent();
      var index = $('li.nav-item').index(tab);
      var active = tab.hasClass('active');
      $('a[href="#tab1"]').parent().remove();
      $('#tab1').remove();
      fixTabs(active, index);
    }).css({ display: 'none' });
    $('.autocomplete').autocomplete(autocompleteParams);
    $('.urlbar').focus();

    $('#add-tab').click(function() {
      tabNum++;
      $('.x-btn').css({ display: '' });
      var item = $('<li class="nav-item"></li>').appendTo('ul.nav-tabs');
      var tab = $('<a data-toggle="tab" href="#tab' + tabNum + '">New Tab&nbsp;&nbsp;</a>').appendTo(item);
      var xbtn = $('<button type="button" class="close x-btn">&times;</button>').appendTo(item);
      xbtn.click(function() {
        var tab = $('a[href="#tab' + this.tabNum + '"]').parent();
        var index = $('li.nav-item').index(tab);
        var active = tab.hasClass('active');
        $('a[href="#tab' + this.tabNum + '"]').parent().remove();
        $('#tab' + this.tabNum).remove();
        fixTabs(active, index);
      }.bind( { tabNum : tabNum } ));

      var pane = $('<div id="tab' + tabNum + '" class="tab-pane fill"></div>').appendTo('.tab-content');
      var refresh = $('<button type="button" class="btn btn-default btn-xs refresh-btn"><span class="glyphicon glyphicon-refresh"></span></button>').appendTo(pane);
      var urlBar = $('<input type="text" class="urlbar autocomplete" placeholder="Type here to browse sites!"></input>').appendTo(pane);
      urlBar.autocomplete(autocompleteParams);
      $('<iframe class="webpage-iframe" src="misc/splash.html"></iframe>').appendTo(pane);
      tab.tab('show');
      urlBar.focus();
    });

    var fixTabs = function(active, index) {
      if($('.x-btn').length === 1) $('.x-btn').css({ display: 'none' });
      if(active) {
        if(index >= $('li.nav-item').length) {
          index = $('li.nav-item').length-1;
        }
        $('li:eq(' + index + ') a').tab('show');
      }
    };

	$("#sortable").sortable();
	// $("#sortable").disableSelection();

	$.each(todoListItems, function(index, task) {
		createTodo(task);
	});

	// $( document.body ).click(function() {
	// 	console.log("sdf")
	//   	// $( "div:hidden:first" ).show();
	//   	$( "div:hidden:first" ).removeClass("hidden").addClass("item-fade-in");
	//   	// $( "div:hidden:first" ).fadeIn( "slow" );
	// });
	addNextTask();

	// mark task as done
	$('.todolist').on('change','#sortable li input[type="checkbox"]',function(){
		console.log($( "div.hidden" ).length);
	    if($(this).prop('checked')){
	    	if ($( "div.hidden" ).length == 0) {
		    	$('.win-text').append('<h3 class="correct">Conglaturation!!! You have completed a great game. And prooved the justice of our culture. Now go and rest our heroes!</h3>');
		    }
	    	$(this).attr("disabled", "disabled");
	        var doneItem = $(this).parent().parent().find('label').text();
	        var label = $(this).parent().parent().find('label');
	        $(label).css('textDecoration','line-through');
	        addNextTask();
	    }
	});

});

function addNextTask() {
	$( "div:hidden:first" ).removeClass("hidden").addClass("item-fade-in");
}

//create task
function createTodo(text){
    var markup = '<div class="hidden"><li class="todo-item ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" />'+ text +'</label></div></li></div>';
    // var markup = '<li class="todo-item ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" />'+ text +'</label></div></li>';
    $('#sortable').append(markup);
    $('.add-todo').val('');
}

//remove done task from list
function removeItem(element){
    $(element).parent().remove();
}








