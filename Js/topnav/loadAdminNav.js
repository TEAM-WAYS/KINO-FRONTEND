    function loadTopNavigation() {
    const navContainer = document.getElementById('topNavContainer');
    const xhr = new XMLHttpRequest();

    xhr.open('GET', '../topnav/adminNav.html', true);

    xhr.onload = function () {
    if (xhr.status === 200) {
    navContainer.innerHTML = xhr.responseText;
}
};

    xhr.send();
}

    window.addEventListener('DOMContentLoaded', loadTopNavigation);