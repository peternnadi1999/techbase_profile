import { Label } from './Label';

interface InputFieldProps {
  label: string;
  id: string;
  register: any;
  error?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export function InputField({
  label,
  id,
  register,
  error,
  type = 'text',
  placeholder,
  disabled,
  required,
}: InputFieldProps) {
  return (
    <div>
      <Label htmlFor={id} required={required}>{label}</Label>
      <input
        id={id}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        {...register(id, {
          required: required ? `${label} is required` : false,
          ...(id === 'email' && {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          }),
          ...(id === 'phoneNumber' && {
            pattern: {
              value: /^[\d\s\+\-\(\)]{7,15}$/,
              message: 'Enter a valid phone number',
            },
          }),
        })}
        className={`w-full h-10 px-3 text-[13px] font-medium rounded-lg border transition-all duration-150 outline-none bg-white placeholder:text-gray-300 text-gray-800
          ${error
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-200 focus:border-[#1F1844]'
          }
          ${disabled ? 'bg-gray-50 cursor-not-allowed text-gray-400' : ''}
        `}
      />
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}