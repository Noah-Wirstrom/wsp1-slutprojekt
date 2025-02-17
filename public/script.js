
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
            symbol = "hjarta3.png";
        } else if (x<stats[2]){
            symbol = "star2.png";
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
}