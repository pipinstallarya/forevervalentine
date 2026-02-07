document.addEventListener('DOMContentLoaded', function() {
    const dayCards = document.querySelectorAll('.day-card');
    const modal = document.getElementById('pageModal');
    const modalContent = document.getElementById('pageContent');
    const closeBtn = document.querySelector('.close');
    const currentDateElement = document.getElementById('currentDate');
    
    // Update current date in IST
    function updateCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'Asia/Kolkata'
        };
        currentDateElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    updateCurrentDate();
    setInterval(updateCurrentDate, 60000); // Update every minute
    
    // Check if a day should be unlocked based on IST
    function isDayUnlocked(dateString) {
        // Developer mode - unlock all days for testing
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('dev') === 'true') {
            return true;
        }
        
        const now = new Date();
        const targetDate = new Date(dateString + 'T00:00:00+05:30'); // IST midnight
        return now >= targetDate;
    }
    
    // Create floating hearts
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 6 + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
        document.querySelector('.floating-hearts').appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
    
    // Create hearts periodically
    setInterval(createFloatingHeart, 3000);
    createFloatingHeart(); // Create initial hearts
    
    // Initialize day cards
    function initializeDayCards() {
        dayCards.forEach(card => {
            const date = card.getAttribute('data-date');
            const day = card.getAttribute('data-day');
            
            if (isDayUnlocked(date)) {
                card.classList.add('unlocked');
                card.addEventListener('click', () => openDayPage(day));
            } else {
                card.addEventListener('click', () => showLockedMessage());
            }
        });
    }
    
    // Show locked message
    function showLockedMessage() {
        const message = document.createElement('div');
        message.className = 'locked-message';
        message.innerHTML = `
            <div style="background: rgba(255, 255, 255, 0.95); padding: 20px; border-radius: 15px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <h3 style="color: #ff6b9d; margin-bottom: 10px;">🔒 Patience is a virtue!</h3>
                <p style="color: #2d3436;">This day will unlock when the time is right. Check back on the specified date! 💕</p>
            </div>
        `;
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2000;
            animation: fadeInOut 3s ease-in-out;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    // Open day page
    function openDayPage(day) {
        const pageContent = getDayContent(day);
        modalContent.innerHTML = pageContent;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Initialize day-specific animations
        initializeDayAnimations(day);
    }
    
    // Get day content
    function getDayContent(day) {
        const contents = {
            '7': `
                <div class="rose-day-content">
                    <h1 style="font-family: 'Dancing Script', cursive; font-size: 3rem; color: #ff6b9d; text-align: center; margin-bottom: 20px;">🌹 Rose Day 🌹</h1>
                    <div class="rose-animation" style="position: relative; height: 300px; margin: 30px 0; overflow: hidden; border-radius: 15px; background: linear-gradient(135deg, #ff9a9e, #fad0c4);">
                        <div id="roseContainer"></div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: rgba(255, 255, 255, 0.8); border-radius: 15px; margin: 20px 0;">
                        <h2 style="color: #c44569; margin-bottom: 15px;">My Dearest Devi,</h2>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #2d3436; margin-bottom: 15px;">
                            Just like a rose, your love blooms beautifully in my heart. Each petal represents a memory we've shared, 
                            each thorn a challenge we've overcome together, and each fragrance a moment that makes my life sweeter.
                        </p>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #2d3436; margin-bottom: 15px;">
                            On this Rose Day, I want you to know that you are the most beautiful flower in the garden of my life. 
                            Your love has painted my world with colors I never knew existed.
                        </p>
                        <p style="font-size: 1.2rem; font-weight: 600; color: #ff6b9d; margin-top: 20px;">
                            I love you more than words can express. 💕
                        </p>
                    </div>
                </div>
            `,
            '8': `
                <div class="propose-day-content">
                    <h1 style="font-family: 'Dancing Script', cursive; font-size: 3rem; color: #ff6b9d; text-align: center; margin-bottom: 20px;">💍 Propose Day 💍</h1>
                    <div style="position: relative; height: 300px; margin: 30px 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 15px;">
                        <div style="font-size: 8rem; animation: pulse 2s infinite;">💍</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: rgba(255, 255, 255, 0.8); border-radius: 15px; margin: 20px 0;">
                        <h2 style="color: #c44569; margin-bottom: 15px;">My Beautiful Devi,</h2>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #2d3436; margin-bottom: 15px;">
                            Every moment with you feels like a beautiful dream that I never want to wake up from. 
                            Today, on Propose Day, I want to make a promise that goes beyond just words.
                        </p>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #2d3436; margin-bottom: 15px;">
                            I propose to love you more fiercely with each passing day, to support your dreams as if they were my own, 
                            to be your shelter in storms and your sunshine in happiness. I propose to choose you, every single day, 
                            for the rest of my life.
                        </p>
                        <p style="font-size: 1.2rem; font-weight: 600; color: #ff6b9d; margin-top: 20px;">
                            Will you continue to be the reason I believe in love? 💕
                        </p>
                    </div>
                </div>
            `,
            '9': `
                <div class="chocolate-day-content">
                    <h1 style="font-family: 'Dancing Script', cursive; font-size: 3rem; color: #8b4513; text-align: center; margin-bottom: 20px;">🍫 Chocolate Day 🍫</h1>
                    <div style="position: relative; height: 300px; margin: 30px 0; overflow: hidden; border-radius: 15px; background: linear-gradient(135deg, #8b4513, #d2691e);">
                        <div id="chocolateContainer"></div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: rgba(255, 255, 255, 0.8); border-radius: 15px; margin: 20px 0;">
                        <h2 style="color: #8b4513; margin-bottom: 15px;">My Sweet Devi,</h2>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #2d3436; margin-bottom: 15px;">
                            Life with you is like the finest chocolate - rich, sweet, and utterly addictive. 
                            Each day with you adds a new layer of flavor to my life's journey.
                        </p>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #2d3436; margin-bottom: 15px;">
                            On this Chocolate Day, I want to remind you that you are the sweetest thing that has ever happened to me. 
                            Your love melts away all my worries and fills my heart with warmth and joy.
                        </p>
                        <p style="font-size: 1.2rem; font-weight: 600; color: #8b4513; margin-top: 20px;">
                            You're my favorite flavor of love! 🍫💕
                        </p>
                    </div>
                </div>
            `,
            '10': `
                <div class="teddy-day-content">
                    <h1 style="font-family: 'Dancing Script', cursive; font-size: 3rem; color: #ff6b9d; text-align: center; margin-bottom: 20px;">🧸 Teddy Day 🧸</h1>
                    <div style="position: relative; height: 300px; margin: 30px 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #ffeaa7, #fab1a0); border-radius: 15px;">
                        <div style="font-size: 8rem; animation: bounce 2s infinite;">🧸</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: rgba(255, 255, 255, 0.8); border-radius: 15px; margin: 20px 0;">
                        <h2 style="color: #ff6b9d; margin-bottom: 15px;">My Cuddly Dev,</h2>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #2d3436; margin-bottom: 15px;">
                            If I could give you a teddy bear for every time you made me smile, I'd have to build a whole new world 
                            just to store them all. You are my comfort, my joy, my everything.
                        </p>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #2d3436; margin-bottom: 15px;">
                            On this Teddy Day, I want you to know that I'll always be your teddy bear - here to hug you when you're sad, 
                            to listen when you need to talk, and to love you unconditionally, always.
                        </p>
                        <p style="font-size: 1.2rem; font-weight: 600; color: #ff6b9d; margin-top: 20px;">
                            Your personal teddy bear, forever and always! 🧸💕
                        </p>
                    </div>
                </div>
            `,
            '11': `
                <div class="promise-day-content">
                    <h1 style="font-family: 'Dancing Script', cursive; font-size: 3rem; color: #3498db; text-align: center; margin-bottom: 20px;">🤝 Promise Day 🤝</h1>
                    <div style="position: relative; height: 300px; margin: 30px 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #3498db, #2980b9); border-radius: 15px;">
                        <div style="font-size: 8rem; animation: pulse 2s infinite;">🤝</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: rgba(255, 255, 255, 0.8); border-radius: 15px; margin: 20px 0;">
                        <h2 style="color: #3498db; margin-bottom: 15px;">My Precious Devi,</h2>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #2d3436; margin-bottom: 15px;">
                            Today, on Promise Day, I want to make you some promises that I intend to keep for a lifetime:
                        </p>
                        <div style="text-align: left; max-width: 500px; margin: 20px auto;">
                            <p style="margin-bottom: 10px;">💙 I promise to love you through every storm and sunshine.</p>
                            <p style="margin-bottom: 10px;">💙 I promise to support your dreams and celebrate your victories.</p>
                            <p style="margin-bottom: 10px;">💙 I promise to listen when you speak and hear what you don't say.</p>
                            <p style="margin-bottom: 10px;">💙 I promise to be your safe harbor in this chaotic world.</p>
                            <p style="margin-bottom: 10px;">💙 I promise to choose you, every single day, for the rest of my life.</p>
                        </div>
                        <p style="font-size: 1.2rem; font-weight: 600; color: #3498db; margin-top: 20px;">
                            These aren't just promises, they're my heart's truth. 🤝💕
                        </p>
                    </div>
                </div>
            `,
            '12': `
                <div class="hug-day-content">
                    <h1 style="font-family: 'Dancing Script', cursive; font-size: 3rem; color: #e74c3c; text-align: center; margin-bottom: 20px;">🤗 Hug Day 🤗</h1>
                    <div style="position: relative; height: 300px; margin: 30px 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #e74c3c, #c0392b); border-radius: 15px;">
                        <div style="font-size: 8rem; animation: bounce 2s infinite;">🤗</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: rgba(255, 255, 255, 0.8); border-radius: 15px; margin: 20px 0;">
                        <h2 style="color: #e74c3c; margin-bottom: 15px;">My Warm Devi,</h2>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #2d3436; margin-bottom: 15px;">
                            If I could wrap my arms around you right now, I would never let go. Your hugs are my favorite place in the world - 
                            warm, safe, and filled with unconditional love.
                        </p>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #2d3436; margin-bottom: 15px;">
                            On this Hug Day, I want to send you a virtual hug that carries all my love, warmth, and affection. 
                            May it wrap around you like a cozy blanket and remind you how deeply you are loved.
                        </p>
                        <p style="font-size: 1.2rem; font-weight: 600; color: #e74c3c; margin-top: 20px;">
                            Sending you the biggest, warmest hug ever! 🤗💕
                        </p>
                    </div>
                </div>
            `,
            '13': `
                <div class="kiss-day-content">
                    <h1 style="font-family: 'Dancing Script', cursive; font-size: 3rem; color: #e91e63; text-align: center; margin-bottom: 20px;">💋 Kiss Day 💋</h1>
                    <div style="position: relative; height: 300px; margin: 30px 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #e91e63, #c2185b); border-radius: 15px;">
                        <div style="font-size: 8rem; animation: pulse 2s infinite;">💋</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: rgba(255, 255, 255, 0.8); border-radius: 15px; margin: 20px 0;">
                        <h2 style="color: #e91e63; margin-bottom: 15px;">My Lovely Devi,</h2>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #2d3436; margin-bottom: 15px;">
                            Every kiss we share is like a promise whispered between our souls - a promise of love, passion, and forever. 
                            Your lips are the sweetest I've ever known, and your kisses make my heart skip beats.
                        </p>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #2d3436; margin-bottom: 15px;">
                            On this Kiss Day, I want to remind you that each kiss from you is like a spark that ignites the fire in my heart. 
                            You're the missing piece that makes my life complete.
                        </p>
                        <p style="font-size: 1.2rem; font-weight: 600; color: #e91e63; margin-top: 20px;">
                            Blowing you a thousand kisses from across the miles! 💋💕
                        </p>
                    </div>
                </div>
            `,
            '14': `
                <div class="valentine-day-content">
                    <h1 style="font-family: 'Dancing Script', cursive; font-size: 3rem; color: #ff1744; text-align: center; margin-bottom: 20px;">❤️ Valentine's Day ❤️</h1>
                    <div style="position: relative; height: 300px; margin: 30px 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #ff1744, #d50000); border-radius: 15px;">
                        <div style="font-size: 8rem; animation: pulse 2s infinite;">❤️</div>
                    </div>
                    <div style="text-align: center; padding: 20px; background: rgba(255, 255, 255, 0.8); border-radius: 15px; margin: 20px 0;">
                        <h2 style="color: #ff1744; margin-bottom: 15px;">My Everything, Devi,</h2>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #2d3436; margin-bottom: 15px;">
                            Today, on Valentine's Day, I want to tell you something that I should say every single day - 
                            you are the best thing that has ever happened to me. You are my sunrise and my sunset, my reason to smile, 
                            and my forever love.
                        </p>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #2d3436; margin-bottom: 15px;">
                            This past week has been a journey through different facets of our love, but today we celebrate it all - 
                            the roses, the promises, the hugs, the kisses, and everything in between. You are my Valentine today, 
                            tomorrow, and for all the days to come.
                        </p>
                        <p style="font-size: 1.2rem; font-weight: 600; color: #ff1744; margin-top: 20px;">
                            Happy Valentine's Day, my love. You complete me! ❤️💕
                        </p>
                    </div>
                </div>
            `
        };
        
        return contents[day] || '<p>Content not available yet.</p>';
    }
    
    // Initialize day-specific animations
    function initializeDayAnimations(day) {
        switch(day) {
            case '7': // Rose Day - Falling roses
                createFallingRoses();
                break;
            case '9': // Chocolate Day - Falling chocolates
                createFallingChocolates();
                break;
        }
    }
    
    // Create falling roses animation
    function createFallingRoses() {
        const container = document.getElementById('roseContainer');
        if (!container) return;
        
        const roses = ['🌹', '🌺', '🌸', '🌷', '🌻'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const rose = document.createElement('div');
                rose.innerHTML = roses[Math.floor(Math.random() * roses.length)];
                rose.style.cssText = `
                    position: absolute;
                    font-size: ${Math.random() * 2 + 1}rem;
                    left: ${Math.random() * 100}%;
                    top: -50px;
                    animation: fall ${Math.random() * 3 + 2}s linear infinite;
                    opacity: ${Math.random() * 0.5 + 0.5};
                `;
                container.appendChild(rose);
            }, i * 200);
        }
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(350px) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create falling chocolates animation
    function createFallingChocolates() {
        const container = document.getElementById('chocolateContainer');
        if (!container) return;
        
        const chocolates = ['🍫', '🍩', '🍪', '🧁', '🍮'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const chocolate = document.createElement('div');
                chocolate.innerHTML = chocolates[Math.floor(Math.random() * chocolates.length)];
                chocolate.style.cssText = `
                    position: absolute;
                    font-size: ${Math.random() * 2 + 1}rem;
                    left: ${Math.random() * 100}%;
                    top: -50px;
                    animation: fall ${Math.random() * 3 + 2}s linear infinite;
                    opacity: ${Math.random() * 0.5 + 0.5};
                `;
                container.appendChild(chocolate);
            }, i * 200);
        }
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(350px) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Close modal
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Add CSS for fade in/out animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize the app
    initializeDayCards();
});
