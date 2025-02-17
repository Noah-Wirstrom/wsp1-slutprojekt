
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
    tiles = document.getElementsByClassName("tile");
    for(const tile of tiles){
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
        setTimeout(() => {
            column.style.transition = 'none'; // Disable transition
            column.style.transform = 'none'; // Reset the position
            column.offsetHeight;
            setTimeout(() => {
                column.style.transition = `transform ${spin_time / 1000}s ease-out`; // Enable transition
                let random = Math.floor((Math.random() - 0.5) * tile_height * 2 - 10);
                column.style.transform = `translateY(-${totalscroll + random}px)`; // Scroll to the
            }, 100); // Wait for 100ms before starting the spin
            setTimeout(() => {
                column.style.transition = `transform ${0.5}s ease-out`;
                column.style.transform = `translateY(-${totalscroll}px)`; // Scroll to the selected tile
            }, spin_time + 500); // Wait for the spin duration before resetting the position
        }, delay); // Wait for 100ms before starting the spin
        delay += 400;

    }
} 

function check_win(){
    const columns = document.getElementsByClassName("display");
    let win=0
    let win_row1 =[];
    let win_row2 =[];
    let win_row3 =[];

    let win_arrays = [win_row1, win_row2, win_row3];

    for(const column of columns){
        win_row1.append(container.nthChild(11));
        win_row2.append(container.nthChild(12));
        win_row3.append(container.nthChild(13));
    }
    for(const win_array of win_arrays){
        for(let i = 0; i<win_row1.length; i++) {
            if(win_row[i]){};



        }
    }


}