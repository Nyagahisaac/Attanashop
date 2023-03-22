module.exports = {
    basePath: process.env.NODE_ENV === 'production' ? `/react/molla/demo-${process.env.NEXT_PUBLIC_DEMO}` : '',
    trailingSlash: true,
    env: {
        PUBLIC_URL: process.env.NODE_ENV === 'production' ? `/react/molla/demo-${process.env.NEXT_PUBLIC_DEMO}/` : '/',
        APP_URL: process.env.NODE_ENV === 'production' ? 'https://d-themes.com/react/molla/' : 'http://localhost/' ,
        BACKEND_URL:process.env.NODE_ENV === 'production' ? `${process.env.NEXT_PUBLIC_API_BASEURL}/`: '/'
    }
}
