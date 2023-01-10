import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RxCaretRight } from 'react-icons/rx';
import gsap from 'gsap';

export default function TopNav() {
	const { page, subpage } = useParams();

	let profileMenuRef = useRef(null);
	let btnProfileMenuRef = useRef(null);
	let btnDownRef = useRef(null);

	useEffect(() => {
		window.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	});

	function handleClickOutside(e) {
		if (
			window.innerWidth > 1023 &&
			btnDownRef.current &&
			!btnDownRef.current.contains(e.target) &&
			!profileMenuRef.current.contains(e.target) &&
			btnProfileMenuRef.current &&
			!btnProfileMenuRef.current.contains(e.target)
		) {
			let rect = profileMenuRef.current.getBoundingClientRect();

			if (rect.y > 0) {
				const btnDown = btnDownRef.current.querySelector('.btn-down');

				gsap.to(profileMenuRef.current, {
					duration: 0.1,
					y: -rect.height,
					ease: 'sine.in',
					onComplete: function () {
						btnDown.classList.remove('bg-white');
					},
				});
			}
		}
	}

	function profileToggleMenu() {
		const rect = profileMenuRef.current.getBoundingClientRect();
		const btnProfileMenu = btnDownRef.current.querySelector('.btn-down');

		if (btnDownRef.current) {
			if (rect.y < 1) {
				gsap.to(profileMenuRef.current, {
					duration: 0.3,
					ease: 'expo.out',
					y: 0,
				});
				btnProfileMenu.classList.add('bg-white');
			} else {
				gsap.to(profileMenuRef.current, {
					duration: 0.1,
					ease: 'sine.in',
					y: -rect.height,
					onComplete: function () {
						btnProfileMenu.classList.remove('bg-white');
					},
				});
			}
		}
	}

	return (
		<div className="relative shadow-md">
			<nav className="bg-white h-48 px-24">
				<div className="bg-white h-full relative z-60">
					<div className="mx-auto px-15 md:px-0 flex items-center justify-between flex-wrap h-full">
						{subpage && (
							<ul>
								<li>
									<Link
										to={`/admin/${page}`}
										className="text-13 w-full flex items-center text-shuttlegray">
										{'Users'}
										<RxCaretRight />
									</Link>
								</li>
							</ul>
						)}
						<div className="bg-white w-full h-full hidden flex-grow justify-between lg:flex lg:items-center lg:w-auto">
							<div className="h-full relative z-60 ml-auto w-150">
								<button
									className="text-black text-14 flex bg-white items-center w-full h-full justify-end pr-20"
									ref={btnProfileMenuRef}
									onClick={profileToggleMenu}>
									<span className="mr-5">Honey</span>
								</button>
							</div>
							<div className="h-full relative z-50">
								<button
									className="text-porcelain text-14 flex bg-white items-center h-full relative z-50"
									ref={btnDownRef}
									onClick={profileToggleMenu}>
									<div className="btn-down bg-white h-full px-5 flex items-center">
										<svg
											width="10"
											height="6"
											viewBox="0 0 10 6">
											<path
												fill="none"
												fillRule="evenodd"
												stroke="#000000"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="1.2"
												d="M0 0L4 4 0 8"
												transform="rotate(90 4 5)"
											/>
										</svg>
									</div>
								</button>
								<ul
									className="profile-mobile-menu z-40 bg-white p-10 absolute h-0x opacity-0x invisiblex shadow-md"
									ref={profileMenuRef}>
									<li>
										<a
											href="/logout"
											className="inline-block w-full text-black-80 hover:text-black transition-colors duration-300">
											Logout
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}
