import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateForm } from "./account.validations";
import { mapFormToApi } from "./account.mapper";
import { appRoutes } from "@/core/router";
import { saveAccount } from "./api/account.api";
import { AccountFormErrors, AccountFormVm, Account } from './account.vm';

export const useAccountForm = (): AccountFormVm => {
  const [account, setAccount] = useState<Account>({ type: '', name: '' });
  const [errors, setErrors] = useState<AccountFormErrors>({});
  const navigate = useNavigate();

  const handleSubmit = () => {

    const newErrors = validateForm({ type: account.type, name: account.name });
    setErrors(newErrors);


    if (Object.keys(newErrors).length === 0) {
      const apiPayload = mapFormToApi({ type: account.type, name: account.name });
      saveAccount(apiPayload).then(() => {
        navigate(appRoutes.accountList);
      });
    }
  };

  return {
    account,
    errors,
    setAccount,
    handleSubmit,
  };
};