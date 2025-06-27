import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAccount } from "./api/account.api";
import { appRoutes } from "@/core/router";
import { validateForm } from "./account.validations";
import { mapFormToApi } from "./account.mapper";

export interface AccountFormErrors {
  type?: string;
  name?: string;
}

export interface AccountFormVm {
  type: string;
  name: string;
  errors: AccountFormErrors;
  setType: (type: string) => void;
  setName: (name: string) => void;
  handleSubmit: () => void;
}

export const useAccountForm = (): AccountFormVm => {
  const [type, setType] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [errors, setErrors] = useState<AccountFormErrors>({});
  const navigate = useNavigate();

  const handleSubmit = () => {

    const newErrors = validateForm({ type, name });
    setErrors(newErrors);


    if (Object.keys(newErrors).length === 0) {
      const apiPayload = mapFormToApi({ type, name });
      saveAccount(apiPayload).then(() => {
        navigate(appRoutes.accountList);
      });
    }
  };

  return {
    type,
    name,
    errors,
    setType,
    setName,
    handleSubmit,
  };
};