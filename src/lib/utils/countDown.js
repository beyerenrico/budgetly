function countdownTimer(timestamp) {
	return setInterval(() => {
		const now = new Date();
		const expiresAt = new Date(timestamp);
		const diff = expiresAt - now;
		const minutes = Math.floor(diff / 1000 / 60);
		const seconds = Math.floor(diff / 1000) - minutes * 60;
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	}, 1000);
}

export default countdownTimer;
