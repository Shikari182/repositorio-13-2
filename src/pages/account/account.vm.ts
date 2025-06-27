import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Account } from "./api/account.api-model";
import { saveAccount } from "./api/account.api";
import { appRoutes } from "@/core/router";
import { validateForm } from "./account.validations";


export interface AccountFormErrors {
  type?: string;
  name?: string;
}

export interface AccountFormVm {
  type: string;
  name: string;
  errors: {
    type?: string;
    name?: string;
  };
  setType: (type: string) => void;
  setName: (name: string) => void;
  handleSubmit: () => void;
}

export const useAccountForm = (): AccountFormVm => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ type?: string; name?: string }>({});
  const navigate = useNavigate();

  const handleSubmit = () => {
    const newErrors = validateForm({ type, name });
    if (!type) {
      newErrors.type = "Debe elegir un tipo de cuenta";
    }
    if (!name) {
      newErrors.name = "Debe introducir un alias";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const account: Account = { type, name };
      saveAccount(account).then(() => {
        navigate(appRoutes.accountList);
      });
    }
  };

  return { type, name, errors, setType, setName, handleSubmit };
};
