import React from 'react';

export default function InputError({ error }) {
	return error ? (
		<p className="text-12 text-crimson px-4 pt-6">{error.message}</p>
	) : (
		''
	);
}
