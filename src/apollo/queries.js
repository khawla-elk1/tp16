import { gql } from '@apollo/client';

export const GET_ALL_COMPTES = gql`
  query GetAllComptes {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const GET_COMPTE_DETAILS = gql`
  query GetCompteDetails($id: ID!) {
    compteById(id: $id) {
      id
      solde
      dateCreation
      type
      transactions {
        id
        montant
        date
        type
      }
    }
  }
`;

export const SAVE_COMPTE = gql`
  mutation SaveCompte($compte: CompteInput!) {
    saveCompte(compte: $compte) {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation AddTransaction($transaction: TransactionInput!) {
    addTransaction(transaction: $transaction) {
      id
      montant
      date
      type
    }
  }
`;

export const GET_TOTAL_SOLDE = gql`
  query GetTotalSolde {
    totalSolde {
      count
      sum
    }
  }
`;
