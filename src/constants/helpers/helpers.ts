export function random(a: number, b: number) {
    return Math.round(Math.random() * (b - a) + parseInt(a+""));
}