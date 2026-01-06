const quotes = [
    { id: 1, topic: "العلم", text: "كُلُّ وِعَاءٍ يَضِيقُ بِمَا جُعِلَ فِيهِ إِلاَّ وِعَاءَ الْعِلْمِ، فَإِنَّهُ يَتَّسِعُ بِهِ.", source: "نهج البلاغة" },
    { id: 2, topic: "الأخلاق", text: "أَكْرَمُ الْحَسَبِ حُسْنُ الْخُلُقِ.", source: "نهج البلاغة" },
    { id: 3, topic: "الصبر", text: "الصَّبْرُ صَبْرَانِ: صَبْرٌ عَلَى مَا تَكْرَهُ، وَصَبْرٌ عَمَّا تُحِبُّ.", source: "غرر الحكم" },
    { id: 4, topic: "العدل", text: "العَدلُ حَياةُ الأَحكامِ.", source: "غرر الحكم" },
    { id: 5, topic: "العمل", text: "قيمة كل امرئ ما يحسنه.", source: "نهج البلاغة" },
    { id: 6, topic: "الزهد", text: "الزُّهْدُ كُلُّهُ بَيْنَ كَلِمَتَيْنِ مِنَ الْقُرْآنِ: لِكَيْلا تَأْسَوْا عَلى ما فاتَكُمْ وَلا تَفْرَحُوا بِما آتاكُمْ.", source: "نهج البلاغة" },
    { id: 7, topic: "الصحبة", text: "لاَ يَكُونُ الصَّدِيقُ صَدِيقاً حَتَّى يَحْفَظَ أَخَاهُ فِي ثَلاَثٍ: فِي نَكْبَتِهِ، وَغَيْبَتِهِ، وَوَفَاتِهِ.", source: "نهج البلاغة" },
    { id: 8, topic: "التواضع", text: "تَمامُ الإحسانِ التَّواضُعُ.", source: "غرر الحكم" },
    { id: 9, topic: "اللسان", text: "لِسَانُ الْعَاقِلِ وَرَاءَ قَلْبِهِ، وَقَلْبُ الأَحْمَقِ وَرَاءَ لِسَانِهِ.", source: "نهج البلاغة" },
    { id: 10, topic: "الفقر", text: "الْفَقْرُ الْمَوْتُ الْأَكْبَرُ.", source: "نهج البلاغة" },
    { id: 11, topic: "المرأة", text: "المرأة ريحانة وليست بقهرمانة.", source: "نهج البلاغة" },
    { id: 12, topic: "الشجاعة", text: "الجرأة على المعاصي من لؤم الطباع.", source: "غرر الحكم" },
    { id: 13, topic: "الاستقامة", text: "الاستقامة خير زاد.", source: "غرر الحكم" }
];

let favorites = JSON.parse(localStorage.getItem('ali_favs')) || [];

document.addEventListener('DOMContentLoaded', () => {
    populateTopics();
    setDailyQuote();
    renderQuotes(quotes);
    
    document.getElementById('theme-toggle').onclick = () => {
        document.body.classList.toggle('dark-theme');
    };
    document.getElementById('search-input').oninput = filterQuotes;
    document.getElementById('topic-filter').onchange = filterQuotes;
});

function populateTopics() {
    const select = document.getElementById('topic-filter');
    const topics = [...new Set(quotes.map(q => q.topic))];
    topics.forEach(t => {
        let opt = new Option(t, t);
        select.add(opt);
    });
}

function setDailyQuote() {
    const daily = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('daily-text').textContent = daily.text;
    document.getElementById('daily-source').textContent = `— ${daily.source}`;
}

function renderQuotes(data) {
    const container = document.getElementById('quotes-container');
    container.innerHTML = '';
    data.forEach(q => {
        const card = document.createElement('div');
        card.className = 'quote-card';
        card.innerHTML = `
            <p class="quote-text">${q.text}</p>
            <div class="actions">
                <button class="btn-icon" onclick="speak('${q.text}')">🔊</button>
                <button class="btn-icon" onclick="share('${q.text}')">📱</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterQuotes() {
    const term = document.getElementById('search-input').value;
    const topic = document.getElementById('topic-filter').value;
    const filtered = quotes.filter(q => 
        q.text.includes(term) && (topic === 'all' || q.topic === topic)
    );
    renderQuotes(filtered);
}

function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ar-SA';
    window.speechSynthesis.speak(u);
}

function share(text) {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
}
