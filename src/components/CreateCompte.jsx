import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_COMPTE } from '../graphql/mutations';
import { GET_ALL_COMPTES } from '../graphql/queries';
import { Plus, Loader2, Sparkles } from 'lucide-react';

const CreateCompte = () => {
    const [solde, setSolde] = useState('');
    const [type, setType] = useState('COURANT');

    const [saveCompte, { loading }] = useMutation(SAVE_COMPTE, {
        refetchQueries: [{ query: GET_ALL_COMPTES }]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await saveCompte({
                variables: {
                    compte: {
                        solde: parseFloat(solde),
                        type,
                    },
                },
            });
            setSolde('');
            setType('COURANT');
        } catch (error) {
            console.error('Erreur lors de la création du compte :', error);
        }
    };

    return (
        <div className="glass-card p-6 rounded-2xl animate-slide-up">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                    <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Nouveau Compte</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Solde Initial (€)</label>
                    <input
                        type="number"
                        value={solde}
                        onChange={(e) => setSolde(e.target.value)}
                        required
                        placeholder="Ex: 1500.00"
                        className="input-field"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Type de Compte</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        className="input-field appearance-none bg-white"
                    >
                        <option value="COURANT">Compte Courant</option>
                        <option value="EPARGNE">Compte Épargne</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                            <Plus className="w-5 h-5" />
                            Créer le compte
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default CreateCompte;
