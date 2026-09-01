const fs = require('fs');
const path = require('path');

const indexContent = fs.readFileSync('index.html', 'utf-8');

const startHtmlMarker = '<div class="md:hidden flex items-center">';
const endHtmlMarker = '</header>';
const startIdx = indexContent.indexOf(startHtmlMarker);
const endIdx = indexContent.indexOf(endHtmlMarker, startIdx);
const mobileMenuHtml = indexContent.substring(startIdx, endIdx);

const startJsMarker = '// Mobile Menu Toggle';
const endJsMarker = '</script>';
const startJsIdx = indexContent.indexOf(startJsMarker);
const endJsIdx = indexContent.indexOf(endJsMarker, startJsIdx);
const mobileMenuJs = indexContent.substring(startJsIdx, endJsIdx);

const files = fs.readdirSync('.');
files.forEach(file => {
    if (file.endsWith('.html') && file !== 'index.html' && file !== 'index_live.html') {
        let content = fs.readFileSync(file, 'utf-8');
        if (content.includes('id="mobileMenuBtn"')) return;
        
        console.log('Processing ' + file);
        
        // Find the block in the target file
        const tStartHtml = content.indexOf(startHtmlMarker);
        const tEndHtml = content.indexOf(endHtmlMarker, tStartHtml);
        if (tStartHtml !== -1 && tEndHtml !== -1) {
            const oldHtml = content.substring(tStartHtml, tEndHtml);
            content = content.replace(oldHtml, mobileMenuHtml);
        }
        
        // Find the JS block in the target file
        const tTargetJs = 'modal.addEventListener(\'click\', (e) => {\r\n            if (e.target === modal) closeModal();\r\n        });';
        const tTargetJs2 = 'modal.addEventListener(\'click\', (e) => {\n            if (e.target === modal) closeModal();\n        });';
        
        if (content.includes(tTargetJs)) {
            content = content.replace(tTargetJs, tTargetJs + '\r\n\r\n        ' + mobileMenuJs);
        } else if (content.includes(tTargetJs2)) {
            content = content.replace(tTargetJs2, tTargetJs2 + '\n\n        ' + mobileMenuJs);
        } else {
            console.log('Could not find JS target in ' + file);
        }
        
        fs.writeFileSync(file, content);
    }
});
console.log('Done!');
