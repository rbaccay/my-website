document.addEventListener("DOMContentLoaded", () => {

    /* ===== ENTER PORTAL (PAGE 1) ===== */
    const nameInput = document.getElementById("studentName");
    const enterBtn = document.getElementById("enterPortalBtn");

    if (nameInput && enterBtn) {
        enterBtn.onclick = () => {
            if (!nameInput.value.trim()) {
                alert("Enter your name");
                return;
            }
            localStorage.setItem("studentName", nameInput.value.trim());
            window.location.href = "SecondPage.html";
        };
    }

    /* ===== GREETING ===== */
    const greeting = document.getElementById("greeting");
    const changeGreetingBtn = document.getElementById("changeGreetingBtn");

    if (greeting) {
        const name = localStorage.getItem("studentName") || "Student";

        const greetings = [
            `Mabuhay, ${name}! 🎓`,
            `Explore, Discover, and Enjoy, ${name}!`,
            `Your journey starts here, ${name}!`,
            `You're great, ${name}!`,
            `Welcome, ${name}! 👋`,
            `We are proud of you, ${name}! 🌞`
        ];

        let index = Number(localStorage.getItem("greetingIndex")) || 0;
        greeting.textContent = greetings[index];

        if (changeGreetingBtn) {
            changeGreetingBtn.onclick = () => {
                index = (index + 1) % greetings.length;
                greeting.textContent = greetings[index];
                localStorage.setItem("greetingIndex", index);
            };
        }
    }

    /* ===== SAVE LAST LESSON ===== */
    document.querySelectorAll("[data-lesson]").forEach(link => {
        link.onclick = () => {
            localStorage.setItem("lastLesson", link.dataset.lesson);
        };
    });

    /* ===== RESUME BUTTON ===== */
    const resumeBox = document.getElementById("resumeBox");
    const lastLesson = localStorage.getItem("lastLesson");

    if (resumeBox && lastLesson) {
        resumeBox.innerHTML = `<button>Resume ${lastLesson}</button>`;
        resumeBox.querySelector("button").onclick =
            () => window.location.href = lastLesson + ".html";
    }

    /* ===== BREADCRUMB ===== */
    const breadcrumb = document.getElementById("breadcrumb");
    if (breadcrumb) {
        breadcrumb.innerHTML = `<a href="index.html">Home</a> > ${document.title}`;
    }

    /* ===== COMPLETION ===== */
    const completeBtn = document.getElementById("completeLessonBtn");
    if (completeBtn) {
        const key = completeBtn.dataset.lesson + "Completed";

        if (localStorage.getItem(key)) {
            completeBtn.textContent = "Completed";
            completeBtn.disabled = true;
        }

        completeBtn.onclick = () => {
            localStorage.setItem(key, "true");
            completeBtn.textContent = "Completed";
            completeBtn.disabled = true;
        };
    }

    /* ===== STATUS BADGES ===== */
    ["lesson1", "lesson2", "lesson3"].forEach(l => {
        const el = document.getElementById(l + "Status");
        if (el && localStorage.getItem(l + "Completed")) {
            el.textContent = " ✓ COMPLETED";
        }
    });

    /* ===== SEARCH DOCUMENTS ===== */
    const searchInput = document.getElementById("searchDocs");
    const docList = document.getElementById("docList");

    if (searchInput && docList) {
        searchInput.addEventListener("input", () => {
            const keyword = searchInput.value.toLowerCase();
            const docs = docList.getElementsByTagName("li");

            Array.from(docs).forEach(li => {
                const text = li.textContent.toLowerCase();
                li.style.display = text.includes(keyword) ? "" : "none";
            });
        });
    }

    /* ===== DAY / NIGHT MODE ===== */
    const toggleThemeBtn = document.getElementById("toggleThemeBtn");
    const body = document.body;

    // load saved theme
    const savedTheme = localStorage.getItem("theme") || "day";
    body.classList.add(savedTheme);

    if (toggleThemeBtn) {
        toggleThemeBtn.textContent = savedTheme === "night" ? "🌞 Day Mode" : "🌙 Night Mode";

        toggleThemeBtn.onclick = () => {
            body.classList.toggle("night");
            body.classList.toggle("day");

            const isNight = body.classList.contains("night");
            localStorage.setItem("theme", isNight ? "night" : "day");
            toggleThemeBtn.textContent = isNight ? "🌞 Day Mode" : "🌙 Night Mode";
        };
    }

});
