import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormPurchaseEdit } from '../../../components/FormPurchaseEdit';
import { FormPurchaseNew } from '../../../components/FormPurchaseNew';
import {
	getItemsByPurchaseId,
	getPurchaseById,
} from '../../../store/actions/requests';

export default function PurchaseEdit() {
	const dispatch = useDispatch();
	const { id } = useSelector((state) => state.pages.current);
	const [defaultValues, setDefaultValues] = useState(null);

	useEffect(() => {
		if (!defaultValues && id) {
			dispatch(getPurchaseById(id)).then((purchase) => {
				dispatch(getItemsByPurchaseId(id)).then((items) => {
					setDefaultValues({ ...defaultValues, items, ...purchase });
				});
			});
		}
	}, [defaultValues, dispatch, id]);

	return (
		<div className="container mx-auto mt-30">
			{defaultValues ? (
				<FormPurchaseEdit defaultValues={defaultValues} />
			) : (
				<FormPurchaseNew />
			)}
		</div>
	);
}
