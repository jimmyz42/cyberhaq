securityQuestions = {
  "easy": {
    "What is your birthday?": "birthday",
    "What is your phone number?": "phone number",
    "What high school did you attend?": "high school",
    "What is the name of your first school?": "elementary school",
  },
  "medium": {
    "Who was your first boyfriend/girlfriend?": function(data) {
      return data["relationships"][0];
    },
    "What was your favorite place to visit as a child?": "child vacation",
    "Who is your favorite actor, musician, or artist?": function(data) {
      return _.sample(data["favorite actors"].concat(data["favorite musicians"]).concat(data["favorite artists"]));
    },
    "What city were you born in?": "birthplace", 
    "What is your favorite movie?": "favorite movie",
    "What is your mother's maiden name?": "mother maiden name",
    "What is your father's middle name?": "father middle name",
  },
  "hard": {
    "What is the name of your favorite pet?": "favorite pet",
    "What is your favorite season?": "favorite season",
    "What is your favorite color?": "favorite color",
    "What is your favorite animal?": "favorite animal",
    "What is your favorite food?": "favorite food",
  },
};
















