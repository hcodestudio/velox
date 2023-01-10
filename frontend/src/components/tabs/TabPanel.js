export default function TabPanel({ className = '', children, tabId }) {
	return (
		<div
			className={`tab-pane fade ${className}`}
			id={`tabs-${tabId}`}
			role="tabpanel"
			aria-labelledby={`tabs-${tabId}-tab`}>
			{children}
		</div>
	);
}
