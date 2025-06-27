export interface AccountFormErrors {
  type?: string;
  name?: string;
}

export interface Account {
  type: string;
  name: string;
}

export interface AccountFormVm {
  account: Account;
  errors: AccountFormErrors;
  setAccount: (accunt: Account) => void;
  handleSubmit: () => void;
}