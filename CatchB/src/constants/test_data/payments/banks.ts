import { BankType, BankAccountType } from ".types/payments";

export const sampleBanks: BankType[] = [
  {
    cms_code: "004",
    name: "KB국민은행",
    kor_code: "국민은행",
    eng_code: "KB",
    icon: "fake.url/icon.png"
  },
];

export const sampleBankAccounts: BankAccountType[] = [
  {
    bank: sampleBanks[0],
    account_number: "1234567890",
    account_holder_name: "홍길동",
  },
];
