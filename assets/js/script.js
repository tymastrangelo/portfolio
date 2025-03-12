document.addEventListener("DOMContentLoaded", function () {
    let transitionDiv = document.createElement("div");
    transitionDiv.classList.add("page-transition");
    document.body.appendChild(transitionDiv);

    // Ensure fade-in effect on page load
    setTimeout(() => {
        transitionDiv.classList.add("fade-out");
        setTimeout(() => {
            transitionDiv.style.display = "none";
        }, 300); // Fade duration
    }, 50);

    // Handle link transitions
    document.querySelectorAll("a").forEach(link => {
        if (link.getAttribute("target") !== "_blank") {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                let href = this.href;

                // Start fade-out transition
                transitionDiv.style.display = "block";
                setTimeout(() => {
                    transitionDiv.classList.remove("fade-out");

                    // Allow navigation AFTER transition completes
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300); // Matches the fade-out duration
                }, 50);
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-links a");
    const currentPage = window.location.pathname.split("/").pop(); // Get current file name

    navLinks.forEach(link => {
        if (link.getAttribute("href").includes(currentPage)) {
            link.classList.add("active"); // Apply active class to matching link
        }
    });
});