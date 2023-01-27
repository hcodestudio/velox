import { useSelector } from 'react-redux';

import Purchases from './purchases';
import PurchaseEdit from './purchases/PurchaseEdit';

export default function RequestsPages() {
	const { subpage, edit } = useSelector((state) => state.pages.current);

	switch (subpage) {
		case undefined || 'purchases':
			if (edit === 'new' || edit === 'edit') {
				return <PurchaseEdit />;
			} else {
				return <Purchases />;
			}

		default:
			return <Purchases />;
	}
}
