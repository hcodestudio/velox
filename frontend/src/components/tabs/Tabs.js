export default function Tabs({ id = 'tabs-tab', children }) {
	return (
		<ul
			className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
			id={id}
			role="tablist">
			{children}
		</ul>
	);
}
