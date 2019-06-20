module.exports = {
	apps: [{
		name: 'Hapiness',
		script: 'server.js',
		instances: 1,
		exec_mode: 'cluster',
		restart_delay: 3000
	}]
};
