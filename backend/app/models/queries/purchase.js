exports.queryPurchaseItem = (id) => {
	return `SELECT requests.*, CONCAT(users.firstName, " ", users.lastName) AS requestor FROM velox_purchase_requests AS requests INNER JOIN velox_users AS users WHERE requests.id = ${id} AND requests.requestorId = users.id`;
};

exports.queryPurchaseApprovals = (id) => {
	return `SELECT a.*, CONCAT(b.firstName, b.lastName) AS approvedBy, d.handle as groupHandle, d.name as groupName FROM velox_purchase_requests_approvals AS a INNER JOIN velox_users AS b INNER JOIN velox_usergroups_users AS c INNER JOIN velox_usergroups AS d WHERE a.approvedByUserId = b.id AND a.approvedByUserId = c.userId AND c.groupId = d.id AND a.purchaseRequestId = ${id}`;
};

exports.queryInsertApproval = () => {
	return 'INSERT INTO velox_purchase_requests_approvals (purchaseRequestId, approvedByUserId, dateCreated, dateUpdated) VALUES ?';
};
