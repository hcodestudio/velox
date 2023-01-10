export default function Tabs({ children, className = '' }) {
	return (
		<ul
			className={`nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 ${className}`}
			id="tabs-tab"
			role="tablist">
			{children}
		</ul>
	);
}
