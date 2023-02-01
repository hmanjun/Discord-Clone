import decode from 'jwt-decode'

class jwtService {
    getUserToken() {
        return localStorage.getItem('id_token')
    }

    login(token) {
        localStorage.setItem('id_token', token)
        window.location.assign(`/Discord-Clone/#/channels/@me`)
    }

    logout() {
        localStorage.removeItem('id_token')
    }

    joinRoom(token) {
        localStorage.setItem('id_token', token)
    }
}

export default new jwtService()