import { useSelector } from 'react-redux';

import Payments from './payments';
import PaymentEdit from './payments/PaymentEdit';
import PaymentNew from './payments/PaymentNew';
import Purchases from './purchases';
import PurchaseEdit from './purchases/PurchaseEdit';
import PurchaseNew from './purchases/PurchaseNew';

export default function RequestsPages() {
	const { subpage, edit } = useSelector((state) => state.pages.current);

	switch (subpage) {
		case undefined || 'purchases':
			if (edit) {
				return edit === 'new' ? <PurchaseNew /> : <PurchaseEdit />;
			} else {
				return <Purchases />;
			}

		case 'payments':
			if (edit) {
				return edit === 'new' ? <PaymentNew /> : <PaymentEdit />;
			} else {
				return <Payments />;
			}

		default:
			return <Purchases />;
	}
}
