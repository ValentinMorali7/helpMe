/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = nextConfig
module.exports = {
    output: "standalone",
    async redirects() {
        return [
            {
                source: '/',
                destination: '/pages/login',
                permanent: true,
            },
        ]
    },
}
