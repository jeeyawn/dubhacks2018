window.onload = function() {
    var quizContainer = document.getElementById('quiz');
    var resultsContainer = document.getElementById('results');
    var submitButton = document.getElementById('submit');
    
    var myQuestions = [
        {
            question: "Someone who has experienced a sexual assault can be referred to as a:",
            answers: {
                a: 'Victim',
                b: 'Survivor',
                c: 'Either victim or survivor'
            },
            correctAnswer: 'c'
        },

        {
            question: "As an advocate supporting a survivor of sexual assault, your role is:",
            answers: {
                a: 'Talking with law enforcement and/or medical staff about the crime.',
                b: 'Matching the details to one of the legal definitions of sexual assault.',
                c: 'Listening to the survivor\'s story and experience.',
                d: 'All of the above.'
            },
            correctAnswer: 'c'
        }
    ];
    
    function generateQuiz(questions, quizContainer, resultsContainer, submitButton){
    
        function showQuestions(questions, quizContainer){
            // we'll need a place to store the output and the answer choices
            var output = [];
            var answers;
    
            // for each question...
            for(var i=0; i<questions.length; i++){
                
                // first reset the list of answers
                answers = [];
    
                // for each available answer to this question...
                for(letter in questions[i].answers){
    
                    // ...add an html radio button
                    answers.push(
                        '<label>'
                            + letter + ': '
                            + questions[i].answers[letter]
                            + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + '</label>'
                    );
                }
    
    
                // add this question and its answers to the output
                output.push(
                    '<div class="question">' + questions[i].question + '</div>'
                    + '<div class="answers">' + answers.join('') + '</div>'
                );
            }
    
            // finally combine our output list into one string of html and put it on the page
            quizContainer.innerHTML = output.join('');
        }
    
        function showResults(questions, quizContainer, resultsContainer){
            // gather answer containers from our quiz
            var answerContainers = quizContainer.querySelectorAll('.answers');
            
            // keep track of user's answers
            var userAnswer = '';
            var numCorrect = 0;
        
            // for each question...
            for(var i=0; i<questions.length; i++){
    
                // find selected answer
                userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
                
                // if answer is correct
                if (userAnswer===questions[i].correctAnswer){
                    // add to the number of correct answers
                    numCorrect++;
                    
                    // color the answers green
                    answerContainers[i].style.color = 'lightgreen';
                }
                // if answer is wrong or blank
                else {
                    // color the answers red
                    answerContainers[i].style.color = 'red';
                }
            }
    
            // show number of correct answers out of total
            resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
        }
    
        // show the questions
        showQuestions(questions, quizContainer);
    
        // when user clicks submit, show results
        submitButton.onclick = function(){
            showResults(questions, quizContainer, resultsContainer);
        }
    }
    generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
          
}
