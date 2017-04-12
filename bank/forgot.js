      var cnt = 1;
      var NUM_QUESTIONS = 3;
      $(function() {
        loadQuestion();
        $('#next').click(function() {
          $('.error').css({ display: 'none' });

          if(checkAnswer()) {
            cnt++;
            if(cnt <= NUM_QUESTIONS) {
              loadQuestion();
            } else {
              window.location.href = "index.html";
            }
          } else {
            $('.error').css({ display: 'block' });
          }

          $('#answer').val('');
          $('#answer').focus();
        });
      });

      function loadQuestion() {
        $('#question').html(bank_account['security question '+cnt]);
        if(cnt === NUM_QUESTIONS) $('#next').html('Submit');
      }
      function checkAnswer() {
        return $('#answer').val() === bank_account['security answer '+cnt];
      }

