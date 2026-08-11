/* =============================================================================
PORTFOLIO — BIANCA PONTECCHIANI — JAVASCRIPT
=============================================================================
Este archivo tiene TODO el comportamiento "interactivo" del sitio: cosas
que suceden cuando el usuario hace algo (scrollear, cargar la página).

Son solo 2 funcionalidades, ninguna imprescindible para que el sitio
funcione (si este archivo no cargara, el sitio se vería y navegaría
igual, solo faltarían estos detalles):

1. Escribir el año actual en el pie de página automáticamente.
2. Efectos al hacer scroll:
a) Poner una línea debajo del menú cuando el usuario baja.
b) Hacer que las fotos (los recuadros placeholder) aparezcan
suavemente cuando entran en la pantalla, en vez de estar
todas visibles desde el principio.
============================================================================= */


/* -----------------------------------------------------------------------
1. AÑO AUTOMÁTICO EN EL FOOTER
-----------------------------------------------------------------------
En el HTML hay un <span id="year"></span> vacío. Acá lo completamos
con el año actual, para no tener que ir a mano al código cada
1 de enero a cambiar "© 2026" por "© 2027".
----------------------------------------------------------------------- */

// Buscamos en el HTML el elemento que tiene id="year"
const yearEl = document.getElementById('year');

// new Date() crea un objeto con la fecha/hora actual del dispositivo.
// .getFullYear() saca solo el año (ej: 2026).
// .textContent = ... escribe ese número adentro del <span>.
yearEl.textContent = new Date().getFullYear();


/* -----------------------------------------------------------------------
2a. LÍNEA DEBAJO DEL MENÚ AL HACER SCROLL
-----------------------------------------------------------------------
El menú de arriba es "fixed" (fijo, no se mueve aunque bajes la
página). Mientras estás arriba del todo, no tiene borde, para que se
funda con el hero. En cuanto el usuario baja aunque sea un poco,
le agregamos una clase CSS ("scrolled") que dibuja una línea fina
abajo del menú — así se distingue del contenido que pasa por detrás.
----------------------------------------------------------------------- */

// Buscamos el menú por su id="siteNav" (definido en index.html)
const nav = document.getElementById('siteNav');

// 'scroll' es un evento que el navegador dispara cada vez que el usuario
// se desplaza por la página (con el mouse, el trackpad, flechas, etc).
window.addEventListener('scroll', () => {

// window.scrollY = cuántos píxeles bajó el usuario desde arriba de todo.
// Si bajó más de 10px, el segundo argumento de classList.toggle es
// "true" y la clase "scrolled" se AGREGA. Si volvió a subir a menos
// de 10px, es "false" y la clase se SACA. Así el borde aparece y
// desaparece automáticamente según la posición del scroll.
nav.classList.toggle('scrolled', window.scrollY > 10);

}, { passive: true });
// "passive: true" es una optimización: le avisa al navegador que este
// código nunca va a "cancelar" el scroll, así el navegador puede hacer
// el desplazamiento más fluido (sobre todo en celulares).


/* -----------------------------------------------------------------------
2b. APARICIÓN SUAVE DE LAS FOTOS AL HACER SCROLL
-----------------------------------------------------------------------
Cada foto (cada div.ph) arranca invisible y un poco más abajo de su
posición final (eso está definido en styles.css, sección 8). Acá usamos
un "IntersectionObserver": una herramienta del navegador que avisa
automáticamente cuándo un elemento entra en la pantalla visible,
sin que tengamos que estar calculando posiciones a mano.

Cuando una foto entra en pantalla, le agregamos la clase "in-view",
que en el CSS la vuelve visible y la desliza a su posición normal.
----------------------------------------------------------------------- */

// Buscamos TODOS los elementos con la clase "ph" (todos los placeholders de fotos)
const items = document.querySelectorAll('.ph');

// No todos los navegadores muy viejos soportan IntersectionObserver,
// así que primero chequeamos que exista antes de usarlo.
if ('IntersectionObserver' in window) {

// Creamos el "observador": una función que se ejecuta cada vez que
// alguno de los elementos observados entra o sale de la pantalla.
const io = new IntersectionObserver((entries) => {

// "entries" es la lista de elementos que cambiaron su visibilidad.
// Recorremos cada uno:
entries.forEach((entry) => {

// entry.isIntersecting = true significa "este elemento ya es
// visible en la pantalla en este momento".
if (entry.isIntersecting) {

// Le agregamos la clase que dispara la animación de aparición (definida en el CSS)
entry.target.classList.add('in-view');

// Dejamos de observar esta foto en particular: ya cumplió su
// función (aparecer una vez) y así ahorramos recursos del navegador.
io.unobserve(entry.target);
}
});

}, {
threshold: 0.15, // Se considera "visible" cuando al menos el 15% del elemento entró en pantalla
rootMargin: '0px 0px -40px 0px' // Ajuste fino: la foto aparece un poquito antes de llegar al borde inferior real de la pantalla
});

// Le decimos al observador que vigile cada una de las fotos placeholder
items.forEach((el) => io.observe(el));

} else {
// Si el navegador es muy viejo y no soporta IntersectionObserver,
// mostramos todas las fotos de una vez (sin animación) para que el
// sitio nunca quede "roto" con fotos invisibles.
items.forEach((el) => el.classList.add('in-view'));
}
