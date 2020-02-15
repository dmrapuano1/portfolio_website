/* 
Final Project: Create a grade book program without removing or modifying the HTML or CSS provided.
Requirements: 
    Done- You must be able to add an assignment that will be displayed in the container grid.
    Done- You must be able to remove an assignment that has already been displayed in the container grid.
    Done- The form should not submit unless all fields have been entered.
Extra Credit: 
    Done- Check for information that has been entered incorrectly, and either alert the user to fix this or properly format the data for the user.
    Part Done- Keep separate averages by subject, or try adding weighted grades based on assignment type.
Notes:
    - You may add any new features that you see fit, but ensure that any new changes meet the requirements above.
    - You may only add HTML and CSS if you are implementing new features not required. However, please add comments where these changes have been added in the code. Remember, do not remove or modify any prexisting HTML or CSS.
*/

// Changes H1 prior to window load
window.onload = function(){document.getElementsByTagName('h1')[0].innerHTML = 'Grade book for Dominick'};
// Total number of created lines
let allScores = [];
// Subject list to use in for loops
const subjectList = ['Science', 'Spanish', 'Health', 'Music', 'English', 'History', 'Mathematics'];
// Initial Function on form submission. Pulls data and runs initiates other initial functions
const addRow = (()=> {
    let subject = document.querySelector('#subject').value;
    let assignment = document.querySelector('#assignment').value;
    let score = document.querySelector('#score').value;
    let late = document.getElementById('late');
    let onTime = late.options[late.selectedIndex].text;
    if (onTime === 'Late'){
        score = parseInt(score) - 10;
    }
    correctEntry(subject, assignment, score, onTime);
    return false;
});
// Check the entry is correct and continue adding row if it is
const correctEntry = (subject, assignment, score, onTime) => {
    switch (true){
        case subject === '' && assignment === '' && score === '':
            alert('Form submitted empty, try again');
            break;
        case subject === '':
            alert('Please enter a subject');
            break;
        case assignment === '':
            alert('Please enter an assignment name.');
            break;
        case score === '':
            alert('Please enter a score.');
            break;
        case subject !== '':
            subject = subject.toLowerCase();
            subject = formatSubject(subject);
            if (subject === -1){
                alert('Please enter \'English\', \'Health\', \'Mathematics\', \'Music\', \'Spanish\', \'Science\', or \'History\' in the subject line.');
                return false;
            };
        default:
            if (score >= 0){
                createRow(subject, assignment, score, onTime);
                totalGPA(score);
                clearFields();
            } else {alert('Score must be non-negative number.')};
        };
};
// Creates row and prompts to create GPA row if not already present
const createRow = ((subject, assignment, score, late) => {
    let html, newHTML, totalRows;
    html = '<thead><tr id=row-%#%><th id="%Subject%">%Subject%</th><th>%Assignment%</th><th id="score">%Score%</th><th id="late">%late%</th><th><button type="delete" value="Delete" id="delete-%num%" onclick="return deleteEvent(%delNum%)">Delete</button></th></tr></thead>';
    newHTML = html.replace('%#%', numberRow);
    newHTML = newHTML.replace('%Subject%', subject);
    newHTML = newHTML.replace('%Subject%', subject);
    newHTML = newHTML.replace('%Assignment%', assignment);
    newHTML = newHTML.replace('%Score%', score);
    newHTML = newHTML.replace('%late%', late);
    totalRows = numberRow();
    newHTML = newHTML.replace('%num%', totalRows);
    newHTML = newHTML.replace('%delNum%', totalRows);
    document.querySelector('#container').insertAdjacentHTML('beforeend', newHTML);
    if (totalRows === 0){
        createGPARow();
    };
});
// Formats subject to one of 7 subjects
const formatSubject = function(subject){
    switch (true){
        case subject.indexOf('sc') === 0:
            subject = 'Science';
            return subject;
        case subject.indexOf('his') === 0:
            subject = 'History';
            return subject;
        case subject.indexOf('ma') === 0:
            subject = 'Mathematics';
            return subject;
        case subject.indexOf('sp') === 0:
            subject = 'Spanish';
            return subject;
        case subject.indexOf('mu') === 0:
            subject = 'Music';
            return subject;
        case subject.indexOf('he') === 0:
            subject = 'Health';
            return subject;
        case subject.indexOf('en') === 0:
            subject = 'English';
            return subject;
        default :
            return -1;
        };
};
// Creates row ID
const numberRow = function(){
       totalRows = allScores.length;
        if (totalRows > 0){
            return totalRows;
        }else {
            totalRows = 0;
            return totalRows};
    };
