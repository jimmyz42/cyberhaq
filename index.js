$( document ).ready(function() {

	if (typeof(window.sessionStorage) !== "undefined") {
		var selectedPuzzleData = puzzleData[Math.floor(Math.random() * (puzzleData.length))];
		window.sessionStorage.setItem("puzzleData", JSON.stringify(selectedPuzzleData));
		console.log("Stored Data")
	} else {
	    console.log("Fuck.")
	}

    var autocompleteParams = {
        source: _.map(webpage_data, 'url'),
        messages: {
            noResults: '',
            results: function() {}
        }
    };

	$(document).on('enterKey', '.urlbar', function(e) {
      var data = _.find(webpage_data, { url: $(this).val() });
      if(data) {
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
      var urlBar = $('<input type="text" class="urlbar autocomplete" placeholder="Type here to browse sites!"></input>').appendTo(pane);
      urlBar.autocomplete(autocompleteParams);
      $('<iframe class="webpage-iframe" src="misc/splash.html"></iframe>').appendTo(pane);
      tab.tab('show');
      urlbar.focus();
    });

    var fixTabs = function(active, index) {
      console.log(index);
      console.log(active);
      if($('.x-btn').length === 1) $('.x-btn').css({ display: 'none' });
      if(active) {
        if(index >= $('li.nav-item').length) {
          index = $('li.nav-item').length-1;
        }
        $('li:eq(' + index + ') a').tab('show');
      }
    };
});
