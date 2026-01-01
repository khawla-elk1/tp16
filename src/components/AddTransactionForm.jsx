import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TRANSACTION, GET_COMPTE_DETAILS, GET_ALL_COMPTES } from '../apollo/queries';
import { X, ArrowRightLeft, Loader2 } from 'lucide-react';

const AddTransactionForm = ({ accountId, onClose }) => {
    const [formData, setFormData] = useState({
        montant: '',
        type: 'DEPOT',
    });

    const [addTransaction, { loading, error }] = useMutation(ADD_TRANSACTION, {
        refetchQueries: [
            { query: GET_COMPTE_DETAILS, variables: { id: accountId } },
            { query: GET_ALL_COMPTES }
        ],
        onCompleted: () => onClose(),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addTransaction({
            variables: {
                transaction: {
                    compteId: accountId,
                    montant: parseFloat(formData.montant),
                    type: formData.type,
                    date: new Date().toISOString().split('T')[0],
                },
            },
        });
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <ArrowRightLeft className="w-5 h-5 text-primary-600" />
                        Nouvelle Transaction
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Type d'opération</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, type: 'DEPOT' })}
                                className={`py-3 rounded-xl border-2 transition-all font-bold ${formData.type === 'DEPOT'
                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                        : 'border-slate-100 text-slate-500 hover:border-slate-200'
                                    }`}
                            >
                                Dépôt
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, type: 'RETRAIT' })}
                                className={`py-3 rounded-xl border-2 transition-all font-bold ${formData.type === 'RETRAIT'
                                        ? 'border-rose-500 bg-rose-50 text-rose-700'
                                        : 'border-slate-100 text-slate-500 hover:border-slate-200'
                                    }`}
                            >
                                Retrait
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Montant (€)</label>
                        <input
                            type="number"
                            required
                            step="0.01"
                            min="0.01"
                            className="input-field text-lg font-bold"
                            placeholder="0.00"
                            value={formData.montant}
                            onChange={(e) => setFormData({ ...formData, montant: e.target.value })}
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg text-rose-600 text-sm">
                            Erreur: {error.message}
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-1 px-4 py-2 text-white rounded-lg font-bold transition-all ${formData.type === 'DEPOT' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20'
                                } shadow-lg disabled:opacity-50`}
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Confirmer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTransactionForm;
