import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMPTES } from "../graphql/queries";
import AccountCard from "./AccountCard";
import { Loader2, AlertCircle } from 'lucide-react';

const CompteList = ({ onSelectAccount }) => {
    const { loading, error, data } = useQuery(GET_ALL_COMPTES);

    if (loading) return (
        <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
    );

    if (error) return (
        <div className="p-8 bg-rose-50 border border-rose-100 rounded-2xl flex flex-col items-center gap-3">
            <AlertCircle className="w-10 h-10 text-rose-500" />
            <p className="font-bold text-rose-700">Erreur : {error.message}</p>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Liste des Comptes</h2>
                <span className="text-xs font-semibold bg-slate-200 text-slate-600 px-2 py-1 rounded-full">
                    {data.allComptes.length} TOTAL
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.allComptes.map((compte) => (
                    <AccountCard
                        key={compte.id}
                        account={compte}
                        onClick={() => onSelectAccount && onSelectAccount(compte)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CompteList;
