module.exports = {
    apps: [
        {
            name: "inventory-management-be",
            script: "npm",
            args: "run dev",
            env: {
                NODE_ENV: "development",
                ENV_VAR1: "environment-variable",
            }
        }
    ]
}