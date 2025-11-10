// ===== DOM elements =====
let click_btn = document.getElementById('clickMe');
let highscore = document.getElementById('highscore');
let goback = document.getElementById('go-back');
let oldpage = document.body.innerHTML;
let navigate_to_result = document.getElementById('result');


// ===== Variables. ======
let number = 0;
let high_score;
let total_click = 0;
let highscore_arr = [];

// ===== Load Result Page =====
async function load_result() {
    const response = await fetch('result.html');
    const html = await response.text();
    
    document.body.innerHTML = html;
    
    // Wait until the DOM updates.
    setTimeout(() => {
        // extract the elements from the result.html
        let result_highscore = document.getElementById('result-highscore');
        let result_totalclick = document.getElementById('result-totalclick');
        
        // get saved data.
        highscore_arr = JSON.parse(localStorage.getItem("highscore_arr"));
        total_click = localStorage.getItem("totalClick");

        // calculate highest score.
        if(highscore_arr.length > 0){
            high_score = Math.max(...highscore_arr);
        }

        // update Screen.
        if(high_score) result_highscore.textContent = `HighScore: ${high_score}`;
        if (total_click) result_totalclick.textContent = `TotalClick: ${total_click}`;

        // back to the old game page.
        const goback = document.getElementById('go-back');
        if (goback){
            goback.addEventListener('click', () => {
                document.body.innerHTML = oldpage;
                restoreGame();
            });
        }
    }, 200);
}

// ===== Result Page Navigation =====
navigate_to_result.addEventListener('click', () => {
    load_result();
})

// ===== Restore Game =====
function restoreGame() {
    click_btn = document.getElementById('clickMe');
    highscore = document.getElementById('highscore');
    number = 0;
    increment_number();

    // reattach listener for result button
    const navigate_to_result = document.getElementById('result');
    if(navigate_to_result) {
        navigate_to_result.addEventListener('click', () => {
            load_result();
        });
    }
}

// ===== Increment Logic =====
async function increment_number () {
    let reset_number = Math.floor(Math.random() * 100);
    highscore_arr.push(reset_number);
    
    click_btn.addEventListener('click', () => {
        total_click++;
        number++;
        
        if (number == reset_number || number == 100){
            highscore.textContent = `HighScore: ${number}`;
            save_to_localstorage();
            number = 0;
            click_btn.textContent = number;
            load_result();
        }
        else if (number <= 100){
            click_btn.textContent = number;
        }
        else {
            alert("Increment Limit reached!");
        }
    });
}

// ===== Save Data =====
function save_to_localstorage() {
    localStorage.setItem("highscore_arr", JSON.stringify(highscore_arr));
    localStorage.setItem("totalClick", total_click);
}

// ===== Start Game =====
increment_number();