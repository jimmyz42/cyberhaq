var jackName = window.sessionStorage.getItem('jackName');

var cnt = 0;
var NUM_QUESTIONS = 4;
var questions = ['What is your email address?'];
var answers = [window.sessionStorage.getItem('jackEmail')];

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
        $('#answer').focus();
        loadQuestion();
        $('#answer').keyup(function(e) {
          $('.error').css({ display: 'none' });
          if(e.keyCode === 13) $('#next').click();
        });
        $('#next').click(function() {
          $('.error').css({ display: 'none' });

          if(checkAnswer()) {
            $('.help-text').html('To unlock your account, please answer the following security questions correctly.');
            $('.error').html('Incorrect response. Please try again.');

            cnt++;
            if(cnt < NUM_QUESTIONS) {
              loadQuestion();
            } else {
              window.location.href = "accounts.html";
              parent.postMessage({
                type: 'chat-box-message',
                message: 'Your final task: Transfer ' + jackName + '\'s money to Asterisk. Our offshore account at Galactic Bank is 12345678. Transfer the money there, and your job will be complete.',
              }, '*');
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

