import axios from 'axios';
import React from 'react';
import md5 from 'md5';
import _ from 'lodash';
import moment from 'moment';


export default () => {
	return new Promise((resolve, reject) => {
		axios({
			method:'get',
			url:'https://app.qudini.com/api/queue/gj9fs',
			auth: {
				username: 'codetest1',
				password: 'codetest100'
			}
		})
			.then(function (response) {
				const customers = response.data.queueData.queue.customersToday;
				console.log(customers);
				customers.map((item, index) => {
					if (item.customer.emailAddress === null) {
						item.customer.emailAddress = 'example@example.com';
					}
					item.customer.avatar = 'https://www.gravatar.com/avatar/' + md5(item.customer.emailAddress);
					item.expectedTime = item.expectedTime.replace(/\.\d\d\d+/g, '');
					item.expectedTime = moment(item.expectedTime).format('DD MMM, YYYY, h:mm:ss a');
					return item;
				});
				let data = _.sortBy(customers, function(o) { return new moment(o.expectedTime, 'DD MMM, YYYY, h:mm:ss a'); });
				console.log(data);
				resolve(data);
			})
			.catch(function (error) {
				reject();
				console.log(error);
			});
	});
};
