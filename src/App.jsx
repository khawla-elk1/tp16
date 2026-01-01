import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";
import CompteList from "./components/CompteList";
import CreateCompte from "./components/CreateCompte";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { PieChart, LayoutDashboard } from 'lucide-react';
import "./index.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <header className="mb-12 text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-8 w-64 h-64 bg-primary-200/20 blur-3xl rounded-full -z-10" />
            <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 mb-6 animate-fade-in">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/20">
                <PieChart className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-slate-800 tracking-tight">BankQL Platform</span>
            </div>
            <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4 animate-slide-up">
              Gestion des Comptes et Transactions
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium animate-slide-up" style={{ animationDelay: '50ms' }}>
              Interface d'administration moderne pour la gestion des avoirs bancaires et le suivi analytique des transactions.
            </p>
          </header>

          {/* Main Grid Layout from TP */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column: Accounts */}
            <div className="space-y-10">
              <section className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                <CreateCompte />
              </section>
              <section className="animate-slide-up" style={{ animationDelay: '150ms' }}>
                <div className="flex items-center gap-3 mb-6 px-1">
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Aperçu des Portefeuilles</h2>
                </div>
                <CompteList />
              </section>
            </div>

            {/* Right Column: Transactions */}
            <div className="space-y-10">
              <section className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                <TransactionForm />
              </section>
              <section className="animate-slide-up" style={{ animationDelay: '250ms' }}>
                <div className="glass-card rounded-2xl p-8 border-none ring-1 ring-slate-100">
                  <TransactionList />
                </div>
              </section>
            </div>
          </div>

          {/* Footer Info */}
          <footer className="mt-16 text-center text-slate-400 text-sm font-medium">
            <p>© 2026 BankQL TP16 - Réalisé avec Apollo Client & GraphQL</p>
          </footer>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
