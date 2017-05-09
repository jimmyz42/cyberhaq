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
                type: 'chat-box-message',
                message: 'Hurry, transfer ' + jackName + '\'s money to Asterisk. Our offshore Galactic Bank account is ' + bankAccounts.asterisk.account,
              }, '*');

              parent.postMessage({
                type: 'chat-box-prompt',
                'initial prompt': 'Also, please type ' + jackName + '\'s 8-digit checking account number here. If they change the password and security questions, but still use the same account in the future, we can use this number to forge checks in their name.',
                'correct input': bankAccounts.checking.account + '',
                'correct message': 'Great, don\'t forget to transfer their money to us. We heard rumors that they have at least $40M in their bank account. After this is done, we will pay you at your Galactic bank account, ' + bankAccounts.user.account + '. WARNING: DO NOT TRANSFER ' + jackName.toUpperCase() + '\'S MONEY TO YOUR OWN ACCOUNT OR WE WILL COME AFTER YOU.',
                'incorrect message': 'Hmm, that doesn\'t seem to be the right number.'
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

