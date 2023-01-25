export default function InputCheckbox({
	className = '',
	register,
	label,
	value,
	name,
}) {
	return (
		<label className={`text-14 flex items-center mb-5 ${className}`}>
			<input {...register(name)} type="checkbox" value={value} />
			<span className="ml-8">{label}</span>
		</label>
	);
}
