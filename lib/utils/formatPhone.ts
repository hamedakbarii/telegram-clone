// Path: lib/utils/formatPhone.ts
export function formatPhoneNumber(phone: string): string {
  return phone.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3 $4");
}
