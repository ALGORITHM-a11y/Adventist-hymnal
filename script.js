// script.js

// Function to load hymns from hymns.json
async function loadHymns() {
    const response = await fetch('hymns.json');
    const hymns = await response.json();
    displayHymns(hymns);
}

// Function to display hymns
function displayHymns(hymns) {
    const hymnContainer = document.getElementById('hymn-container');
    hymnContainer.innerHTML = '';
    hymns.forEach(hymn => {
        const hymnDiv = document.createElement('div');
        hymnDiv.classList.add('hymn');
        hymnDiv.innerHTML = `
            <h3>${hymn.title} (Number: ${hymn.number})</h3>
            <p><strong>Author:</strong> ${hymn.author}</p>
            <p><strong>Composer:</strong> ${hymn.composer}</p>
            <p><strong>Reference:</strong> ${hymn.scripture_reference}</p>
            <div class='bilingual'>
                <div class='english'>${hymn.english_text}</div>
                <div class='twi'>${hymn.twi_text}</div>
            </div>
        `;
        hymnContainer.appendChild(hymnDiv);
    });
}

// Function to search hymns by number or title
function searchHymns() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const hymnDivs = document.querySelectorAll('.hymn');
    hymnDivs.forEach(hymnDiv => {
        const title = hymnDiv.querySelector('h3').textContent.toLowerCase();
        const number = hymnDiv.querySelector('h3').textContent.match(/\d+/)[0];
        if (title.includes(query) || number.includes(query)) {
            hymnDiv.style.display = '';
        } else {
            hymnDiv.style.display = 'none';
        }
    });
}

// Event listeners for search functionality
document.getElementById('search-input').addEventListener('input', searchHymns);

// Load hymns on page load
window.onload = loadHymns();
