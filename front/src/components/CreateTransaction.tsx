import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { api } from '../services/api';
import type { Category } from '../services/categoriesService';
import { getCategories } from '../services/categoriesService';

const CreateTransaction = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Carrega categorias conforme o tipo (INCOME / EXPENSE)
  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    }
    loadCategories();
  }, [type]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!description || !amount || !date || !categoryId) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);

      await api.post('/transactions', {
        description,
        amount: Number(amount),
        type,
        categoryId,
        date, // YYYY-MM-DD → back-end trata UTC
      });
      alert('Transação criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      alert('Erro ao criar transação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className=" p-4 bg-gray-900  min-w-full">
      <h1 className="text-xl font-semibold mb-4 text-white text-center mt-20 border-t-2 border-gray-500 pt-8 max-w-7xl mx-auto">
        Nova transação
      </h1>

      {/* Tipo da transação */}
      <div className="flex gap-2 mb-6 bg-gray-800 p-4 rounded-md max-w-4xl mx-auto">
        <div className="flex flex-1 max-w-4xl mx-auto gap-15">
          <button
            type="button"
            onClick={() => setType('EXPENSE')}
            className={`flex-1 py-2 rounded-md cursor-pointer transition-colors
    ${
      type === 'EXPENSE'
        ? 'bg-red-800 text-white'
        : 'bg-transparent text-gray-600 hover:bg-red-500 hover:text-white'
    }
  `}
          >
            Despesa
          </button>

          <button
            type="button"
            onClick={() => setType('INCOME')}
            className={`flex-1 py-2 rounded-md cursor-pointer transition-colors
    ${
      type === 'INCOME'
        ? 'bg-green-800 text-white'
        : 'bg-transparent text-gray-600 hover:bg-green-500 hover:text-white'
    }
  `}
          >
            Receita
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 rounded-md">
        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border border-gray-300 p-4 rounded-md bg-gray-700"
        >
          {/* Descrição */}
          <div>
            <label className="block text-lg font-bold mb-1 text-green-500 ">
              Descrição <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Supermercado, Salário"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Valor */}
          <div>
            <label className="block text-lg font-bold mb-1 text-green-500">
              Valor <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Data */}
          <div>
            <label className="block text-lg font-bold mb-1 text-green-500">
              Data <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm mb-1">
              Categoria <span className="text-red-500">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="block text-lg font-bold mb-1 text-green-500"
            >
              <option className="bg-gray-900" value="">
                Selecione uma categoria
              </option>

              {categories.map((category) => (
                <option key={category.id} value={category.id} className="bg-gray-800">
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Ações */}
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 border rounded-md py-2"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white rounded-md py-2 disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTransaction;
