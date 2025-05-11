document.addEventListener("DOMContentLoaded", () => {
  fetch("src/data/videos.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("videoContainer");

      data.forEach((videoData) => {
        const reel = document.createElement("div");
        reel.className = "reel relative flex flex-col items-center justify-center";

        const video = document.createElement("video");
        video.className = "w-full h-screen object-cover";
        video.setAttribute("muted", "");
        video.setAttribute("loop", "");
        video.setAttribute("playsinline", "");
        video.src = videoData.src;

        // Transparent play icon
        const icon = document.createElement("div");
        icon.className = "absolute text-white text-6xl opacity-0 transition-opacity duration-300 pointer-events-none";
        icon.innerHTML = "⏸️"; // or "▶️" based on your preference
        icon.style.top = "50%";
        icon.style.left = "50%";
        icon.style.transform = "translate(-50%, -50%)";

        // Toggle on video click
        video.addEventListener("click", () => {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
            icon.classList.add("opacity-100");
            setTimeout(() => icon.classList.remove("opacity-100"), 600);
          }
        });

        const link = document.createElement("a");
        link.href = videoData.productLink;
        link.target = "_blank";
        link.className = `absolute bottom-8 ${
          videoData.platform === "Amazon" ? "bg-yellow-400 text-black" : "bg-blue-500 text-white"
        } py-2 px-4 rounded hover:opacity-90`;
        link.textContent = `Buy on ${videoData.platform}`;

        reel.appendChild(video);
        reel.appendChild(icon);
        reel.appendChild(link);
        container.appendChild(reel);
      });

      // Auto-play current video only
      const videos = document.querySelectorAll("video");
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
              video.play();
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.75 }
      );

      videos.forEach(video => observer.observe(video));
    });
});
