import { Account as ApiAccount } from "./api/account.api-model";
import { Account as FormAccount } from "./api/account.api-model";

export const mapFormToApi = (form: FormAccount): ApiAccount => ({
  type: form.type,
  name: form.name,
});


export const mapApiToForm = (api: ApiAccount): FormAccount => ({
  type: api.type,
  name: api.name,
});