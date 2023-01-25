export default function TableHeaderGroup({ group, children }) {
	return (
		<tr key={group.id} className="text-left">
			{children}
		</tr>
	);
}
