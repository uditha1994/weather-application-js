class AuthController {
    constructor(authModal, authView) {
        this.authModal = authModal;
        this.authView = authView;

        //bind view events
        this.authView.bindEvents(
            this.handleShowModal.bind(this),
            this.handleHideModal.bind(this),
            this.handleShowLogin.bind(this),
            this.handleShowSignup.bind(this),
            this.handleSignup.bind(this),
            this.handleLogin.bind(this),
            this.handleLogout.bind(this)
        );
    }

    //initialize the controller
    init() {
        const user = this.authModal.getCurrentUser();
        if (user) {
            this.authView.showLogoutButton();
        }
    }

    handleShowModal() {
        this.authView.showAuthModal();
        this.authView.showSignupForm();
    }

    handleHideModal() {
        this.authView.hideAuthModal();
    }

    handleShowLogin(e) {
        e.preventDefault();
        this.authView.showLoginForm();
    }

    handleShowSignup(e) {
        e.preventDefault();
        this.authView.showSignupForm();
    }

    handleSignup(name, email, password) {
        if (!name || !email || !password) {
            this.authView.showError('Please fill in all fields', 'signup');
            return;
        }

        this.authModal.signup(name, email, password)
            .then(() => {
                this.authView.hideAuthModal();
                this.authView.showLogoutButton();
            })
            .catch(error => {
                this.authView.showError(error.message, 'signup');
            });
    }

    handleLogin(email, password) {
        if (!email || !password) {
            this.authView.showError('Please fill in all fields', 'signup');
            return;
        }
        this.authModal.logIn(email, password)
            .then(() => {
                this.authView.hideAuthModal();
                this.authView.showLogoutButton();
            })
            .catch(error => {
                this.authView.showError(error.message, 'login');
            });
    }

    handleLogout() {
        this.authModal.logout()
            .then(() => {
                this.authView.showLoginButton();
            })
            .catch(error => {
                this.authView.showError(error.message);
            });
    }
}