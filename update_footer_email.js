const fs = require('fs');
const files = [
    'index.html', 'servicios.html', 'equipos.html', 'sobre-nosotros.html', 'contacto.html',
    'espolon-calcaneo.html', 'fascitis-plantar.html', 'descarga-muscular.html', 'esguince.html',
    'ondas-de-choque.html', 'microelectrolisis.html'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // Replace the link in the footer
        const targetLink = `<a href="#" onclick="openEmailModal(event)" class="text-slate-400 hover:text-white text-sm flex items-center transition-colors">
                        <span class="material-symbols-outlined text-[18px] mr-2 text-primary">mail</span> Contáctanos por correo
                    </a>`;
        const newLink = `<a href="mailto:contacto@centroeslava.pe" class="text-slate-400 hover:text-white text-sm flex items-center transition-colors">
                        <span class="material-symbols-outlined text-[18px] mr-2 text-primary">mail</span> contacto@centroeslava.pe
                    </a>`;
        
        if (content.includes(targetLink)) {
            content = content.replace(targetLink, newLink);
            modified = true;
        }

        // Remove the modal
        const modalStartIdx = content.indexOf('<!-- Modal de Contacto (Correo) -->');
        if (modalStartIdx !== -1) {
            // Find the end of the script for the modal
            const scriptEndIdx = content.indexOf('</script>', modalStartIdx);
            if (scriptEndIdx !== -1) {
                // Delete everything from modalStartIdx to scriptEndIdx + 9
                const before = content.substring(0, modalStartIdx);
                const after = content.substring(scriptEndIdx + 9);
                content = before + after;
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(file, content);
            console.log('Updated ' + file);
        }
    }
}
