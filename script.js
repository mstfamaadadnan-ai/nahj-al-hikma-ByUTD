// Sample of the massive data extracted from the PDF
const nahjData = [
    { type: 'khutab', text: "الْحَمْدُ لِلَّهِ الَّذِي لاَ يَبْلُغُ مِدْحَتَهُ الْقَائِلُونَ، وَلاَ يُحْصِي نَعْمَاءَهُ الْعَادُّونَ...", ref: "الخطبة 1" },
    { type: 'hikam', text: "الْعَجْزُ آفَةٌ، وَالصَّبْرُ شَجَاعَةٌ، وَالزُّهْدُ ثَرْوَةٌ، وَالْوَرَعُ جُنَّةٌ...", ref: "حكمة 4" },
    { type: 'rasail', text: "مِنَ الْوَالِدِ الْفَانِي، الْمُقِرِّ لِلزَّمَانِ... إِلَى الْمَوْلُودِ الْمُؤَمِّلِ مَا لاَ يُدْرِكُ...", ref: "من وصيته للحسن (ع)" },
    { type: 'hikam', text: "أَزْرَى بِنَفْسِهِ مَنِ اسْتَشْعَرَ الطَّمَعَ، وَرَضِيَ بِالذُّلِّ مَنْ كَشَفَ عَنْ ضُرِّهِ...", ref: "حكمة 1" },
    { type: 'hikam', text: "لِسَانُ الْعَاقِلِ وَرَاءَ قَلْبِهِ، وَقَلْبُ الأَحْمَقِ وَرَاءَ لِسَانِهِ...", ref: "حكمة 40" }
    // More entries continue here up to 1000...
];

let itemsShown = 12;

document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    showDaily();
    renderGrid(nahjData.slice(0, itemsShown));

    // Search Logic
    document.getElementById('search-input').oninput = (e) => {
        const filtered = nahjData.filter(d => d.text.includes(e.target.value));
        renderGrid(filtered);
    };

    // Load More Logic
    document.getElementById('load-more-btn').onclick = () => {
        itemsShown += 12;
        renderGrid(nahjData.slice(0, itemsShown));
    };

    // Scrolling Progress
    window.onscroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("progress-bar").style.width = scrolled + "%";
    };
});

function setupTheme() {
    document.getElementById('theme-toggle').onclick = () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };
}

function renderGrid(data) {
    const grid = document.getElementById('quotes-grid');
    grid.innerHTML = data.map(item => `
        <div class="quote-card">
            <p>${item.text}</p>
            <div class="card-footer">
                <span class="tag">${item.type}</span>
                <small>${item.ref}</small>
            </div>
        </div>
    `).join('');
}

function showDaily() {
    const random = nahjData[Math.floor(Math.random() * nahjData.length)];
    document.getElementById('daily-text').innerText = random.text;
    document.getElementById('daily-source').innerText = random.ref;
}
