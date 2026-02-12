const questionView = document.getElementById('question-view');
const successView = document.getElementById('success-view');
const catSticker = document.getElementById('cat-sticker');
const mainQuestion = document.getElementById('main-question');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const interactiveArea = document.querySelector('.interactive-area');
const trashCan = document.getElementById('trash-can');
const forcedText = document.getElementById('forced-text');
const bgMusic = document.getElementById('bg-music');

// --- MANUAL ASSETS ARRAY ---
// Make sure these files exist in your 'assets' folder!
const catGifs = [
    "assets/cat 2.gif",
    "assets/cat crying.gif",
    "assets/puss in boots.gif",
    "assets/Tai Lung Shock GIF.gif",
    "assets/sad collapse GIF.gif",
    "assets/sadface GIF.gif", 
    "assets/Meme Reaction GIF by ProBit Global.gif", 
    "assets/Cat Page GIF.gif",
    "assets/Sad Guy GIF.gif", 
    "assets/Sad Eyes GIF by Regal.gif", 
    "assets/Tantrum Crying GIF.gif", 
    "assets/Sad Shock GIF.gif",
    "assets/Sad Ded GIF.gif", 
    "assets/desperate cat .gif", 
    "assets/Sad Cat GIF (1).gif", 
    "assets/cat 2.gif",
    "assets/Mad Cat GIF.gif", 
    "assets/evil cat GIF.gif", 
    "assets/Cat Love GIF.gif", 
    "assets/Bored Cat GIF.gif" // The finale (Angry/Smug)
];

const messages = [
    "Are you sure? 🥺", 
    "Really sure?? 😿", 
    "Think again! 💭", 
    "Last chance! 😖",
    "Don't break my heart! 💔", 
    "You're being stubborn! 😭", 
    "I'm gonna cry... 💧",
    "Look at this face! 😽", 
    "Please? 🙏", 
    "Abeg Na? 🎀",
    "Stoooooooooop! 🥲", 
    "Don't touch that button! 🚫", 
    "Change of heart? 💖",
    "You know you want to! 😏", 
    "I'll buy you food! 🍔", 
    "Okay, I'm sad now. 😞",
    "chai, it's me oh 😔😖", 
    "i'll Throw the no button away 🤓", 
    "One last try! ☝️",
    "Alright, I'm fixing this. 😈"
];

let clickCount = 0;
const MAX_ATTEMPTS = 20;

// --- 1. REMOVE LOADER (If you have one) ---
const loader = document.getElementById('loader');
if(loader) {
    setTimeout(() => { loader.style.display = 'none'; }, 2000);
}

// --- 2. NO BUTTON INTERACTION ---
noBtn.addEventListener('click', () => {
    // Play music on first click
    if (clickCount === 0) bgMusic.play().catch(e => console.log("Audio requires interaction"));
    
    clickCount++;

    if (clickCount < MAX_ATTEMPTS) {
        // Change Image & Text
        catSticker.src = catGifs[clickCount % catGifs.length];
        mainQuestion.innerText = messages[clickCount % messages.length];
        
        // Bounce Animation
        catSticker.classList.remove('bounce');
        void catSticker.offsetWidth; 
        catSticker.classList.add('bounce');

        // --- SMART COLLISION LOGIC ---
        const areaRect = interactiveArea.getBoundingClientRect();
        const yesRect = yesBtn.getBoundingClientRect();
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        // 1. Calculate how much space the "Yes" button is taking up
        // We get the bottom of the Yes button relative to the interactive area
        const yesBottomRelative = yesRect.bottom - areaRect.top;
        
        // 2. Define a "Safe Zone" 20px below the Yes button
        const safeMinY = yesBottomRelative + 20;
        
        // 3. Define the maximum allowable Y (bottom of container)
        const maxAvailableY = areaRect.height - btnHeight;
        
        // 4. Calculate X and Y limits
        const maxX = areaRect.width - btnWidth;
        // Ensure we don't crash if Yes button gets too big (default to bottom 50px if tight)
        const effectiveMinY = (safeMinY < maxAvailableY) ? safeMinY : (maxAvailableY - 50);
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * (maxAvailableY - effectiveMinY)) + effectiveMinY;

        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;

        // Grow Yes Button
        const scale = 1 + (clickCount * 0.05);
        yesBtn.style.transform = `scale(${scale})`;

    } else if (clickCount === MAX_ATTEMPTS) {
        // FINALE
        catSticker.src = catGifs[19]; // cat20.gif
        mainQuestion.innerText = messages[19];
        noBtn.classList.add('toss-away');
        
        setTimeout(() => {
            noBtn.style.display = 'none';
            trashCan.style.display = 'block';
            forcedText.style.display = 'block';
            yesBtn.style.transform = 'scale(1.4)'; // Make Yes button huge at the end
        }, 500);
    }
});

// --- 3. YES BUTTON INTERACTION ---
yesBtn.addEventListener('click', () => {
    bgMusic.play().catch(e => console.log("Audio requires interaction"));
    
    questionView.style.display = 'none';
    successView.style.display = 'block';

    const video = document.getElementById('us-video');
    video.src = "assets/Snapchat-1290486484.mp4"; // Ensure path is correct
    video.play();

    // Confetti
    const duration = 5 * 1000;
    const end = Date.now() + duration;
    (function frame() {
        if (typeof confetti === 'function') {
            confetti({ particleCount: 5, spread: 55, origin: { x: 0.5, y: 0.5 } });
        }
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
});