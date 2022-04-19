
const number = parseInt(prompt('entre un entier '));
for(let i = 1; i <= 10; i++) {
    const result = i * number;
    console.log(`${number} * ${i} = ${result}`);
}