// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");

  errorModal.classList.add("hidden"); // Add the .hidden class to hide the error modal initially

  // Helper function to toggle the heart state and class
  function toggleHeart(heart) {
    if (heart.textContent === EMPTY_HEART) {
      heart.textContent = FULL_HEART;
      heart.classList.add("activated-heart");
    } else {
      heart.textContent = EMPTY_HEART;
      heart.classList.remove("activated-heart");
    }
  }

  // Handle click events on the like buttons
  document.querySelectorAll(".like").forEach((likeButton) => {
    likeButton.addEventListener("click", (event) => {
      const heart = event.target.querySelector(".like-glyph");

      mimicServerCall()
        .then(() => {
          toggleHeart(heart);
        })
        .catch((error) => {
          errorModal.classList.remove("hidden");
          modalMessage.textContent = error;
          setTimeout(() => {
            errorModal.classList.add("hidden");
          }, 3000); // Hide the modal after 3 seconds
        });
    });
  });
});



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
