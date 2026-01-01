const joinBtn = document.getElementById("joinBtn");
const homeLink = document.getElementById("homeLink");
const eventsLink = document.getElementById("eventsLink");
const staffLink = document.getElementById("staffLink");
const aboutLink = document.getElementById("aboutLink");
const bookLink = document.getElementById("bookLink");

const home = document.getElementById("home");
const events = document.getElementById("events");
const ourStaff = document.getElementById("ourStaff");
const aboutUs = document.getElementById("aboutUs");
const bookFlight = document.getElementById("bookFlight");

if (joinBtn) {
    joinBtn.addEventListener("click", () => {
        window.open("https://discord.gg/KpucdrfdD3", "_blank");
    });
}

function closeAll() {
    [events, ourStaff, aboutUs, bookFlight].forEach(sec => {
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

if (eventsLink && events) {
    eventsLink.addEventListener("click", e => {
        e.preventDefault();
        closeAll();
        events.classList.add("open");
        setTimeout(() => {
            events.scrollIntoView({ behavior: "smooth" });
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

// Flight schedule based on day of month
const flightSchedule = {
    1: "Incheon (Seoul) - SQ612",
    2: "Barcelona - SQ378",
    3: "San Francisco - SQ32",
    4: "Hyderabad - SQ522",
    5: "Dubai - SQ494",
    6: "Jakarta - SQ950",
    7: "Adelaide - SQ277",
    8: "Sydney - SQ211",
    9: "Amsterdam - SQ324",
    10: "Newark - SQ22",
    11: "Munich - SQ328",
    12: "Istanbul - SQ392",
    13: "Manchester - SQ302",
    14: "Colombo - SQ468",
    15: "Cape Town - SQ478 (via Johannesburg/Larnaca)",
    16: "Mumbai - SQ424",
    17: "Beijing (Capital) - SQ802",
    18: "Tokyo Narita - SQ12",
    19: "Seoul Gimpo - SQ132",
    20: "Brisbane - SQ235",
    21: "Melbourne - SQ207",
    22: "London Heathrow - SQ306",
    23: "Frankfurt - SQ26",
    24: "Seattle - SQ28",
    26: "Ahmedabad - SQ504",
    27: "Dhaka - SQ446",
    28: "Chennai - SQ528",
    29: "Denpasar (Bali) - SQ938",
    30: "Tokyo Haneda - SQ634",
    31: "New York (JFK) - SQ24"
};

// Auto-fill flight based on selected date
const flightDateInput = document.getElementById('flightDate');
const flightRouteInput = document.getElementById('flightRoute');

if (flightDateInput && flightRouteInput) {
    flightDateInput.addEventListener('change', (e) => {
        const selectedDate = new Date(e.target.value);
        const dayOfMonth = selectedDate.getDate();
        
        const flight = flightSchedule[dayOfMonth];
        
        if (flight) {
            flightRouteInput.value = flight;
        } else {
            flightRouteInput.value = "No flight scheduled for this date";
        }
    });
}

// Google Sheets form submission
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
        const date = formData.get('date');
        const route = formData.get('route');
        const roblox = formData.get('roblox');
        const discord = formData.get('discord');
        const notes = formData.get('notes') || 'No additional notes';
        
        // Check if flight is available
        if (route === "No flight scheduled for this date") {
            errorMsg.style.display = 'block';
            errorMsg.textContent = '✗ No flight available on the selected date. Please choose another date.';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Booking';
            setTimeout(() => {
                errorMsg.style.display = 'none';
            }, 5000);
            return;
        }
        
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
                    date: date,
                    route: route,
                    roblox: roblox,
                    discord: discord,
                    notes: notes
                })
            });
            
            successMsg.style.display = 'block';
            successMsg.textContent = '✓ Booking submitted successfully! We\'ll contact you soon on Discord.';
            form.reset();
            flightRouteInput.value = '';
            flightRouteInput.placeholder = 'Select a date first';
            
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
