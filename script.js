
const inputDiv = document.getElementById("input");
const outputDiv = document.getElementById("output");

const inputDate1 = document.getElementById("date1"); //from 
const inputDate2 = document.getElementById("date2"); //to
const selectBirthMonth = document.getElementById("birth-month");
const selectAtMonth = document.getElementById("at-month");
const birthYear = document.getElementById("birth-year");
const atYear = document.getElementById("at-year");

const calculateAgeBtn = document.getElementById("calculate-btn")

const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

monthsArray.forEach((month, index)=>{
    selectBirthMonth.innerHTML += `<option value=${index + 1}>${month}</option>`;
    selectAtMonth.innerHTML += `<option value=${index + 1}>${month}</option>`;
})

const calculateAge = ()=>{
  const date1 = inputDate1.value;
  const date2 = inputDate2.value;
  const month1 = selectBirthMonth.value;
  const month2 = selectAtMonth.value;
  const year1 = birthYear.value;
  const year2 = atYear.value;

  const birthDate = new Date(month1 + "/" + date1 + "/" + year1);
  const atDate = new Date(month2 + "/" + date2 + "/" + year2);

    console.log(birthDate.getYear(), atDate)

    showOutput(birthDate, atDate)
}

calculateAgeBtn.addEventListener("click",()=>calculateAge())


const outputContent = document.getElementById('output-content')


const startAnim = ()=>{
    outputDiv.style.display = "block"
    inputDiv.classList.add("inputAnimation");
    outputDiv.classList.add("outputAnimation");
}
const showOutput = (birthdate, atdate) =>{

    atSomeDate = inputDate2.value + " " + monthsArray[selectAtMonth.value - 1] + " " + atYear.value + " (" + daysArray[atdate.getDay()] + ")"
    console.log(atSomeDate);
    const dayDuration = 24;

    // Total difference in years and remaining months, days.
    const daysInMonth = (month, year)=>{
      return new Date(year, month, 0).getDate()
    }

    let timeDiffInSeconds = Math.abs(atdate - birthdate) / 1000;
    timeDiff = timeDiffInSeconds / (60*60*24)
    diffYears = (Math.floor(timeDiff/365.25) == 0 && selectAtMonth.value == selectBirthMonth.value && inputDate1.value == inputDate2.value) ? Math.abs(Math.floor(timeDiff/365.25)) + 1 :  Math.abs(Math.floor(timeDiff/365.25))

    let RemainingDays_Year = (Number(inputDate2.value) >= Number(inputDate1.value)) ? Number(inputDate2.value) - Number(inputDate1.value) : (daysInMonth(selectAtMonth.value - 1, atYear.value) - ((daysInMonth(selectAtMonth.value - 1, atYear.value) === 31) ? (Math.abs((Number(inputDate2.value) - Number(inputDate1.value)))) : Math.abs((Number(inputDate2.value) - Number(inputDate1.value))) - 1))
    
    // RemainingDays_Year = 
    console.log(RemainingDays_Year)
    
    if(selectAtMonth.value > selectBirthMonth.value){
      RemainingMonths = Math.abs(selectAtMonth.value - selectBirthMonth.value); 
    }
    else if (selectAtMonth.value < selectBirthMonth.value){
      RemainingMonths = 12 - Math.abs(selectAtMonth.value  - selectBirthMonth.value)
    }
    else if(selectAtMonth.value == selectBirthMonth.value){
      RemainingMonths = 0
    }

      console.log(RemainingMonths);
    // Now for checking if the month has completed or not in both directions
    RemainingMonths = (Number(inputDate2.value) < Number(inputDate1.value) && selectAtMonth.value > selectBirthMonth.value) ? RemainingMonths - 1 : RemainingMonths ;
    
    RemainingMonths = (Number(inputDate2.value) >= Number(inputDate1.value) && selectAtMonth.value <= selectBirthMonth.value) ? RemainingMonths : (selectBirthMonth.value < selectAtMonth.value ? RemainingMonths : RemainingMonths - 1) ;
    
    RemainingMonths = (Number(inputDate2.value) < Number(inputDate1.value) && selectAtMonth.value == selectBirthMonth.value) ? 11 : RemainingMonths;
    
    let totalDiffMonths = (diffYears*12) + RemainingMonths
    RemainingDays_Month = RemainingDays_Year
    
    let totalDiffWeeks = Math.floor(timeDiffInSeconds/(7*24*60*60));
    RemainingDays_Week = Math.round((timeDiffInSeconds / (7 * 24 * 60 * 60) % 1) * 7)
    
    let totalHours = Math.floor(timeDiffInSeconds/(60*60))

    let totalDays = Math.floor(totalHours/24)
    
    outputContent.innerHTML = "";

   if ((atdate - birthdate) > 0) {
     outputContent.innerHTML += `
                <h3>At ${atSomeDate} your Age is :</h3>
                <ul>
                    ${
                      diffYears > 0
                        ? `<li>${diffYears} ${
                            diffYears > 1 ? "years" : "year"
                          } ${RemainingMonths} ${
                            RemainingMonths == 0 || RemainingMonths == 1
                              ? "month"
                              : "months"
                          } &  ${RemainingDays_Year} ${
                            RemainingDays_Year > 1 ? "days" : "day"
                          }</li> `
                        : ""
                    }
                   
                    
                </ul>
    `;
   } 
   else {
     outputContent.innerHTML =
       "Birth Date Must be earlier than the day at which you want to calculate the age !";
   }

   startAnim()

}
