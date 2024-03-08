export type BankType = {
  cms_code: string;
  name: string;
  kor_code: string;
  eng_code: string;
  icon: string;
};

export type BankAccountType = {
  bank: BankType;
  account_number: string;
  account_holder_name: string;
};
