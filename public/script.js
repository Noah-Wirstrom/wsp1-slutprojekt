
const depositBtn = document.getElementById('depositBtn');
const modal = document.getElementById('depositModal');
const overlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');
const confirmDeposit = document.getElementById('confirmDeposit');
const balanceElement = document.getElementById('balance');

let balance = 100; // Initial balance

// Show deposit modal
depositBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    overlay.style.display = 'block';
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
});

// Confirm deposit
confirmDeposit.addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('depositAmount').value);
    if (!isNaN(amount) && amount > 0) {
        balance += amount;
        balanceElement.textContent = `$${balance}`;
        alert(`You have successfully deposited $${amount}`);
        modal.style.display = 'none';
        overlay.style.display = 'none';
    } else {
        alert('Please enter a valid amount.');
    }
});

function randomizer(stats){
    var max = 1000;
    const tiles = document.getElementsByClassName("tile");
    const parent =document.getElementsByClassName("slot-machine");


    for(const tile of tiles){
        if(tile.parentElement==parent[0].children[0]){
            max=stats[5];
        }else{
            max=1000;
        }

        var x = Math.floor(Math.random() * max);

      
        
        if(x<stats[0]){
            symbol = "cross4.png";
        } else if (x<stats[1]){
            symbol = "hjarta4.png";
        } else if (x<stats[2]){
            symbol = "star3.png";
        } else if (x<stats[3]){
            symbol = "moln2.png";
        } else if (x<stats[4]){
            symbol = "wings.jpg";
        } else if (x<stats[5]){
            symbol = "nun.png";
        } else {
            symbol = "wild.png";
        }


        

        tile.querySelector('img').src = `img/${symbol}`;
    }
    spin_animation();
    check_win();
}

function spin_animation(){
    const displays=document.getElementsByClassName("display");
    const tile_height= document.querySelector(".tile").offsetHeight;
    const total_tiles= document.querySelectorAll(".tile").length/5;

    console.log(tile_height);
    console.log(total_tiles);

    let totalscroll =tile_height*(total_tiles-4);
    let delay=0;
    let spin_time=(1600);

    for (const column of displays) {
        column.style.transition = 'none'; // Disable transition
        column.style.transform = `translateY(0)`; // Reset the position
        setTimeout(() => {
            column.offsetHeight;
            setTimeout(() => {
                column.style.transition = `transform ${spin_time / 1000}s ease-out`; // Enable transition
                let random = Math.floor((Math.random() - 0.5) * tile_height * 1.5 - 10);
                column.style.transform = `translateY(-${totalscroll + random}px)`; // Scroll to the
            }, 100); // Wait for 100ms before starting the spin
            setTimeout(() => {
                column.style.transition = `transform ${1.2}s ease-out`;
                column.style.transform = `translateY(-${totalscroll}px)`; // Scroll to the selected tile
            }, spin_time); // Wait for the spin duration before resetting the position
        }, delay); // Wait for 100ms before starting the spin
        delay += 400;

    }
} 

function check_win() {
    const containers = document.getElementsByClassName("display");
    console.log(containers);
    let win = 0;
    let win_array1 = [];
    let win_array2 = [];
    let win_array3 = [];

    const win_window=document.getElementById("win");
    win_window.innerHTML="";

    for (const container of containers) {   
        console.log(container);
        win_array1.push(container.children[11]);
        win_array2.push(container.children[12]);
        win_array3.push(container.children[13]);
    }

    let win_arrays = [win_array1, win_array2, win_array3];
    
    for (const win_array of win_arrays) {
        let win_tiles = 0;
        for(let i = 0; i < win_array.length; i++) {   
            if (win_array[i].querySelector('img').src.endsWith("wild.png")) {
                win_array[i].innerHTML = win_array[0].innerHTML;
                setTimeout (() => {
                    win_array[i].querySelector('img').src = `img/wild.png`;
                }, 10);
            }
        }
            if (win_array[0].innerHTML === win_array[1].innerHTML && win_array[1].innerHTML === win_array[2].innerHTML) {
                win_tiles = 3;
                if (win_array[0].innerHTML === win_array[3].innerHTML) {
                    win_tiles = 4;
                    if (win_array[0].innerHTML === win_array[4].innerHTML) {
                        win_tiles = 5;
                    }
                }
            }
            if (win_tiles > 0) {
                if (win_array[0].querySelector('img').src.endsWith("cross4.png")) {
                    if (win_tiles == 3) {
                        win += 10;
                    } else if (win_tiles == 4) {
                        win += 20;
                    } else if (win_tiles == 5) {
                        win += 50;
                    }
                } else if (win_array[0].querySelector('img').src.endsWith("hjarta4.png")) {
                    if (win_tiles == 3) {
                        win += 20;
                    } else if (win_tiles == 4) {
                        win += 40;
                    } else if (win_tiles == 5) {
                        win += 100;
                    }
                } else if (win_array[0].querySelector('img').src.endsWith("star3.png")) {
                    console.log("win");
                    if (win_tiles == 3) {
                        win += 30;
                    } else if (win_tiles == 4) {
                        win += 60;
                    } else if (win_tiles == 5) {
                        win += 150;
                    }
                } else if (win_array[0].querySelector('img').src.endsWith("moln2.png")) {
                    console.log("win");
                    if (win_tiles == 3) {
                        win += 40;
                    } else if (win_tiles == 4) {
                        win += 80;
                    } else if (win_tiles == 5) {
                        win += 200;
                    }
                } else if (win_array[0].querySelector('img').src.endsWith("wings.jpg")) {
                    console.log("win");
                    if (win_tiles == 3) {
                        win += 50;
                    } else if (win_tiles == 4) {
                        win += 100;
                    } else if (win_tiles == 5) {
                        win += 250;
                    }
                } else if (win_array[0].querySelector('img').src.endsWith("nun.png")) {
                    console.log("win");
                    if (win_tiles == 3) {
                        win += 60;
                    } else if (win_tiles == 4) {
                        win += 120;
                    } else if (win_tiles == 5) {
                        win += 300;
                    }
                }
            }
    }
    console.log(win);
    setTimeout (() => {
        document.getElementById("win").innerHTML = `$${win}`;
    }, 4700);
}