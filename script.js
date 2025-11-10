let click_btn = document.getElementById('clickMe');
let highscore = document.getElementById('highscore');
let goback = document.getElementById('go-back');
let oldpage = document.body.innerHTML;
let number = 0;
let high_score;
let total_click = 0;
let highscore_arr = [];

async function load_result() {
    
    const response = await fetch('result.html');
    const html = await response.text();
    
    document.body.innerHTML = html;
    
    // Wait until the DOM updates.
    setTimeout(() => {
        // extract the elements from the result.html
        let result_highscore = document.getElementById('result-highscore');
        let result_totalclick = document.getElementById('result-totalclick');

        // add the datails.
        if(result_highscore){
            high_score = highscore_arr[0];
            for(let i = 1; i < highscore_arr.length; i++){
                if(highscore_arr[i] > high_score){
                    high_score = highscore_arr[i];
                }
            }
            result_highscore.textContent = `HighScore: ${high_score}`;
        }
        if(result_totalclick){
            result_totalclick.textContent = `TotalClick: ${total_click}`;
        }

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

function restoreGame() {
    click_btn = document.getElementById('clickMe');
    highscore = document.getElementById('highscore');
    number = 0;
    increment_number();
}

async function increment_number () {
    let reset_number = Math.floor(Math.random() * 100);
    highscore_arr.push(reset_number);
    
    click_btn.addEventListener('click', () => {
        total_click++;
        number++;
        
        if (number == reset_number || number == 100){
            highscore.textContent = `HighScore: ${number}`;
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

increment_number();