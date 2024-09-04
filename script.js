const { app, BrowserWindow } = require('electron');
let loggedIn = false;
let username = ""; // Hier könnten Benutzernamen und Passwörter gespeichert werden (z.B. in einem Array oder Objekt)
let timeEntries = [];

document.getElementById('registerBtn').addEventListener('click', function() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    // Hier könnten weitere Überprüfungen erfolgen, z.B. ob der Benutzername bereits vorhanden ist
    username = newUsername;
    loggedIn = true;
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('timeTrackingContainer').style.display = 'block';
});

document.getElementById('loginBtn').addEventListener('click', function() {
    const inputUsername = document.getElementById('username').value;
    const inputPassword = document.getElementById('password').value;
    if (username === inputUsername && inputPassword === 'password') { // Hier sollte eine sichere Überprüfung erfolgen, dies ist nur ein einfaches Beispiel
        loggedIn = true;
        document.getElementById('registerContainer').style.display = 'none';
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('timeTrackingContainer').style.display = 'block';
    } else {
        alert('Ungültige Anmeldeinformationen.');
    }
});

document.getElementById('clockInBtn').addEventListener('click', function() {
    if (!loggedIn) {
        alert('Bitte zuerst einloggen.');
        return;
    }
    clockIn();
});

document.getElementById('clockOutBtn').addEventListener('click', function() {
    if (!loggedIn) {
        alert('Bitte zuerst einloggen.');
        return;
    }
    clockOut();
});

function clockIn() {
    timeEntries.push({ type: 'clock_in', time: new Date() });
}

function clockOut() {
    timeEntries.push({ type: 'clock_out', time: new Date() });
    updateTotalHours();
}

function updateTotalHours() {
    let totalHours = 0;
    for (let i = 0; i < timeEntries.length; i += 2) {
        if (i + 1 < timeEntries.length && timeEntries[i].type === 'clock_in' && timeEntries[i + 1].type === 'clock_out') {
            totalHours += (timeEntries[i + 1].time - timeEntries[i].time) / 1000 / 60 / 60; // Convert milliseconds to hours
        }
    }
    document.getElementById('totalHours').textContent = 'Gesamtstunden: ' + totalHours.toFixed(2);
}

