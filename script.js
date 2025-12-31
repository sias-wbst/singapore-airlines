const joinBtn = document.getElementById("joinBtn");
const homeLink = document.getElementById("homeLink");
const staffLink = document.getElementById("staffLink");
const aboutLink = document.getElementById("aboutLink");
const bookLink = document.getElementById("bookLink");

const home = document.getElementById("home");
const ourStaff = document.getElementById("ourStaff");
const aboutUs = document.getElementById("aboutUs");
const bookFlight = document.getElementById("bookFlight");

if (joinBtn) {
    joinBtn.addEventListener("click", () => {
        window.open("https://discord.gg/KpucdrfdD3", "_blank");
    });
}

function closeAll() {
    [ourStaff, aboutUs, bookFlight].forEach(sec => {
        if (sec) {
            sec.classList.remove("open");
            sec.style.maxHeight = null;
        }
    });
}

if (staffLink && ourStaff) {
    staffLink.addEventListener("click", e => {
        e.preventDefault();
        closeAll();
        ourStaff.classList.add("open");
        setTimeout(() => {
            ourStaff.scrollIntoView({ behavior: "smooth" });
        }, 100);
    });
}

if (aboutLink && aboutUs) {
    aboutLink.addEventListener("click", e => {
        e.preventDefault();
        closeAll();
        aboutUs.classList.add("open");
        setTimeout(() => {
            aboutUs.scrollIntoView({ behavior: "smooth" });
        }, 100);
    });
}

if (bookLink && bookFlight) {
    bookLink.addEventListener("click", e => {
        e.preventDefault();
        closeAll();
        bookFlight.classList.add("open");
        setTimeout(() => {
            bookFlight.scrollIntoView({ behavior: "smooth" });
        }, 100);
    });
}

if (homeLink && home) {
    homeLink.addEventListener("click", e => {
        e.preventDefault();
        closeAll();
        home.scrollIntoView({ behavior: "smooth" });
    });
}


const form = document.getElementById('bookingForm');
const successMsg = document.getElementById('successMessage');
const errorMsg = document.getElementById('errorMessage');

if (form && successMsg && errorMsg) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        successMsg.style.display = 'none';
        errorMsg.style.display = 'none';
        
        const formData = new FormData(form);
        const roblox = formData.get('roblox');
        const discord = formData.get('discord');
        const notes = formData.get('notes') || 'No additional notes';
        
        const timestamp = new Date().toLocaleString('en-IN', { 
            timeZone: 'Asia/Kolkata',
            dateStyle: 'medium',
            timeStyle: 'short'
        });
        
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbwYx9_mM0QW4FRjOF2kmH0zGGErALJfC2j8RHMvTj9O3iwwD-kFoDJ2njQ2nk7FA8Y3qw/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    timestamp: timestamp,
                    roblox: roblox,
                    discord: discord,
                    notes: notes
                })
            });
            
            successMsg.style.display = 'block';
            successMsg.textContent = '✓ Booking submitted successfully! We\'ll contact you soon on Discord.';
            form.reset();
            
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
            
        } catch (error) {
            errorMsg.style.display = 'block';
            errorMsg.textContent = '✗ Error submitting booking. Please contact us on Discord.';
            console.error('Error:', error);
            setTimeout(() => {
                errorMsg.style.display = 'none';
            }, 5000);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Booking';
        }
    });
}
