export interface MovementVm {
    id: string;
    description: string;
    amount: number;
    balance: number;
    transaction: Date;
    realTransaction: Date;
    accountId: string;
}

export interface Account {
    iban: string;
    name: string;
    balance: number;
}