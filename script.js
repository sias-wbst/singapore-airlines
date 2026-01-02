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

const flightDateInput = document.getElementById('flightDate');
const flightRouteInput = document.getElementById('flightRoute');
const robloxInput = document.querySelector('input[name="roblox"]');

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


async function validateRobloxUsername(username) {
    if (!username || username.trim() === '') {
        return { valid: false, message: 'Username cannot be empty' };
    }

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbx3Cjwth2OWL592kOJf4bWmC8TkPFY-0luma-qGuTNYbnYI3jxWofJyaL_t-CarS01K2Q/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'validateUsername',
                username: username
            })
        });

        
        return { valid: true, message: '✓ Validation sent!' };
    } catch (error) {
        console.error('Validation error:', error);
        return { valid: true, message: '✓ Ready to submit' };
    }
}

if (robloxInput) {
    const validationDiv = document.createElement('div');
    validationDiv.id = 'robloxValidation';
    validationDiv.style.fontSize = '0.9em';
    validationDiv.style.marginTop = '5px';
    validationDiv.style.display = 'none';
    validationDiv.style.fontWeight = '600';
    robloxInput.parentElement.appendChild(validationDiv);

    let validationTimeout;

    robloxInput.addEventListener('input', async (e) => {
        const username = e.target.value.trim();
        validationDiv.style.display = username ? 'block' : 'none';
        validationDiv.textContent = '⏳ Checking...';
        validationDiv.style.color = '#666';
        robloxInput.style.borderColor = '#ddd';

        clearTimeout(validationTimeout);

        validationTimeout = setTimeout(async () => {
            if (username) {
                const result = await validateRobloxUsername(username);
                validationDiv.textContent = result.message;
                
                if (result.valid) {
                    validationDiv.style.color = '#4CAF50';
                    robloxInput.style.borderColor = '#4CAF50';
                    robloxInput.style.boxShadow = '0 0 8px rgba(76, 175, 80, 0.3)';
                } else {
                    validationDiv.style.color = '#f44336';
                    robloxInput.style.borderColor = '#f44336';
                    robloxInput.style.boxShadow = '0 0 8px rgba(244, 67, 54, 0.3)';
                }
                robloxInput.dataset.valid = result.valid;
            }
        }, 500);
    });

    robloxInput.addEventListener('focus', () => {
        if (robloxInput.style.borderColor && robloxInput.style.borderColor !== 'rgb(221, 221, 221)') {
            return;
        }
        robloxInput.style.borderColor = '#003a8f';
    });

    robloxInput.addEventListener('blur', () => {
        robloxInput.style.borderColor = '#ddd';
        robloxInput.style.boxShadow = 'none';
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
        const date = formData.get('date');
        const route = formData.get('route');
        const roblox = formData.get('roblox');
        const discord = formData.get('discord');
        const notes = formData.get('notes') || '';

        console.log('Form Data:', { date, route, roblox, discord, notes });

    
        if (!robloxInput.dataset.valid || robloxInput.dataset.valid === 'false') {
            const validation = await validateRobloxUsername(roblox);
            if (!validation.valid) {
                errorMsg.style.display = 'block';
                errorMsg.textContent = '✗ ' + validation.message + ' Please enter a valid Roblox username.';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Booking';
                setTimeout(() => {
                    errorMsg.style.display = 'none';
                }, 5000);
                return;
            }
        }

        if (!route || route.trim() === '' || route === 'Select a date first') {
            errorMsg.style.display = 'block';
            errorMsg.textContent = '✗ Please select a valid date first.';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Booking';
            setTimeout(() => {
                errorMsg.style.display = 'none';
            }, 5000);
            return;
        }

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

        const bookingKey = `bookings_${date}`;
        const currentCount = Number(localStorage.getItem(bookingKey)) || 0;

        if (currentCount >= 2) {
            errorMsg.style.display = 'block';
            errorMsg.textContent = '✗ Maximum of 2 flights can be booked for this date.';
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
            await fetch('https://script.google.com/macros/s/AKfycbx3Cjwth2OWL592kOJf4bWmC8TkPFY-0luma-qGuTNYbnYI3jxWofJyaL_t-CarS01K2Q/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    timestamp,
                    date,
                    route,
                    roblox,
                    discord,
                    notes
                })
            });

            successMsg.style.display = 'block';
            successMsg.textContent = '✓ Booking submitted successfully! We\'ll contact you soon on Discord.';

            localStorage.setItem(bookingKey, currentCount + 1);

            form.reset();
            flightRouteInput.value = '';
            flightRouteInput.placeholder = 'Select a date first';
            robloxInput.dataset.valid = 'false';
            document.getElementById('robloxValidation').style.display = 'none';

            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);

        } catch (error) {
            errorMsg.style.display = 'block';
            errorMsg.textContent = '✗ Error submitting booking. Please contact us on Discord.';
            console.error(error);
            setTimeout(() => {
                errorMsg.style.display = 'none';
            }, 5000);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Booking';
        }
    });
}
