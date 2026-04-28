const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const routeAliases = [
    {
      destination: '/manage',
      permanent: false,
      source: '/admin',
    },
    {
      destination: '/manage',
      permanent: false,
      source: '/dashboard',
    },
    {
      destination: '/payload-admin',
      permanent: false,
      source: '/advanced-admin',
    },
    {
      destination: '/login',
      permanent: false,
      source: '/signin',
    },
    {
      destination: '/login',
      permanent: false,
      source: '/sign-in',
    },
    {
      destination: '/login',
      permanent: false,
      source: '/log-in',
    },
  ]

  const redirects = [internetExplorerRedirect, ...routeAliases]

  return redirects
}

export default redirects
