// Loader script for header/footer components
(function(){
    async function fetchText(path){
        try{
            const res = await fetch(path, {cache: 'no-cache'});
            if(!res.ok) return '';
            return await res.text();
        }catch(e){
            console.warn('Could not load', path, e);
            return '';
        }
    }

    async function insertComponent(id, path){
        const el = document.getElementById(id);
        if(!el) return;
        const html = await fetchText(path);
        if(html) el.innerHTML = html;
    }

    document.addEventListener('DOMContentLoaded', async function(){
        await Promise.all([
            insertComponent('site-header','/components/header-main.html'),
            insertComponent('site-footer','/components/footer-main.html')
        ]);

        // After header is injected, load header behavior script if present
        const headerScriptPath = '/js/header.js';
        try{
            const s = document.createElement('script');
            s.src = headerScriptPath;
            s.defer = false;
            document.body.appendChild(s);
        }catch(e){
            console.warn('Failed to append header script', e);
        }
    });
})();
