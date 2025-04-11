export const ClientInfoValidation = (data: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isDealer: boolean | null | undefined;
  dealerCompanName?: string;
  isClientNote: boolean | null | undefined;
  note?: string;
}): boolean => {
  const {
    firstName,
    lastName,
    phone,
    email,
    isDealer,
    dealerCompanName,
    isClientNote,
    note,
  } = data;

  const phoneDigits = phone.replace(/\D/g, "");
  const isValidPhone = /^\(\d{3}\) \d{3}-\d{4}$/.test(phone);
  const isValidEmail =
    !email || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const isValidNote =
    !isClientNote || (note?.trim() && note.trim().split(/\s+/).length <= 50);

  return !!(
    firstName &&
    lastName &&
    phone &&
    phoneDigits.length === 10 &&
    isValidPhone &&
    isValidEmail &&
    isDealer !== null &&
    isDealer !== undefined &&
    (!isDealer || dealerCompanName?.trim()) &&
    isClientNote !== null &&
    isClientNote !== undefined &&
    isValidNote
  );
};
