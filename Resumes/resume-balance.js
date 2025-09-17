// Equilibrio vertical en layout 65/35
(function() {
    function balanceSections() {
        var source = document.querySelector('.auto-cols');
        if (!source) return;
        var sections = Array.from(source.querySelectorAll('.section'));
        if (sections.length === 0) return;

        // Crear nuevo contenedor 65/35
        var grid = document.createElement('div');
        grid.className = 'grid-65-35';
        var left = document.createElement('div');
        left.className = 'col col-65';
        var right = document.createElement('div');
        right.className = 'col col-35';
        grid.appendChild(left);
        grid.appendChild(right);

        // Reemplazar auto-cols por grid
        source.parentNode.replaceChild(grid, source);

        // Insertar secciones balanceando por altura acumulada
        var hL = 0, hR = 0;
        sections.forEach(function(sec) {
            sec.style.visibility = 'hidden';
            left.appendChild(sec);
            var h = sec.offsetHeight;
            left.removeChild(sec);
            sec.style.visibility = '';
            if (hL <= hR) { left.appendChild(sec); hL += h; }
            else { right.appendChild(sec); hR += h; }
        });
    }

    function rebalanceOnResize() {
        if (window.innerWidth <= 900) return; // evitar en móvil
        var container = document.querySelector('.grid-65-35');
        if (!container) return;
        var left = container.querySelector('.col-65');
        var right = container.querySelector('.col-35');
        var all = Array.from(container.querySelectorAll('.section'));
        // Reset
        all.forEach(function(sec){ sec.parentNode.removeChild(sec); });
        var hL = 0, hR = 0;
        all.forEach(function(sec){
            var probe = document.createElement('div');
            probe.style.position = 'absolute';
            probe.style.visibility = 'hidden';
            probe.style.width = (container.clientWidth * 0.65 - 24) + 'px';
            probe.appendChild(sec.cloneNode(true));
            document.body.appendChild(probe);
            var h = probe.offsetHeight;
            document.body.removeChild(probe);
            if (hL <= hR) { left.appendChild(sec); hL += h; }
            else { right.appendChild(sec); hR += h; }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', balanceSections);
    } else {
        balanceSections();
    }
    window.addEventListener('resize', rebalanceOnResize);
})();