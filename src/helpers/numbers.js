export const currency = function (number, type) {
    let newNumber = type === '2' ? -number : number;
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(newNumber);
};