import { Home, CreditCard, ArrowLeftRight, PlusCircle, PieChart } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Tableau de bord', icon: Home },
        { id: 'accounts', label: 'Comptes', icon: CreditCard },
        { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    ];

    return (
        <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col transition-all duration-300">
            <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <PieChart className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-bold text-slate-900 leading-none">BankQL</h1>
                        <p className="text-xs text-slate-500 mt-1">Gestion Bancaire</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-primary-50 text-primary-600'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-primary-500'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-primary-500'}`} />
                            <span className="font-medium">{item.label}</span>
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600 animate-pulse" />
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Statut API</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm text-slate-700 font-medium tracking-tight">Connecté à GraphQL</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
