import { Controller } from 'react-hook-form';
import { Label } from './Label';

interface SelectFieldProps {
  label: string;
  id: string;
  control: any;
  options: string[];
  disabled?: boolean;
}

export function SelectField({
  label,
  id,
  control,
  options,
  disabled,
}: SelectFieldProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Controller
          name={id}
          control={control}
          render={({ field }) => (
            <select
              id={id}
              value={field.value}
              disabled={disabled}
              onChange={field.onChange}
              className={`w-full h-10 pl-3 pr-9 text-[13px] font-medium rounded-lg border border-gray-200 bg-white text-gray-800 outline-none appearance-none transition-all duration-150
                ${disabled ? 'bg-gray-50 cursor-not-allowed text-gray-400' : 'cursor-pointer hover:border-[#1F1844]'}
              `}
            >
              {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          )}
        />
        <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </div>
  );
}