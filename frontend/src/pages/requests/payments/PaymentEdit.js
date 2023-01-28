import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormEditPayment } from '../../../components/forms/FormEditPayment';
import { getPaymentById } from '../../../store/actions/requests';

export default function PaymentEdit() {
	const dispatch = useDispatch();
	const { id } = useSelector((state) => state.pages.current);
	const [payment, setPayments] = useState(null);

	useEffect(() => {
		if (!payment && id) {
			dispatch(getPaymentById(id)).then((payment) => {
				setPayments({ ...payment, ...payment });
			});
		}
	}, [payment, dispatch, id]);

	return (
		<div className="container mx-auto mt-30 px-15">
			{payment ? <FormEditPayment payment={payment} /> : ''}
		</div>
	);
}
