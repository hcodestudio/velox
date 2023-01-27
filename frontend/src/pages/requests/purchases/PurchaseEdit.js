import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormEditPurchase } from '../../../components/forms/FormEditPurchase';
import {
	getItemsByPurchaseId,
	getPurchaseById,
} from '../../../store/actions/requests';

export default function PurchaseEdit() {
	const dispatch = useDispatch();
	const { id } = useSelector((state) => state.pages.current);
	const [purchase, setPurchases] = useState(null);

	useEffect(() => {
		if (!purchase && id) {
			dispatch(getPurchaseById(id)).then((purchase) => {
				dispatch(getItemsByPurchaseId(id)).then((items) => {
					setPurchases({ ...purchase, items, ...purchase });
				});
			});
		}
	}, [purchase, dispatch, id]);

	return (
		<div className="container mx-auto mt-30 px-15">
			{purchase ? <FormEditPurchase purchase={purchase} /> : ''}
		</div>
	);
}
