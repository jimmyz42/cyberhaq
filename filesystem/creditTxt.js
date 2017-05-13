  var imageUrls = imageSources;
  for(var i=0; i<fakebookData.length; i++) {
    imageUrls.push(...fakebookData[i].friends.map(s => s.image));
    imageUrls.push(...fakebookData[i].posts.map(s => s.image));
    imageUrls.push(fakebookData[i]['profile image']);
    imageUrls.push(fakebookData[i]['banner image']);
  }

  var creditsTxtHtml = 'I am eternally grateful towards CyberHaq (Jimmy Zeng, Elise Xue, Kairat Ashim, Raul Boquinr, Nick Nguyen, and Emily Ramirez) for sharing my story with the world. They have asked that I also recognize the contributions of the libraries Bootstrap, JQuery, JQuery UI, Lodash, and Moment.js, as well as the following websites:<br><br>' + imageUrls.join('<br>');
