document.addEventListener('DOMContentLoaded', () => {

    // modals
    const modals = document.querySelectorAll('.modal');
  
    document.querySelectorAll('.proj-button').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        document.getElementById(modalId).style.display = "block";
      });
    });
  
    document.querySelectorAll('.close').forEach(span => {
      span.addEventListener('click', () => {
        span.closest('.modal').style.display = 'none';
      });
    });
  
    window.addEventListener('click', (event) => {
      modals.forEach(modal => {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });
    });
  
    // img gallery
    document.querySelectorAll('.left-side').forEach(pic => {
      const images = JSON.parse(pic.dataset.images);
      let currentIndex = 0;
    
      const imgElement = pic.querySelector('.current-img');
      const nextBtn = pic.querySelector('.next');
      const prevBtn = pic.querySelector('.prev');
    
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        imgElement.src = images[currentIndex];
      });
    
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        imgElement.src = images[currentIndex];
      });
    });

    // drop-out card, song gacha
    document.getElementById('roll-btn').addEventListener('click', async () => {
      try {
          // Fetch a random calm song from Flask
          const response = await fetch('/api/gacha');
          const song = await response.json();
  
          if (response.ok) {
              // Populate the drop-out card with song data
              document.getElementById('gacha-img').src = song.album_art_url;
              document.getElementById('gacha-title').textContent = song.title;
              document.getElementById('gacha-artist').textContent = song.artist;
              document.getElementById('gacha-link').href = song.spotify_url;
  
              // Reveal the card (remove the 'hidden' class)
              document.getElementById('gacha-card').classList.remove('hidden');
              
              // Optional: Add a simple slide/pop effect if desired
          } else {
              alert(song.error);
          }
      } catch (err) {
          console.error("Failed to pull gacha:", err);
      }
  });

  document.getElementById('pixel-btn').addEventListener('click', async () => {
    const response = await fetch('/api/pixel-art');
    const data = await response.json();

    // Inject the raw SVG string directly into the webpage
    document.getElementById('art-container').innerHTML = data.svg;
  });
});