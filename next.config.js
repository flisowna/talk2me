/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    async rewrites() {
        return [{
            source: "/admin",
            destination: "/admin/index.html"
        }]
    }
}

module.exports = nextConfig
