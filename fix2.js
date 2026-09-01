const fs = require('fs');

const indexContent = fs.readFileSync('index.html', 'utf-8');

const startJsMarker = '// Mobile Menu Toggle';
const endJsMarker = '</script>';
const startJsIdx = indexContent.indexOf(startJsMarker);
const endJsIdx = indexContent.indexOf(endJsMarker, startJsIdx);
const mobileMenuJs = indexContent.substring(startJsIdx, endJsIdx);

const jsToInject = `
    <script>
        ${mobileMenuJs}
    </script>
</body>`;

const files = ['contacto.html', 'equipos.html', 'microelectrolisis.html', 'ondas-de-choque.html', 'sobre-nosotros.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    if (!content.includes('// Mobile Menu Toggle')) {
        content = content.replace('</body>', jsToInject);
        fs.writeFileSync(file, content);
        console.log('Fixed ' + file);
    }
});
