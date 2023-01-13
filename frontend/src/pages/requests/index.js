import { useSelector } from 'react-redux';

import Purchases from './purchases/Purchases';
import PurchaseNew from './purchases/PurchaseNew';

export default function RequestsPages() {
	const { subpage, edit } = useSelector((state) => state.pages.current);

	switch (subpage) {
		case undefined || 'purchases':
			if (edit === 'new') {
				return <PurchaseNew />;
			} else {
				return <Purchases />;
			}

		default:
			return null;
	}
}
