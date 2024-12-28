function generatePasswordFromPhrase(userPhrase) {
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
    const numbers = "0123456789";

    function insertRandomNumber(word) {
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
        const position = Math.floor(Math.random() * (word.length + 1));
        return word.slice(0, position) + randomNumber + word.slice(position);
    }

    function insertRandomSymbol(word) {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const position = Math.floor(Math.random() * (word.length + 1));
        return word.slice(0, position) + randomSymbol + word.slice(position);
    }

    function randomizeCase(word) {
        return word
            .split("")
            .map((char) => (Math.random() > 0.5 ? char.toUpperCase() : char))
            .join("");
    }

    const words = userPhrase.split(" ").map((word, index) => {
        let transformedWord = randomizeCase(word);
        if (index % 2 === 0) {
            transformedWord = insertRandomSymbol(transformedWord);
        } else {
            transformedWord = insertRandomNumber(transformedWord);
        }
        return transformedWord;
    });

    let password = words.join("");

    while ((password.match(/\d/g) || []).length < 2) {
        password += numbers[Math.floor(Math.random() * numbers.length)];
    }

    while (password.length < 12) {
        password += symbols[Math.floor(Math.random() * symbols.length)];
    }

    return password;
}

document.getElementById("passwordForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario recargue la página

    const userPhrase = document.getElementById("frase").value; // Obtener el valor ingresado
    const generatedPassword = generatePasswordFromPhrase(userPhrase); // Generar contraseña

    // Mostrar la contraseña generada en la página
    document.getElementById("generatedPassword").textContent = generatedPassword;
});