import decode from 'jwt-decode'

class jwtService {
    getUserToken() {
        return localStorage.getItem('id_token')
    }

    login(token) {
        localStorage.setItem('id_token', token)
    }

    logout() {
        localStorage.removeItem('id_token')
    }

    getRoomToken() {
        return localStorage.getItem('room_token')
    }

    joinRoom(token) {
        localStorage.setItem('room_token', token)
    }

    leaveRoom() {
        localStorage.removeItem('room_token')
    }
}

export default new jwtService()