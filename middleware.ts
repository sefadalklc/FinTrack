import { withAuth } from "next-auth/middleware"

export default withAuth(
    {
        pages: {
            signIn: "/login"
        },
        callbacks: {
            authorized: (auth) => {
                return auth.req.cookies.get("next-auth.session-token") != null;
            },
        },
    }
)

export const config = {
    matcher: ['/'],
};


