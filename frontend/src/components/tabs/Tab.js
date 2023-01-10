export default function Tab({ tabId = '', className = '', children }) {
	return (
		<li className="nav-item" role="presentation">
			<a
				className={`nav-link h-full
				flex items-center
        font-medium
        text-xs
        leading-tight
        uppercase
        border-x-0 border-t-0 border-b-2 border-transparent
        px-6
        py-3
        my-2
        ${className}`}
				href={`#tabs-${tabId}`}
				id={`tabs-${tabId}-tab`}
				data-bs-toggle="pill"
				data-bs-target={`#tabs-${tabId}`}
				role="tab"
				aria-controls={`tabs-${tabId}`}
				aria-selected="true">
				{children}
			</a>
		</li>
	);
}
