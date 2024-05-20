export function getPost(dataPostID, currentPhotoIndex) {
    let transitionInProgress = false;

    let CCLeft = document.querySelector('.CC-Left-Images');
    let nextButton = document.querySelector('.next-button');
    let prevButton = document.querySelector('.prev-button');
    let PostFullName = document.querySelector('.Post-FullName');
    let PostProfilePic = document.querySelector('.Post-ProfilePic');
    let PostCaption = document.querySelector('.Post-Caption');
    let Commentbtncont = document.querySelector('.Comment-btn-cont');
    let CaptionContent = document.querySelector('.Caption-Content');
    let photos = [];

    var xhr = new XMLHttpRequest();

    xhr.open('GET', `/getCommentPost/${dataPostID}/`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.status === "success") {
                    photos = response.photos;
                    if (photos.length > 0) {
                        CCLeft.innerHTML = '';
                        photos.forEach(function (photo, index) {
                            var img = document.createElement('img');
                            img.src = photo.url;
                            img.style.display = index === currentPhotoIndex ? 'block' : 'none'; 
                            CCLeft.appendChild(img);
                        });
                        prevButton.style.display = currentPhotoIndex === 0 ? "none" : "flex";
                        nextButton.style.display = currentPhotoIndex === photos.length - 1 ? "none" : "flex";
                        Commentbtncont.style.justifyContent = photos.length > 1 ? (currentPhotoIndex === 1 ? "space-between" : (currentPhotoIndex === photos.length - 1 ? "flex-start" : "end")) : "space-between";

                        nextButton.addEventListener('click', showNextPhoto);
                        prevButton.addEventListener('click', showPrevPhoto);
                    } else {
                        nextButton.style.display = "none";
                        prevButton.style.display = "none";
                    }

                    let account = response.accountInfo;
                    PostFullName.innerHTML = account.firstname + " " + account.lastname;
                    PostProfilePic.src = account.profile_photo;

                    PostCaption.innerHTML = response.post.caption;
                }
            } else {
                console.error('Request failed. Returned status of ' + xhr.status);
            }
        }
    };

    function showNextPhoto() {
        if (!transitionInProgress && currentPhotoIndex < photos.length - 1) {
            transitionInProgress = true;
            currentPhotoIndex++;
            updateImageDisplay();
            setTimeout(() => {
                transitionInProgress = false;
            }, 500); 
        }
    }

    function showPrevPhoto() {
        if (!transitionInProgress && currentPhotoIndex > 0) {
            transitionInProgress = true;
            currentPhotoIndex--;
            updateImageDisplay();
            setTimeout(() => {
                transitionInProgress = false;
            }, 500); 
        }
    }

    function updateImageDisplay() {
        CCLeft.querySelectorAll('img').forEach((img, index) => {
            img.style.display = index === currentPhotoIndex ? 'flex' : 'none';
        });
        prevButton.style.display = currentPhotoIndex === 0 ? "none" : "flex";
        nextButton.style.display = currentPhotoIndex === photos.length - 1 ? "none" : "flex";
        Commentbtncont.style.justifyContent = photos.length > 1 ? (currentPhotoIndex === 1 ? "space-between" : (currentPhotoIndex === photos.length - 1 ? "flex-start" : "end")) : "space-between";

    }

    xhr.send();
}
