import React from "react";
import { Paper, Table, TableContainer, TableCell, TableRow, TableHead, TableBody } from '@material-ui/core/';
import { TransferStatus } from "../../types";

export interface TransactionTableProps {
    txs: TransferStatus[];
}

export const TransactionTable = ({ txs }: TransactionTableProps) => {
    return (
        <TableContainer className="transtaction-table" component={Paper}>
            <Table
                aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nonce</TableCell>
                        <TableCell align="center">Sender</TableCell>
                        <TableCell align="center">Destination</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="center">Transaction Hash</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {txs.map(tx => (
                        <TableRow key={tx.nonce}>
                            <TableCell align="left" component="th" scope="row">
                                {parseInt(tx.nonce, 16)}
                            </TableCell>
                            <TableCell align="left" component="th" scope="row">
                                {tx.from}
                            </TableCell>
                            <TableCell align="left">{tx.to}</TableCell>
                            <TableCell align="left">{parseInt(tx.value, 16) / Math.pow(10, 18)} KLAY</TableCell>
                            <TableCell align="left">
                                <a
                                    href={`https://baobab.scope.klaytn.com/tx/${tx.transactionHash}`}
                                    target="_blank"
                                    title="View on Baobab Scope"
                                >
                                    {tx.transactionHash}
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};