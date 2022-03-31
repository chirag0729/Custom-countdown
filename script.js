
const sd = document.getElementById('sd');
const inputTitle = document.getElementById('input-title');
const inputDate = document.querySelector('input[type = date]');
const startBtn = document.getElementById('start-btn');
const form1 = document.getElementById('form-sub');
const startcountdown = document.getElementById('startcountdown');
const endcountdown = document.getElementById('endcountdown');
const endHeading = document.getElementById('end-heading');
const countDay = document.getElementById('day');
const countHours = document.getElementById('hours');
const countMinutes = document.getElementById('minutes');
const countSeconds = document.getElementById('seconds');
const middleHeading = document.getElementById('middle-heading');
const resetBtn = document.getElementById('reset-btn');
const completeBtn = document.getElementById('complete-btn');

let selectedTitle = '';
let selectedDate = '';
let futureTime = Date;
let countdownActive;

// time parameters
second = 1000;
minute = second * 60;
hour = minute * 60;
day = hour * 24;

// Set nput date as min with todays date
const today = new Date().toISOString().split('T')[0];
inputDate.setAttribute('min', today);

function updateDom() {
   countdownActive = setInterval(() => {
      let currentTime = new Date().getTime();
      distance = futureTime - currentTime;
      console.log(distance);
      days = Math.floor(distance / day);
      hours = Math.floor((distance % day) / hour);
      minutes = Math.floor((distance % hour) / minute);
      seconds = Math.floor((distance % minute) / second);

      sd.hidden = true;

      if (distance < 0) {
         startcountdown.hidden = true;
         clearInterval(countdownActive);
         endcountdown.hidden = false;
         endHeading.textContent = `${selectedTitle} Finished On ${selectedDate}.`
      } else {
         middleHeading.textContent = `${selectedTitle}`
         countDay.textContent = days;
         countHours.textContent = hours;
         countMinutes.textContent = minutes;
         countSeconds.textContent = seconds;
         startcountdown.hidden = false;
      }
   }, second);
}

function resetCountdown() {
   startcountdown.hidden = true;
   endcountdown.hidden = true;
   sd.hidden = false;
   clearInterval(countdownActive);
   selectedTitle = '';
   selectedDate = '';
   localStorage.removeItem("countdown");
}

function updateCount(e) {
   e.preventDefault();
   selectedTitle = e.srcElement[0].value;
   selectedDate = e.srcElement[1].value;
   saveItem = {
      title: selectedTitle,
      date: selectedDate,
   };
   localStorage.setItem('countdown', JSON.stringify(saveItem));
   futureTime = new Date(selectedDate).getTime();
   updateDom();
}

function restorePreviousCount() {
   if (localStorage.getItem('countdown')) {
      sd.hidden = true;
      saveItem = JSON.parse(localStorage.getItem('countdown'));
      selectedTitle = saveItem.title;
      selectedDate = saveItem.date;
      futureTime = new Date(selectedDate).getTime();
   updateDom();
   }
}

// Event Liastners
form1.addEventListener('submit', updateCount);
resetBtn.addEventListener('click', resetCountdown);
completeBtn.addEventListener('click', resetCountdown)

restorePreviousCount();




