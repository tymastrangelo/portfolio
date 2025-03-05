document.addEventListener("DOMContentLoaded", function () {
    let transitionDiv = document.createElement("div");
    transitionDiv.classList.add("page-transition");
    document.body.appendChild(transitionDiv);

    // Ensure fade-in effect happens properly
    setTimeout(() => {
        transitionDiv.classList.add("fade-out");
        setTimeout(() => {
            transitionDiv.style.display = "none";
        }, 500); // Slightly longer fade time to avoid cutoff
    }, 50);

    // Handle link transitions
    document.querySelectorAll("a").forEach(link => {
        if (link.getAttribute("target") !== "_blank") {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                let href = this.href;

                // Prevent double-clicking from triggering issues
                if (transitionDiv.style.display === "block") return;

                transitionDiv.style.display = "block";
                setTimeout(() => {
                    transitionDiv.classList.remove("fade-out");
                    setTimeout(() => {
                        window.location.href = href;
                    }, 500); // Ensures fade completes before navigating
                }, 50);
            });
        }
    });
});