// Creates average for scores (both total GPA and subject specific)
const createAverage = function(callID){
    let i, total, cur, average, newAttempt;
    total = 0;
    switch (true){
        case callID === 'Science':
            newAttempt = document.querySelectorAll('#Science');
            break;
        case callID === 'English':
            newAttempt = document.querySelectorAll('#English');
            break;
        case callID === 'Health':
            newAttempt = document.querySelectorAll('#Health');
            break;
        case callID === 'Mathematics':
            newAttempt = document.querySelectorAll('#Mathematics');
            break;
        case callID === 'Music':
            newAttempt = document.querySelectorAll('#Music');
            break;
        case callID === 'Spanish':
            newAttempt = document.querySelectorAll('#Spanish');
            break;
        case callID === 'History':
            newAttempt = document.querySelectorAll('#History');
            break;
        case callID === 'total':
            newAttempt = document.querySelectorAll('#score');
            for (i=1; i < newAttempt.length; i++){
                cur = parseInt(newAttempt[i].innerHTML);
                total += cur;
            };
            average = total / (newAttempt.length - 1);
            if (average >= 0){
            return `${average.toFixed(2)}%`;
            } else {return 'No grades'};
        default: 
            alert(`Something went wrong creating the GPA for ${callID}`);
    }; 
    for (i=0; i < newAttempt.length; i++){
        cur = parseInt(newAttempt[i].parentNode.children[2].innerHTML);
        total += cur;
    };
    average = total / (newAttempt.length);
    if (average >= 0){
    return `${average.toFixed(2)}%`;
    } else {return 'No grades'};
};
// Pushes score into GPA array and runs create GPA
const totalGPA = function(newGrade){
    allScores.push(newGrade);
    createGPA();
    checkSubjectGrades();
};
// Pushes calculated GPA into display
const createGPA = function(){
    let average;
        average = createAverage('total');
        document.querySelector('#gpa').innerHTML = `${average}`;
};
// Sorts click event to find correct clicks
const clickEvent = function(event){
    let targetText = event.target.innerHTML;
    let correctTarget = event.target.parentNode.innerHTML.indexOf('<th>');
    console.log(correctTarget);
    if (correctTarget >= 0 && correctTarget < 1000 && targetText.indexOf('<button') !== 0){
    changeText(targetText);  
    };
};
// Changes the text of targeted table element
const changeText = function(targetText){
    let newText = prompt('What would you like to change this to?');
        switch (true){
            case newText === '' || newText === null:
                return false;
            case (subjectList.indexOf(targetText) >= 0):
                if (newText === '' || newText === null){
                    return false;
                };
                newText = newText.toLowerCase();
                newText = formatSubject(newText);
                if(newText === -1){
                    alert('Please enter a correct subject.');
                    return false;
                };
                event.target.innerHTML = newText;
                event.target.parentNode.children[0].id = newText;
                checkSubjectGrades();
                break;
            case targetText >= 0:
                if (newText < 0){
                    alert('Score must be non-negative number.');
                    return false;
                };
                event.target.innerHTML = newText;
                createGPA();
                checkSubjectGrades();
                break;
            case targetText === 'On Time' || targetText === 'Late':
                newText = newText.toLowerCase();
                lateScore = parseInt(event.target.parentNode.children[2].innerHTML);
                switch (true){
                    case newText === 'late' && targetText !== 'Late':
                        newText = 'Late';
                        event.target.innerHTML = newText;
                        lateScore = lateScore - 10;
                        event.target.parentNode.children[2].innerHTML = lateScore;
                        createGPA();
                        checkSubjectGrades();
                        break;
                    case newText === 'on time' || newText === 'ontime':
                        if (targetText === 'Late'){
                            newText = 'On Time';
                            event.target.innerHTML = newText;
                            lateScore = lateScore + 10;
                            event.target.parentNode.children[2].innerHTML = lateScore;
                            createGPA();
                            checkSubjectGrades();
                            break;
                        };
                    case newText === 'late' || newText === 'on time' || newText === 'ontime':
                        alert('Same category entered');
                        return false;
                    default:
                        alert('This category must be \'On Time\' or \'Late\'');
                        return false;
                };
            default:
                event.target.innerHTML = newText;
                break;
        };
};
// Runs delete line event from delete button
const deleteEvent = function(num){
    let deleteTarget = document.getElementById(`delete-${num}`).parentNode.parentNode.id;
    document.getElementById(deleteTarget).parentNode.removeChild(document.getElementById(deleteTarget));
    createGPA();
    checkSubjectGrades();
};
// Runs a loop over each subject to check for changes during change events (delete and change text)//////////////////////////////////////////////////////
const checkSubjectGrades = function(){
    let average
    for (i=0; i < subjectList.length; i++){
        average = createAverage(subjectList[i]);
        document.getElementById(`${subjectList[i]}GPA`).innerHTML = `${subjectList[i]}: ${average}`;
    };
};
// Reset entry fields and sets focus to top entry field
const clearFields = (current => {
   let fieldsArray;
    fieldsArray = [...document.querySelectorAll('#subject, #assignment, #score')];
    fieldsArray.forEach((current, index, array) => current.value = "");
    fieldsArray[0].focus();
});
// Creates the row to display GPA and subject specific GPA
const createGPARow = function(){
    let gradeHTML = '<h3 id="average" style="display: inline;">GPA: <span id="gpa">%Average%</span><br><span id="ScienceGPA">Science: No grades</span><br><span id="HistoryGPA">History: No grades</span><br><span id="MathematicsGPA">Mathematics: No grades</span><br><span id="EnglishGPA">English: No grades</span><br><span id="MusicGPA">Music: No grades</span><br><span id="SpanishGPA">Spanish: No grades</span><br><span id="HealthGPA">Health: No grades</span></h3>';
    document.querySelector('#container').insertAdjacentHTML('afterend', gradeHTML);
};
// Listens for mouse click and runs click function
document.addEventListener('click', clickEvent);