var fileData = {
  "Computer": {
    type: "icon",
    icon: "filesystem/images/computer-icon.png",
    child: {
      "Documents": {
        type: "dir",
        child: {
          "credits.txt": {
            type: "text",
            data: "credits.txt",
          },
        },
      },
      "Pictures": {
        type: "dir",
        child: {
          "waterfall.png": {
            type: "image",
            data: "https://static.pexels.com/photos/210186/pexels-photo-210186.jpeg",
          },
          "rent.png": {
            type: "image",
            data: "filesystem/images/rent-" + window.sessionStorage.getItem('lucyName').split(' ')[0].toLowerCase() + ".png",
          },
          "us.png": {
            type: "image",
            data: "https://static.pexels.com/photos/115034/pexels-photo-115034.jpeg",
          },
          "mountains.png": {
            type: "image",
            data: "https://static.pexels.com/photos/279315/pexels-photo-279315.jpeg",
          },
          "terrace.png": {
            type: "image",
            data: "https://static.pexels.com/photos/247599/pexels-photo-247599.jpeg",
          },
        },
      },
    },
  },
  "Settings": {
    type: "icon",
    icon: "filesystem/images/settings-icon.png",
    child: {
      "Passwords": {
        // TODO implement password manager
        type: "text", //type: "page",
        data: "You have no saved passwords.",
        icon: "filesystem/images/password-icon.png",
        //src: "filesystem/password.html",
      },
    },
  },
};

// Defaults
var fileTypeData = {
  icon: {
    icon: "filesystem/images/folder-icon.png",
    src: "filesystem/computer.html",
  },
  dir: {
    icon: "filesystem/images/folder-icon.png",
    src: "filesystem/computer.html",
  },
  image: {
    icon: "filesystem/images/image-icon.png",
    src: "filesystem/image.html",
  },
  text: {
    icon: "filesystem/images/textedit-icon.png",
    src: "filesystem/text.html",
  },
  page: {
    icon: "filesystem/images/folder-icon.png",
    src: "filesystem/computer.html",
  },
};

(function() {
  console.log('hi');
  var setDefaults = function(obj) {
    _.defaults(obj, fileTypeData[obj.type]);
    if(obj.child) Object.values(obj.child).map(setDefaults);
  };
  Object.values(fileData).map(setDefaults);
})();
