function toggleFavourites(sku, id, price, name, imageURL) {
    try {
        // Check if user is logged in
        var memberEmail = sessionStorage.getItem('memberEmail');
        if (memberEmail != null && memberEmail != '') {
            var heartIcon = document.getElementById('heart-' + sku);
            var favouritesKey = 'favourites-' + memberEmail; // Sets a unique key for each user
            var favourites = JSON.parse(localStorage.getItem(favouritesKey)) || {};

            if (heartIcon && heartIcon.classList.contains('filled-heart')) {
                // Unfill the heart and remove from favourites
                heartIcon.classList.remove('filled-heart', 'fas');
                heartIcon.classList.add('far');
                delete favourites[sku];
            } else if (heartIcon) {
                // Fill the heart and add to favourites
                heartIcon.classList.add('filled-heart', 'fas');
                heartIcon.classList.remove('far');
                favourites[sku] = { id, sku, price, name, imgURL: imageURL };
            } else {
                // Handle case for removing from favourites page
                if (favourites[sku]) {
                    delete favourites[sku];
                } else {
                    favourites[sku] = { id, sku, price, name, imgURL: imageURL };
                }
            }

            // Update localStorage for this user
            localStorage.setItem(favouritesKey, JSON.stringify(favourites));
            window.location.reload();
        } else {
            alert('Please login to add to favourites.');
            window.location.href = 'memberLogin.html';
        }
    } catch (error) {
        console.error('Error toggling favourites:', error);
    }
}

// Set the initial state of hearts based on localStorage for this user
function initializeFavouriteHearts() {
    var memberEmail = sessionStorage.getItem('memberEmail');
    if (memberEmail != null && memberEmail != '') {
        var favouritesKey = 'favourites-' + memberEmail; // Unique key for each user
        var favourites = JSON.parse(localStorage.getItem(favouritesKey)) || {};
        for (var sku in favourites) {
            var heartIcon = document.getElementById('heart-' + sku);
            if (heartIcon) {
                heartIcon.classList.add('filled-heart', 'fas');
                heartIcon.classList.remove('far');
            }
        }
    }
}
