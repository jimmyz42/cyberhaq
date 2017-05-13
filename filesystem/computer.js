var topDir = window.sessionStorage.getItem('fileProps');
var fileHistory = [{name: topDir, data: fileData[topDir]}];
var historyIndex = 0;

$(function() {
  $('#nav-back').click(function() {
    historyIndex--;
    updateNavButtons();
  });
  $('#nav-forward').click(function() {
    historyIndex++;
    updateNavButtons();
  });
  updateNavButtons();

  function createFiles(files) {
    $('.content').empty();
    for(var filename in files) {
      var file = files[filename];
      var icon = $('<div class="icon"></div>').appendTo('.content');
      icon.append('<img class="icon-image" src="../' + file.icon + '"></img>');
      icon.append('<span class="icon-text">' + filename + '</span>');
    
      if(file.type === 'dir') {
        icon.dblclick(function() {
          fileHistory = fileHistory.slice(0, historyIndex+1);
          fileHistory.push({ name: this.filename, data: this.file });
          historyIndex++;
          updateNavButtons();
        }.bind({ file: file, filename: filename }));
      } else {
        icon.dblclick(function() {
          window.sessionStorage.setItem('fileProps', this.file.data);
          parent.postMessage({
            type: 'open-new-window',
            src: this.file.src,
            site: this.filename,
          }, '*');
        }.bind({ file: file, filename: filename }));
      }
    }
  }

  function updateNavButtons() {
    createFiles(fileHistory[historyIndex].data.child);
    $('#nav-back').attr('disabled', historyIndex === 0);
    $('#nav-forward').attr('disabled', historyIndex === fileHistory.length-1);
    $('.breadbar').empty();
    for(var i=0; i<=historyIndex; i++) {
      if(i !== 0) $('.breadbar').append('<span class="glyphicon glyphicon-play"></span>');
      var historyItem = $('<button type="button" class="btn btn-xs btn-info nav-btn">' + fileHistory[i].name + '</button>').appendTo('.breadbar');
      historyItem.click(function() {
        historyIndex = this.index;
        updateNavButtons();
      }.bind({index : i}));
    }
  }    
});
