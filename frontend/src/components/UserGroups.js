import InputCheckbox from './forms/inputs/InputCheckbox';

export default function UserGroups({
	className = '',
	groups,
	register,
	children,
}) {
	return (
		<div className={className}>
			<div className="py-30 px-24">
				<h2 className="text-18 font-medium mb-20">User Groups</h2>
				{groups.map((group, idx) => (
					<InputCheckbox
						key={`userGroups${group.id}`}
						register={register}
						name={`userGroups[${idx}]`}
						value={group.id}
						label={group.name}
					/>
				))}
				{children}
			</div>
		</div>
	);
}
