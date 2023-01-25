import InputCheckbox from './forms/inputs/InputCheckbox';

export default function UserPermissions({
	className = '',
	permissions,
	register,
}) {
	return (
		<div className={className}>
			<div className="py-30 px-24">
				<h2 className="text-18 font-medium mb-20">Permissions</h2>
				<InputCheckbox
					register={register}
					className="font-bold mb-20"
					name="admin"
					value="1"
					label="Admin"
				/>

				{/* <h3 className="mb-10 text-14">General</h3>
				{permissions.map((permission, idx) => (
					<InputCheckbox
						key={`permission${permission.id}`}
						register={register}
						name={`permissions[${idx}]`}
						value={permission.id}
						label={permission.title}
					/>
				))} */}
			</div>
		</div>
	);
}
