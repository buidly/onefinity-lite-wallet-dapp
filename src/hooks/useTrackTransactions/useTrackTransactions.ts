import { Address, Transaction } from '@multiversx/sdk-core/out';
import {
  addTransactionToast,
  moveTransactionsToSignedState,
  MoveTransactionsToSignedStatePayloadType,
  updateSignedTransactionStatus
} from '@multiversx/sdk-dapp/reduxStore/slices';
import { store } from '@multiversx/sdk-dapp/reduxStore/store';
import {
  SignedTransactionType,
  TransactionBatchStatusesEnum,
  TransactionServerStatusesEnum
} from '@multiversx/sdk-dapp/types';
import axios from 'axios';
import { crossAddressTransferMvxContract, chainId } from 'config';
import { getCurrentNetwork, useLocalStorage } from 'helpers';
import { useGetPendingTransactions } from 'lib';
import { useEffect } from 'react';

interface PendingTransaction {
  hash: string;
  sessionId: string;
  status?: string;
}

export const useTrackTransactions = () => {
  const { apiAddress } = getCurrentNetwork();

  const [pendingTransactions, setPendingTransactions] = useLocalStorage<
    PendingTransaction[]
  >(`pending_evm_tsx`, []);

  const { pendingTransactions: mvxPendingTransactions } =
    useGetPendingTransactions();
  // Workaround, since the sdk-dapp relies on a WS which doesn't always work
  useEffect(() => {
    const newPendingTransactions: PendingTransaction[] = [];

    Object.entries(mvxPendingTransactions).forEach(
      ([sessionId, transactionData]) => {
        const transactions = (transactionData as any).transactions;
        transactions.forEach((transaction: any) => {
          const pendingTransaction: PendingTransaction = {
            hash: transaction.hash,
            sessionId,
            status: transaction.status
          };
          newPendingTransactions.push(pendingTransaction);
        });
      }
    );

    setPendingTransactions((prevTransactions: any) => {
      const mergedTransactions = [...prevTransactions];

      newPendingTransactions.forEach((newTransaction) => {
        const exists = mergedTransactions.some(
          (tx) => tx.hash === newTransaction.hash
        );
        if (!exists) {
          mergedTransactions.push(newTransaction);
        }
      });

      return mergedTransactions;
    });
  }, [mvxPendingTransactions]);

  useEffect(() => {
    if (pendingTransactions.length === 0) {
      return;
    }

    const pollTransactions = async () => {
      try {
        const response = await axios.get(`${apiAddress}/transactions`, {
          params: {
            hashes: pendingTransactions
              .map((tx: { hash: any }) => tx.hash)
              .join(',')
          }
        });

        const completedTransactions: PendingTransaction[] = [];

        const newPendingTransactions = pendingTransactions.filter(
          (pendingTx: { hash: any; sessionId: any }) => {
            const transaction = response.data.find(
              (tx: any) => tx.txHash === pendingTx.hash
            );
            if (
              transaction &&
              (transaction.status === 'success' ||
                transaction.status === 'fail')
            ) {
              completedTransactions.push({
                sessionId: pendingTx.sessionId,
                hash: pendingTx.hash,
                status: transaction.status
              });
              return false;
            }
            return true;
          }
        );

        setPendingTransactions(newPendingTransactions);

        for (const tx of completedTransactions) {
          store.dispatch(
            updateSignedTransactionStatus({
              sessionId: tx.sessionId,
              status: tx.status,
              transactionHash: tx.hash
            })
          );
        }

        return response.data.every(
          (tx: any) => tx.status === 'success' || tx.status === 'fail'
        );
      } catch (error) {
        console.error('Error polling transactions:', error);
        return false;
      }
    };

    const intervalId = setInterval(async () => {
      const allCompleted = await pollTransactions();
      if (allCompleted) {
        clearInterval(intervalId);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [pendingTransactions]);

  const showTransactionToast = async (hash: string) => {
    const txHash = hash.startsWith('0x') ? hash.slice(2) : hash;
    const sessionId = Date.now().toString();
    // mock a transaction
    const transaction = new Transaction({
      sender: new Address(crossAddressTransferMvxContract),
      receiver: new Address(crossAddressTransferMvxContract),
      chainID: chainId,
      data: undefined,
      gasLimit: 5000000
    });

    const parsedTransaction: SignedTransactionType = {
      ...transaction.toPlainObject(),
      hash: txHash,
      status: TransactionServerStatusesEnum.pending
    };

    const payload: MoveTransactionsToSignedStatePayloadType = {
      sessionId,
      // @ts-ignore
      transactions: [parsedTransaction],
      status: TransactionBatchStatusesEnum.sent,
      customTransactionInformation: {
        signWithoutSending: true
      }
    };

    store.dispatch(moveTransactionsToSignedState(payload));
    store.dispatch(addTransactionToast(sessionId));
  };

  return { showTransactionToast };
};
