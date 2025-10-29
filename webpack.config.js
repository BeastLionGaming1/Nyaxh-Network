const scripts = [
  '/script.js',
  '/dropdown.js',
  '/money.js'
]

scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false; // Maintain execution order
    document.body.appendChild(script);
});
