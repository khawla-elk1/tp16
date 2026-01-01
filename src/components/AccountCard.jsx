import { CreditCard, Calendar, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const AccountCard = ({ account, onClick }) => {
    const isCourant = account.type === 'COURANT';

    return (
        <div
            onClick={() => onClick(account)}
            className="glass-card p-6 rounded-2xl cursor-pointer hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
        >
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-3xl opacity-20 transition-all duration-500 group-hover:scale-150 ${isCourant ? 'bg-indigo-500' : 'bg-emerald-500'
                }`} />

            <div className="flex justify-between items-start mb-8">
                <div className={`p-3 rounded-xl ${isCourant ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    <CreditCard className="w-6 h-6" />
                </div>
                <div className="text-right">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md ${isCourant ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                        {account.type}
                    </span>
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">Solde actuel</p>
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                    {account.solde.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </h3>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">{new Date(account.dateCreation).toLocaleDateString()}</span>
                </div>
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center">
                        <ArrowDownLeft className="w-4 h-4 text-rose-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountCard;
