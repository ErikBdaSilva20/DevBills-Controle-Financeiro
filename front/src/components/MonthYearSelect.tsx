import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthYearSelectProps {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

const monthsNames: readonly string[] = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const MonthYearSelect = ({ month, onMonthChange, onYearChange, year }: MonthYearSelectProps) => {
  const currentYear = new Date().getFullYear();
  const years: number[] = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const handleNextMonth = (): void => {
    if (month === 12) {
      onMonthChange(1);
      onYearChange(year + 1);
    } else {
      onMonthChange(month + 1);
    }
  };

  const handlePreviousMonth = (): void => {
    if (month === 1) {
      onMonthChange(12);
      onYearChange(year - 1);
    } else {
      onMonthChange(month - 1);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-900 rounded-lg p-3 border border-gray-700">
      <button>
        <ChevronLeft
          type="button"
          className="rounded-full p-2 hover:bg-gray-800 cursor-pointer hover:text-white transition-colors size-10 text-white cursor: pointer"
          aria-label="Mês Anterior"
          onClick={handlePreviousMonth}
        />
      </button>

      {/* mes */}
      <div className="flex items-center gap-3">
        <label htmlFor="month-select" className="sr-only">
          Selecionar mes
        </label>

        <select
          id="month-select"
          value={month}
          onChange={(e) => onMonthChange(Number(e.target.value))}
          className="bg-gray-800 border border-gray-700 rounded-md py-1 px-3 text-sm font-medium text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
        >
          {monthsNames.map((name, index) => (
            <option key={name} value={index + 1}>
              {name}
            </option>
          ))}
        </select>
        {/* Ano */}
        <label htmlFor="month-select" className="sr-only">
          Selecionar ano
        </label>

        <select
          id="year-select"
          value={year}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className="bg-gray-800 border border-gray-700 rounded-md py-1 px-3 text-sm font-medium text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
        >
          {years.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
      </div>
      <button>
        <ChevronRight
          type="button"
          className="rounded-full p-2 hover:bg-gray-800 cursor-pointer hover:text-white transition-colors size-10 text-white cursor: pointer"
          aria-label="Próximo Mês"
          onClick={handleNextMonth}
        />
      </button>
    </div>
  );
};

export default MonthYearSelect;
