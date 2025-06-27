import { AccountFormErrors } from "./account.vm";
import { Account } from "./api/account.api-model"


export const validateForm = (account: Account): AccountFormErrors => {
  const errors: AccountFormErrors = {};

  if (!account.type) {
    errors.type = "Debe elegir un tipo de cuenta";
  }

  if (!account.name?.trim()) {
    errors.name = "Debe introducir un alias";
  }

  return errors;
};