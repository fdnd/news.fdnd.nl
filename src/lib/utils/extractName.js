export function extractName(email) {
  return email.substring(0, email.lastIndexOf('@'))
}
