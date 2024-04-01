/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?

let calculated_cost = document.getElementById("calculated-cost");


let day_options = {
    // "day": selected
    "monday": 0,
    "tuesday": 0,
    "wednesday": 0,
    "thursday": 0,
    "friday": 0
};

let total_days_selected = 0;


const length_options = {
    // "length": "cost"
    "full": 35,
    "half": 20
};

let default_length = "full"; // Default = full ($35 per day)
let default_length_cost = length_options[default_length];
let length_cost = default_length_cost;


let total_cost = 0;


/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

function change_selected_day_colour() {
    let class_list = this.classList;
    let day = this.id;

    let clckd = "clicked";

    if (class_list.contains(clckd)) {
        class_list.remove(clckd);
        day_options[day] = 0;
        total_days_selected -= 1;
    } else {
        class_list.add(clckd);
        day_options[day] = 1;
        total_days_selected += 1;
    }

    calculate_cost();
}

for (let day in day_options) {
    document.getElementById(day).addEventListener("click", change_selected_day_colour);
}


/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

function clear_days() {
    for (let day in day_options) {
        if (day_options[day]) {
            change_selected_day_colour.call(document.getElementById(day));
        }
    }

    if (length_cost != default_length_cost) {
        change_rate.call(document.getElementById(default_length));
    }
}

document.getElementById("clear-button").addEventListener("click", clear_days);


/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.
// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

function change_rate() {
    let class_list = this.classList;
    let length = this.id;

    let clckd = "clicked";

    if (!class_list.contains(clckd)) {
        class_list.add(clckd);

        for (let option in length_options) {
            if (option !== length) {
                document.getElementById(option).classList.remove(clckd);
            }
        }

        length_cost = length_options[length];
        calculate_cost();
    }
}

for (let length in length_options) {
    document.getElementById(length).addEventListener("click", change_rate);
}


/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function calculate_cost() {
    let final_cost = total_days_selected * length_cost;

    if (total_cost !== final_cost) {
        calculated_cost.innerHTML = final_cost;
        total_cost = final_cost;
    }
}