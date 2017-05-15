var jackName = window.sessionStorage.getItem('jackName').split(' ')[0];
var bankAccounts = JSON.parse(window.sessionStorage.getItem('bankAccounts'));

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
                type: 'chat-box-prompt',
                'initial prompt': 'What\'s ' + jackName + '\'s 8-digit checking account number? If they change their password and security questions, but still use the same account in the future, we can milk out some more money by using this number to forge checks in their name.',
                'correct input': bankAccounts.checking.account + '',
                'correct message': 'You can transfer ' + jackName + '\'s money to your own account now. Your checking account number is that 8-digit number you find on the bottom of your checks.',
                'incorrect message': 'Hmm, that doesn\'t seem to be the right number.',
              }, '*');

              parent.postMessage({
                type: 'chat-box-message',
                message: 'If you don\'t remember your own checking account number, you can transfer it to Asterisk for safekeeping until you find your account number. Our offshore Galactic Bank account is ' + bankAccounts.asterisk.account,
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

