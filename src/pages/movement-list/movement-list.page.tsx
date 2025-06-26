import React from "react";
import { MovementVm, Account } from "./movement-list.vm";
import { AppLayout } from "@/layouts";
import classes from "./movement-list.page.module.css";
import { MovementListTableComponent } from "./components";
import { getMovementList, getAccountById } from "./api";
import { mapMovementListFromApiToVm, mapAccountFromApiToVm } from "./movement-list.mapper";
import { useParams } from "react-router-dom";


export const MovementListPage: React.FC = () => {
  const [movementList, setMovementList] = React.useState<MovementVm[]>([]);
  const [account, setAccount] = React.useState<Account>({
    balance: 0,
    iban: '',
    name: '',
  });

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (!id) return;

    getMovementList(id).then((result) => {
      setMovementList(mapMovementListFromApiToVm(result));
    });

    getAccountById(id).then((result) => {
      const account = mapAccountFromApiToVm(result);
      setAccount(account);
    })

}, []);

  return (
    <AppLayout>
      <div className={classes.root}>
        <div className={classes.headerContainer}>
          <h1>Saldos y Últimos Movimientos</h1>
          {account && (
            <div className={classes.balanceAvailable}>
              <div className={classes.balanceLabel}>SALDO DISPONIBLE</div>
              <div className={classes.balanceValue}>
                {account.balance} €
              </div>
            </div>
          )}
        </div>

        {account && (
          <div className={classes.accountInfo}>
            <span className={classes.alias}>Alias: {account.name}</span>
            <span className={classes.iban}>IBAN: {account.iban}</span>
          </div>
        )}

        <MovementListTableComponent movementList={movementList} />
      </div>
    </AppLayout>
  );
};
