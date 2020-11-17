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
            console.log('clicked');
            if (e.target && e.target.matches("li.item")) {
                inputCityZip.value = e.target.getAttribute('locationvalue');
                listCityZip.innerHTML = '';
            }
        });

    } else {
        listCityZip.innerHTML = '<ul><li>No location/s found!</li></ul>';
    }
}