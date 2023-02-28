// Caesar Cipher
function caesarCipher(input, shift) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let output = "";
    for (let i = 0; i < input.length; i++) {
        let char = input.charAt(i);
        if (alphabet.includes(char.toUpperCase())) {
            let charIndex = alphabet.indexOf(char.toUpperCase());
            let shiftedIndex = (charIndex + shift) % 26;
            if (char === char.toLowerCase()) {
                output += alphabet.charAt(shiftedIndex).toLowerCase();
            } else {
                output += alphabet.charAt(shiftedIndex);
            }
        } else {
            output += char;
        }
    }
    return output;
}

// Playfair Cipher
function playfairCipher(input, keyword) {
    // Step 1: Generate Playfair square
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // omitting J
    let playfairSquare = "";
    for (let i = 0; i < keyword.length; i++) {
        let char = keyword.charAt(i).toUpperCase();
        if (alphabet.includes(char) && !playfairSquare.includes(char)) {
            playfairSquare += char;
        }
    }
    for (let i = 0; i < alphabet.length; i++) {
        let char = alphabet.charAt(i);
        if (!playfairSquare.includes(char)) {
            playfairSquare += char;
        }
    }
    // Step 2: Prepare input
    let preparedInput = "";
    for (let i = 0; i < input.length; i++) {
        let char = input.charAt(i).toUpperCase();
        if (alphabet.includes(char)) {
            preparedInput += char;
        }
    }
    if (preparedInput.length % 2 === 1) {
        preparedInput += "X"; // add padding if necessary
    }
    // Step 3: Encrypt pairs of letters
    let output = "";
    for (let i = 0; i < preparedInput.length; i += 2) {
        let char1 = preparedInput.charAt(i);
        let char2 = preparedInput.charAt(i + 1);
        let row1 = Math.floor(playfairSquare.indexOf(char1) / 5);
        let col1 = playfairSquare.indexOf(char1) % 5;
        let row2 = Math.floor(playfairSquare.indexOf(char2) / 5);
        let col2 = playfairSquare.indexOf(char2) % 5;
        if (row1 === row2) {
            output += playfairSquare.charAt(row1 * 5 + (col1 + 1) % 5);
            output += playfairSquare.charAt(row2 * 5 + (col2 + 1) % 5);
        } else if (col1 === col2) {
            output += playfairSquare.charAt(((row1 + 1) % 5) * 5 + col1);
            output += playfairSquare.charAt(((row2 + 1) % 5) * 5 + col2);
        } else {
            output += playfairSquare.charAt(row1 * 5 + col2);
            output += playfairSquare.charAt(row2 * 5 + col1);
        }
    }
    return output;
}

// Rail Fence Cipher
function railFenceCipher(input, rails) {
    // Step 1: Prepare input
    let preparedInput = "";
    for (let i = 0; i < input.length; i++) {
        let char = input.charAt(i).toUpperCase();
        if (/[A-Z]/.test(char)) {
            preparedInput += char;
        }
    }
    // Step 2: Generate rail fence pattern
    let pattern = [];
    for (let i = 0; i < rails; i++) {
        pattern.push([]);
    }
    let rail = 0;
    let direction = 1;
    for (let i = 0; i < preparedInput.length; i++) {
        pattern[rail].push(i);
        rail += direction;
        if (rail === 0 || rail === rails - 1) {
            direction = -direction;
        }
    }
    // Step 3: Encrypt input
    let output = "";
    for (let rail = 0; rail < rails; rail++) {
        for (let i = 0; i < pattern[rail].length; i++) {
            output += preparedInput.charAt(pattern[rail][i]);
        }
    }
    return output;
}



// Hill Cipher
function hillCipher(input, key) {
    // Step 1: Prepare input
    let preparedInput = "";
    for (let i = 0; i < input.length; i++) {
        let char = input.charAt(i).toUpperCase();
        if (/[A-Z]/.test(char)) {
            preparedInput += char;
        }
    }
    // Step 2: Generate key matrix
    let matrix = [];
    let keyIndex = 0;
    for (let i = 0; i < Math.sqrt(key.length); i++) {
        matrix.push([]);
        for (let j = 0; j < Math.sqrt(key.length); j++) {
            matrix[i].push(key.charCodeAt(keyIndex) - 65);
            keyIndex++;
        }
    }
    // Step 3: Add padding if needed
    if (preparedInput.length % matrix.length !== 0) {
        let paddingLength = matrix.length - (preparedInput.length % matrix.length);
        for (let i = 0; i < paddingLength; i++) {
            preparedInput += "X";
        }
    }
    // Step 4: Encrypt input
    let output = "";
    for (let i = 0; i < preparedInput.length; i += matrix.length) {
        let block = [];
        for (let j = i; j < i + matrix.length; j++) {
            block.push(preparedInput.charCodeAt(j) - 65);
        }
        let result = multiplyMatrix(matrix, block);
        for (let j = 0; j < result.length; j++) {
            output += String.fromCharCode(result[j] % 26 + 65);
        }
    }
    return output;
}

// Helper function to multiply two matrices
function multiplyMatrix(matrix1, matrix2) {
    let result = [];
    for (let i = 0; i < matrix1.length; i++) {
        result.push(0);
        for (let j = 0; j < matrix2.length; j++) {
            result[i] += matrix1[i][j] * matrix2[j];
        }
    }
    return result;
}

// Event listeners for buttons
document.getElementById("caesar-btn").addEventListener("click", function () {
    const input = document.getElementById("input-text").value;
    const shift = 4; // change this to your desired shift
    const output = caesarCipher(input, shift);
    document.getElementById("output-text").value = output;
});

document.getElementById("playfair-btn").addEventListener("click", function () {
    const input = document.getElementById("input-text").value;
    const keyword = "KEYWORD"; // change this to your desired keyword
    const output = playfairCipher(input, keyword);
    document.getElementById("output-text").value = output;
});

document.getElementById("railfence-btn").addEventListener("click", function () {
    const input = document.getElementById("input-text").value;
    const rails = 4; // change this to your desired number of rails
    const output = railFenceCipher(input, rails);
    document.getElementById("output-text").value = output;
});

document.getElementById("hill-btn").addEventListener("click", function () {
    const input = document.getElementById("input-text").value;
    const key = "GYBNQKURP"; // change this to your desired key
    const output = hillCipher(input, key);
    document.getElementById("output-text").value = output;
});

