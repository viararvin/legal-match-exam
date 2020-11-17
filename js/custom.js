const locations = [
    {
        "state": "XX",
        "city": "Nowheresville",
        "zip": "000000"
    },
    {
        "state": "NJ",
        "city": "Cherry Hill",
        "zip": "000001"
    },
    {
        "state": "AR",
        "city": "Little Rock",
        "zip": "000002"
    },
    {
        "state": "TX",
        "city": "Dallas",
        "zip": "000003"
    },
];

var listCityZip = document.getElementById('zipcity-list');
var inputCityZip = document.getElementById('txtZipCity');

inputCityZip.addEventListener("focus", inputFocusFunction, true);
inputCityZip.addEventListener("focusout", inputFocusOutFunction, true);
inputCityZip.addEventListener("keyup", inputKeyUp, true);

function inputFocusFunction () {
    listCityZip.classList.remove("hidden");
}

function inputFocusOutFunction() {
    var x = setTimeout(hideLocationsList, 200);
}

function hideLocationsList() {
    listCityZip.classList.add("hidden");
}

function inputKeyUp() {
    var searchVal = inputCityZip.value.toLowerCase();
    if (searchVal != '') {
        listCityZip.classList.remove("hidden");
        var result = locations.filter(item => {
            return item.city.toLowerCase().includes(searchVal) || item.zip.toLowerCase().includes(searchVal)
        });
        renderCityZipList(result);
    } else {
        listCityZip.innerHTML = '<ul><li>No location/s found!</li></ul>';
    }
}

function renderCityZipList(locations) {
    listCityZip.innerHTML = '';

    if (locations.length > 0) {
        let locationList = '<ul id="location-list">';
        locations.forEach(location => {
            locationList += '<li class="item" locationvalue="'+ location.city +' '+ location.state +', '+ location.zip +'">'+ location.city +' '+ location.state +' <span>'+ location.zip +'</span></li>'
        });
        locationList += '</ul>';
        listCityZip.innerHTML = locationList;

        document.getElementById("location-list").addEventListener("click",function(e) {
            if (e.target && e.target.matches("li.item")) {
                inputCityZip.value = e.target.getAttribute('locationvalue');
                listCityZip.innerHTML = '';
            }
        });

    } else {
        listCityZip.innerHTML = '<ul><li>No location/s found!</li></ul>';
    }
}


const reviews = [
    {
        "id": "1",
        "lawyer": {
            "avatar": "img/client-1.png",
            "name": "Mitchel M.",
            "category": "Automobile",
            "location": {
                "state": "NJ",
                "city": "Cherry Hill",
                "zip": "000001"
            }
        },
        "featuredReview": {
            "reviewer": "Arvin Viar",
            "date": "12/07/2019",
            "message": "Cras vitae ex molestie, tempus erat et, interdum est. Morbi eu libero malesuada odio tincidunt placerat vitae eget felis."
        }
    },
    {
        "id": "2",
        "lawyer": {
            "avatar": "img/client-2.png",
            "name": "Joel C.",
            "category": "Agencies",
            "location": {
                "state": "AR",
                "city": "Little Rock",
                "zip": "000002"
            }
        },
        "featuredReview": {
            "reviewer": "Michael Jordan",
            "date": "03/29/2017",
            "message": "Fusce sit amet malesuada lectus. Aenean eu egestas velit, a varius neque. Ut hendrerit accumsan molestie."
        }
    },
    {
        "id": "3",
        "lawyer": {
            "avatar": "img/client-3.png",
            "name": "Brigida R.",
            "category": "Family Law",
            "location": {
                "state": "XX",
                "city": "Nowheresville",
                "zip": "000000"
            }
        },
        "featuredReview": {
            "reviewer": "Dexter Marchal",
            "date": "06/10/2016",
            "message": "Mauris mattis vulputate laoreet. In rhoncus facilisis urna vitae hendrerit. Ut non fermentum nisi."
        }
    }
];

document.getElementById("client-reviews").addEventListener("click",function(e) {
    if (e.target && e.target.matches("article .link a.read-review")) {
        e.preventDefault();
        openReviewModal(e.target.getAttribute('reviewid'));
    }
});

document.getElementById("crm-close-btn").addEventListener("click",function(e) {
    closeReviewModal();
});

function openReviewModal(id) {
    var data = reviews.find(item => {
        return item.id === id;
    });

    setReviewData(data);

    var reviewModal = document.getElementById("client-review-modal");
    reviewModal.classList.remove('hidden');
}

function closeReviewModal() {
    var reviewModal = document.getElementById("client-review-modal");
    reviewModal.classList.add('hidden');
}

function setReviewData(data) {
    document.getElementById("avatar-img").src = data.lawyer.avatar;
    
    document.getElementById("info-name").innerHTML = data.lawyer.name;
    document.getElementById("info-location").innerHTML = data.lawyer.location.city +', '+ data.lawyer.location.state;
    document.getElementById("info-category").innerHTML = data.lawyer.category;

    document.getElementById("featured-review-author").innerHTML = data.featuredReview.reviewer;
    document.getElementById("featured-review-date").innerHTML = data.featuredReview.date;
    document.getElementById("featured-review-message").innerHTML = data.featuredReview.message;
}