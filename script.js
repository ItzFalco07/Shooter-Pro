// 1. adding player

const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");
var NotGameOver = true;

var imgX = (canvas.width - 100) / 2;
var imgY = canvas.height - 100;
let totalKill = 0;

const img = new Image();
img.src = "./images/SpaceShip.png";

img.onload = () => {
  ctx.drawImage(img, imgX, imgY, 100, 100);
};

// 2. making movement of player

document.addEventListener("keydown", (e) => {
  if (NotGameOver) {
    if (e.key == "ArrowLeft" && imgX > 0) {
      ctx.clearRect(imgX, imgY, 100, 100);
      imgX -= 20;
      ctx.drawImage(img, imgX, imgY, 100, 100);
    }

    if (e.key == "ArrowRight" && imgX < 700) {
      ctx.clearRect(imgX, imgY, 100, 100);
      imgX += 20;
      ctx.drawImage(img, imgX, imgY, 100, 100);
    }
  }
});

// 3. adding shooting facility

document.addEventListener("keydown", (e) => {
  if (NotGameOver && e.key === " ") {
    console.log("Spacebar pressed");
    const audioBullet = new Audio("./audios/Fire.mp3");
    audioBullet.play();

    const bullet = new Image();
    bullet.src = "./images/Bullet.gif";

    bullet.onload = () => {
      let bulletX = imgX + 20; // Adjust position relative to spaceship
      let bulletY = imgY - 60; // Initial position above spaceship

      function animateBullet() {
        if (!NotGameOver) return; // Stop animation if game is over

        bulletY -= 10; // Adjust bullet speed as needed

        ctx.clearRect(bulletX, bulletY, 70, 70); // Clear previous frame
        ctx.drawImage(bullet, bulletX, bulletY, 60, 60); // Draw current frame

        // Check for collisions with aliens
        for (let i = 0; i < aliens.length; i++) {
          const alien = aliens[i];
          if (!alien.hit && bulletX < alien.x + alien.width && bulletX + 60 > alien.x && bulletY < alien.y + alien.height && bulletY + 60 > alien.y) {
            alien.hit = true;
            ctx.clearRect(alien.x, alien.y, alien.width, alien.height); // Clear the alien
            ctx.clearRect(bulletX, bulletY, 70, 70); // Clear the bullet
            const death = new Audio("./audios/deth.mp3");
            totalKill += 1;
            if (totalKill > 11) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              NotGameOver = false;
              triggerVictoryEvent(); // Trigger the game over event
            }
            death.play();
            return; // Stop the bullet animation
          }
        }

        if (bulletY > 0) {
          requestAnimationFrame(animateBullet); // Continue animation
        } else {
          ctx.clearRect(bulletX, bulletY, 70, 70); // Clear bullet when it goes out of canvas
        }
      }

      animateBullet(); // Start the animation loop

    };
  }
});

// 4. adding enimies

const alien = new Image();
alien.src = "./images/alien.png"
const aliens = [];
alien.onload = () => {
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 6; col++) {
      let alienX = col * 100;
      let alienY = row * 100;
      aliens.push({ x: alienX, y: alienY, width: 90, height: 90, hit: false });
      ctx.drawImage(alien, alienX, alienY, 90, 90);
    }
  }
}

// 5. adding logic of hitting fire with enemy

function allAliensDefeated() {
  return aliens.every(alien => alien.hit);
}

// 6. adding Game Over
const GameOverSound = new Audio('./audios/Game Over Sound.mp3');

function triggerVictoryEvent() {
    GameOverSound.play();
}
