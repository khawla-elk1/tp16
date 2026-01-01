import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_COMPTE, GET_ALL_COMPTES } from '../apollo/queries';
import { X, Plus, Loader2 } from 'lucide-react';

const CreateAccountForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        solde: '',
        type: 'COURANT',
    });

    const [saveCompte, { loading, error }] = useMutation(SAVE_COMPTE, {
        refetchQueries: [{ query: GET_ALL_COMPTES }],
        onCompleted: () => onClose(),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        saveCompte({
            variables: {
                compte: {
                    solde: parseFloat(formData.solde),
                    type: formData.type,
                    dateCreation: new Date().toISOString().split('T')[0],
                },
            },
        });
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-primary-600" />
                        Nouveau Compte
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Solde Initial (€)</label>
                        <input
                            type="number"
                            required
                            step="0.01"
                            className="input-field"
                            placeholder="0.00"
                            value={formData.solde}
                            onChange={(e) => setFormData({ ...formData, solde: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Type de Compte</label>
                        <select
                            className="input-field appearance-none bg-white"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option value="COURANT">Compte Courant</option>
                            <option value="EPARGNE">Compte Épargne</option>
                        </select>
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
                            className="flex-1 btn-primary flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Créer le compte'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAccountForm;
