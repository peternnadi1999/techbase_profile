import { Label } from './Label';

interface TextareaFieldProps {
  label: string;
  id: string;
  register: any;
  placeholder?: string;
  disabled?: boolean;
}

export function TextareaField({
  label,
  id,
  register,
  placeholder,
  disabled,
}: TextareaFieldProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <textarea
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        {...register(id)}
        rows={2}
        className={`w-full px-3 py-2.5 text-[13px] font-medium rounded-lg border border-gray-200 bg-white text-gray-800 outline-none resize-none placeholder:text-gray-300 transition-all duration-150
          ${disabled ? 'bg-gray-50 cursor-not-allowed text-gray-400' : 'focus:border-[#1F1844]'}
        `}
      />
    </div>
  );
}