export default function Tab({ tabId = '', className, children }) {
	return (
		<li className="nav-item" role="presentation">
			<a
				className={`nav-link
        block
        font-medium
        text-xs
        leading-tight
        uppercase
        border-x-0 border-t-0 border-b-2 border-transparent
        px-6
        py-3
        my-2
        hover:border-transparent hover:bg-gray-100
        focus:border-transparent
        ${className}`}
				href={`#${tabId}`}
				id={`${tabId}-tab`}
				data-bs-toggle="pill"
				data-bs-target={`#${tabId}`}
				role="tab"
				aria-controls={tabId}
				aria-selected="true">
				{children}
			</a>
		</li>
	);
}
