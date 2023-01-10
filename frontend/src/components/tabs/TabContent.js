export default function TabContent({ children, className = '' }) {
	return (
		<div className={`tab-content ${className}`} id="tabs-tabContent">
			{children}
		</div>
	);
}
