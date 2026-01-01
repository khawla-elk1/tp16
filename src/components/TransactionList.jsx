import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TRANSACTIONS } from '../graphql/queries';
import { ArrowUpRight, ArrowDownLeft, Clock, Loader2, AlertCircle } from 'lucide-react';

const TransactionList = () => {
    const { loading, error, data } = useQuery(GET_ALL_TRANSACTIONS);

    if (loading) return (
        <div className="h-48 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
    );

    if (error) return (
        <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-rose-500" />
            <p className="text-rose-700 font-medium text-sm">Erreur : {error.message}</p>
        </div>
    );

    const transactions = data?.allTransactions || [];

    if (transactions.length === 0) {
        return (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">Aucune transaction pour le moment</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                Historique Récent
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{transactions.length}</span>
            </h3>
            <div className="space-y-3">
                {transactions.map((tx) => {
                    const isDepot = tx.type === 'DEPOT';
                    return (
                        <div key={tx.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 hover:border-primary-100 transition-colors group shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${isDepot ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                    {isDepot ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase text-sm tracking-tight">
                                        {isDepot ? 'Dépôt' : 'Retrait'}
                                    </p>
                                    <p className="text-[10px] text-slate-400 font-medium">
                                        {new Date(tx.date).toLocaleDateString()} • Compte {tx.compte?.id?.slice(-4)}
                                    </p>
                                </div>
                            </div>
                            <p className={`text-lg font-bold ${isDepot ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {isDepot ? '+' : '-'} {tx.montant.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TransactionList;
