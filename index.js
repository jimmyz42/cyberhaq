$( document ).ready(function() {

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
      $('a[href="#tab1"]').parent().remove();
      $('#tab1').remove();
    });
    $('.autocomplete').autocomplete(autocompleteParams);

    $('#add-tab').click(function() {
      tabNum++;
      var item = $('<li class="nav-item"></li>').appendTo('ul.nav-tabs');
      $('<a data-toggle="tab" href="#tab' + tabNum + '">Bank&nbsp;&nbsp;</a>').appendTo(item);
      var xbtn = $('<button type="button" class="close x-btn">&times;</button>').appendTo(item);
      xbtn.click(function() {
        $('a[href="#tab' + this.tabNum + '"]').parent().remove();
        $('#tab' + this.tabNum).remove();
      }.bind( { tabNum : tabNum } ));

      var pane = $('<div id="tab' + tabNum + '" class="tab-pane fade fill"></div>').appendTo('.tab-content');
      var urlBar = $('<input type="text" class="urlbar autocomplete" value="https://www.galacticbank.com"></input>').appendTo(pane);
      urlBar.autocomplete(autocompleteParams);
      pane.append('<br><br><iframe class="webpage-iframe" src="bank/login.html"></iframe>');
    });

});
