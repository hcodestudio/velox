import SubSidebar from '../components/SubSidebar';

export default function SubLayout({ children, title, pages }) {
	return (
		<div className="flex min-h-screen p-30">
			<div className="flex w-full">
				<div className="w-300 h-full">
					<div className="w-full justify-center">
						<h1 className="py-8 px-24 font-bold text-18">
							{title}
						</h1>
						<div className="py-10 mt-10">
							<SubSidebar pages={pages} />
						</div>
					</div>
				</div>
				{children}
			</div>
		</div>
	);
}
