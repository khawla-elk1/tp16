import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TRANSACTION } from '../graphql/mutations';
import { GET_ALL_COMPTES, GET_TOTAL_SOLDE } from '../graphql/queries';
import { Send, Loader2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const TransactionForm = () => {
    const [compteId, setCompteId] = useState('');
    const [montant, setMontant] = useState('');
    const [type, setType] = useState('DEPOT');

    const { data: accountsData } = useQuery(GET_ALL_COMPTES);

    const [addTransaction, { loading }] = useMutation(ADD_TRANSACTION, {
        refetchQueries: [
            { query: GET_ALL_COMPTES },
            { query: GET_TOTAL_SOLDE }
        ]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!compteId) return alert('Veuillez sélectionner un compte');

        try {
            await addTransaction({
                variables: {
                    transactionRequest: {
                        compteId,
                        montant: parseFloat(montant),
                        type,
                    },
                },
            });
            setMontant('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la transaction :', error);
        }
    };

    return (
        <div className="glass-card p-6 rounded-2xl animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                    <Send className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Nouvelle Transaction</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Sélectionner un Compte</label>
                    <select
                        value={compteId}
                        onChange={(e) => setCompteId(e.target.value)}
                        required
                        className="input-field appearance-none bg-white"
                    >
                        <option value="">Choisir un compte...</option>
                        {accountsData?.allComptes?.map(acc => (
                            <option key={acc.id} value={acc.id}>
                                {acc.type} - {acc.id.slice(-4)} ({acc.solde}€)
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setType('DEPOT')}
                        className={`py-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${type === 'DEPOT'
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                : 'border-slate-100 text-slate-500 hover:border-slate-200'
                            }`}
                    >
                        <ArrowUpCircle className="w-5 h-5" />
                        <span className="font-bold text-xs uppercase">Dépôt</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('RETRAIT')}
                        className={`py-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${type === 'RETRAIT'
                                ? 'border-rose-500 bg-rose-50 text-rose-700'
                                : 'border-slate-100 text-slate-500 hover:border-slate-200'
                            }`}
                    >
                        <ArrowDownCircle className="w-5 h-5" />
                        <span className="font-bold text-xs uppercase">Retrait</span>
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Montant (€)</label>
                    <input
                        type="number"
                        value={montant}
                        onChange={(e) => setMontant(e.target.value)}
                        required
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        className="input-field text-lg font-bold"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !compteId}
                    className={`w-full py-3 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${type === 'DEPOT' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'
                        } disabled:opacity-50`}
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirmer l\'opération'}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
