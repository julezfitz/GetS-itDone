import { useEffect, useState } from "react";
import axios from "axios";

//Submit user info data hook
//Can be used for login & register

export const useSubmit = (path, formData) => {
	const [registered, setRegistered] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (formData) {
			axios
				.post(`http://localhost:8001${path}`, formData)
				.then(res => {
					res.data.registration.errors.length >= 1 &&
						setError(res.data.registration.errors);
					res.data.registration.isRegistered && setRegistered(true);
				})
				.catch(err => setError(err))
				.finally(setLoading(false));
		}
	}, [formData]);

	return [registered, loading, error];
};
