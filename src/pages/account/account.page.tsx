import React from "react";
import { AppLayout } from "@/layouts";
import { useAccountForm } from "./account.vm";
import classes from "./account.page.module.css";

export const AccountPage: React.FC = () => {
  const { type, name, errors, setType, setName, handleSubmit } = useAccountForm();

  return (
    <AppLayout>
      <div className={classes.root}>
        <h1>Crear Nueva Cuenta</h1>
        <div className={classes.formGroup}>
          <label>Tipo de Cuenta</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Seleccione</option>
            <option value="current">Cuenta Corriente</option>
            <option value="savings">Cuenta Ahorro</option>
          </select>
          {errors.type && <span className={classes.error}>{errors.type}</span>}
        </div>
        <div className={classes.formGroup}>
          <label>Alias</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className={classes.error}>{errors.name}</span>}
        </div>
        <button onClick={handleSubmit}>Guardar Cuenta</button>
      </div>
    </AppLayout>
  );
};
