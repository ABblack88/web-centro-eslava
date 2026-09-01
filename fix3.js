const fs = require('fs');

const oldButton = `<button id="mobileMenuBtn" class="text-slate-500 hover:text-slate-900 focus:outline-none"><span
                            class="material-symbols-outlined text-3xl">menu</span></button>`;
                            
const newButton = `<button id="mobileMenuBtn" class="text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 active:scale-95 rounded-lg p-1 focus:outline-none transition-all duration-200"><span
                            class="material-symbols-outlined text-3xl">menu</span></button>`;

const files = fs.readdirSync('.');
files.forEach(file => {
    if (file.endsWith('.html') && file !== 'index_live.html') {
        let content = fs.readFileSync(file, 'utf-8');
        if (content.includes(oldButton)) {
            content = content.replace(oldButton, newButton);
            fs.writeFileSync(file, content);
            console.log('Updated ' + file);
        } else {
            // Might have slight spacing differences
            const startMarker = '<button id="mobileMenuBtn"';
            const endMarker = '</span></button>';
            const startIdx = content.indexOf(startMarker);
            if (startIdx !== -1) {
                const endIdx = content.indexOf(endMarker, startIdx) + endMarker.length;
                const currentButton = content.substring(startIdx, endIdx);
                content = content.replace(currentButton, newButton);
                fs.writeFileSync(file, content);
                console.log('Updated (fuzzy) ' + file);
            }
        }
    }
});
