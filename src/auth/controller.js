class AuthController {
    constructor(authService) {
        this.authService = authService;
        
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    
    async logIn(req, res, next) {
        try {
            const { email, password } = req.body;
            const token = await this.authService.logIn(email, password);

            if (token.length === 0) {
                return res.status(401).end();
            }

            return res.json({ token });

        } catch (error) {
            return next(error);
        }
    }

    async logOut(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];

            this.authService.logOut(token);
            return res.status(200).end();
        } catch (error) {
            return next(error);
        }
    }


}

module.exports = { AuthController };