import randomDigit from "./randomDigit";

function calculateDigit(
  cpfArray: number[],
  length: number,
  factor: number,
): number {
  let sum: number = 0;

  for (let i: number = 0; i < length; i++) {
    sum += cpfArray[i] * (factor - i);
  }

  const remainder: number = sum % 11;

  return remainder < 2 ? 0 : 11 - remainder;
}

function generateCpf(): string {
  const cpfArray: number[] = new Array<number>(11);

  for (let i: number = 0; i < 9; i++) {
    cpfArray[i] = randomDigit();
  }

  cpfArray[9] = calculateDigit(cpfArray, 9, 10);

  cpfArray[10] = calculateDigit(cpfArray, 10, 11);

  return cpfArray.join("");
}

export default generateCpf;