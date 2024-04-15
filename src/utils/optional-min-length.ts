export default function optionalMinLength(str: string) {
  return !(str.length > 0 && str.length < 5);
}
