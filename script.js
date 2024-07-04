let fields = [null, null, null, null, null, null, null, null, null];

// Funktion zum Rendern der Tabelle
function render() {
    var content = document.getElementById('content');
    content.innerHTML = ''; // Lösche den Inhalt des Containers

    var table = document.createElement('table');

    for (var i = 0; i < 3; i++) {
        var row = table.insertRow();
        for (var j = 0; j < 3; j++) {
            var cell = row.insertCell();
            var index = i * 3 + j;
            if (fields[index]) {
                cell.textContent = fields[index]; // X or O
            }
            cell.setAttribute('onclick', 'cellClicked(' + i + ',' + j + ')');
        }
    }

    content.appendChild(table);
}

function cellClicked(row, col) {
    var index = row * 3 + col;
    if (fields[index] === null) { // Überprüfen, ob das Feld leer ist
        fields[index] = currentPlayer; // Setze das aktuelle Symbol (X oder O)
        render(); // Aktualisiere die Anzeige
        checkGameStatus(); // Überprüfe den Spielstatus (Gewinn, Unentschieden)
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'; // Wechsle den aktuellen Spieler
    }
}

// Funktion, um den aktuellen Spieler zu bekommen (abwechselnd X und O)
function getCurrentPlayer() {
    return currentPlayer === 'X' ? 'X' : 'O';
}

// Initialisierung des aktuellen Spielers (startet mit X)
let currentPlayer = 'X';

function checkGameStatus() {
    // Mögliche Gewinnkombinationen (Indexe der Felder für horizontale, vertikale und diagonale Linien)
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Linien
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Linien
        [0, 4, 8], [2, 4, 6] // Diagonale Linien
    ];

    // Überprüfe alle möglichen Gewinnkombinationen
    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            alert(fields[a] + ' hat gewonnen!'); // Zeige eine Nachricht mit dem Gewinner an
            resetGame(); // Setze das Spiel zurück
            return;
        }
    }

    // Überprüfe auf Unentschieden (alle Felder sind belegt)
    if (fields.every(field => field !== null)) {
        alert('Unentschieden!'); // Zeige eine Nachricht für Unentschieden an
        resetGame(); // Setze das Spiel zurück
    }
}

// Funktion, um das Spiel zurückzusetzen
function resetGame() {
    fields = [null, null, null, null, null, null, null, null, null]; // Setze das fields Array zurück
    currentPlayer = 'X'; // Setze den aktuellen Spieler auf X zurück
    render(); // Aktualisiere die Anzeige
}