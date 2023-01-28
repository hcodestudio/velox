exports.queryPaymentApprovals = (id) => {
	return `SELECT a.*, CONCAT(b.firstName, b.lastName) AS approvedBy, d.handle as groupHandle, d.name as groupName FROM velox_payment_requests_approvals AS a INNER JOIN velox_users AS b INNER JOIN velox_usergroups_users AS c INNER JOIN velox_usergroups AS d WHERE a.approvedByUserId = b.id AND a.approvedByUserId = c.userId AND c.groupId = d.id AND a.paymentRequestId = ${id}`;
};
