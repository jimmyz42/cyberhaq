var cnt = 0;
var NUM_QUESTIONS = 3;
var questions = [];
var answers = [];

var fakebookData = JSON.parse(window.sessionStorage.getItem('fakebookData'));

for(difficulty in securityQuestions) {
  levelQuestions = securityQuestions[difficulty];
  question = _.sample(Object.keys(levelQuestions));
  solution = levelQuestions[question];
  if(typeof(solution) === 'function') answer = solution(fakebookData);
  else answer = fakebookData[solution];
  questions.push(question);
  answers.push(answer.toLowerCase()); // case insensitive
} 

      $(function() {
        loadQuestion();
        $('#answer').keyup(function(e) {
          $('.error').css({ display: 'none' });
          if(e.keyCode === 13) $('#next').click();
        });
        $('#next').click(function() {
          $('.error').css({ display: 'none' });

          if(checkAnswer()) {
            cnt++;
            if(cnt < NUM_QUESTIONS) {
              loadQuestion();
            } else {
              window.location.href = "accounts.html";
            }
          } else {
            $('.error').css({ display: 'block' });
          }

          $('#answer').val('');
          $('#answer').focus();
        });
      });

      function loadQuestion() {
        $('#question').html(questions[cnt]);
        if(cnt === NUM_QUESTIONS-1) $('#next').html('Submit');
      }
      function checkAnswer() {
        return $('#answer').val().toLowerCase() === answers[cnt]; // case insensitive
      }

