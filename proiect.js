// Selecteaza elementele canvas si input ascuns
const canvas = document.querySelector('#inputCanvas');
const hiddenInput = document.querySelector('#hiddenInput');

// Redimensioneaza canvasul pentru a umple intreaga latime a paginii
canvas.width = window.innerWidth;

// Obtine contextul canvasului
const ctx = canvas.getContext('2d');

// Deseneaza fundalul gri pe canvas
ctx.fillStyle = 'gray';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Seteaza proprietatile textului pentru contextul canvasului
ctx.font = '24px sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillStyle = 'black';

// Deseneaza textul mesajului pe canvas
ctx.fillText('Enter your email to receive newsletters:', canvas.width / 2, canvas.height / 2);

// Creeaza elementul mesaj de eroare
const errorMessage = document.createElement('div');
errorMessage.style.color = 'red';
errorMessage.style.display = 'none';
document.body.appendChild(errorMessage);

// Trateaza evenimentul click pe canvas
canvas.addEventListener('click', () => {
    // Pune focus pe elementul input ascuns
    hiddenInput.focus();
});

// Trateaza evenimentul keydown pe elementul input ascuns
hiddenInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        // Valideaza adresa de email introdusa folosind o expresie regulata
        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/;
        if (emailRegex.test(hiddenInput.value)) {
            console.log('Valid email address');
            // Trimite adresa de email introdusa
            console.log(`Email submitted: ${hiddenInput.value}`);
            // Stocheaza adresa de email introdusa intr-un array in localStorage
            let emails = JSON.parse(localStorage.getItem('emails')) || [];
            emails.push(hiddenInput.value);
            localStorage.setItem('emails', JSON.stringify(emails));
            // Ascunde mesajul de eroare
            errorMessage.style.display = 'none';
        } else {
            console.log('Invalid email address');
            // Afiseazã mesajul de eroare ca text pe pagina
            errorMessage.textContent = 'Invalid email address';
            errorMessage.style.display = 'block';
            // Sterge mesajul de eroare dupa 30 de secunde folosind setTimeout
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 30000);
        }
    }
});

// Stocheaza textul introdus in localStorage cand parasesti pagina
window.addEventListener('beforeunload', () => {
    localStorage.setItem('inputText', hiddenInput.value);
});

// Preia textul introdus din localStorage cand incarci pagina
window.addEventListener('load', () => {
    const storedInputText = localStorage.getItem('inputText');
    if (storedInputText) {
        hiddenInput.value = storedInputText;
    }
});

// Schimba culoarea de fundal a canvasului in mod aleatoriu la fiecare secunda folosind setInterval si Math.random
setInterval(() => {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    canvas.style.backgroundColor = randomColor;
}, 1000);

// Adauga buton pe pagina pentru a schimba culoarea textului mesajului pe canvas folosind classList si getComputedStyle
const button = document.createElement('button');
button.textContent = 'Party Mode';
button.addEventListener('click', () => {
    if (canvas.classList.contains('red-text')) {
        canvas.classList.remove('red-text');
        const color = getComputedStyle(canvas).color;
        ctx.fillStyle = color;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText('Enter your email to receive newsletters:', canvas.width / 2, canvas.height / 2);
    } else {
        canvas.classList.add('red-text');
        const color = getComputedStyle(canvas).color;
        ctx.fillStyle = color;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText('Enter your email to receive newsletters:', canvas.width / 2, canvas.height / 2);
    }
});
document.body.appendChild(button);

// Adauga stil pentru clasa red-text in josul paginii
const style = document.createElement('style');
style.textContent = '.red-text { color: red; }';
document.head.appendChild(style);