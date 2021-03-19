var aes256 = require("aes256")

var key = "obvwoqcbv21801f19d0zibcoavwpnq"

export const DoEncrypt = (text) => {
    if (text) {
        var encrypted = aes256.encrypt(key, text)
        return encrypted
    }
}

export const DoDecrypt = (message) => {
    if (message) {
        const { user, text } = message

        if (user.startsWith("admin")) {
            return text
        }

        if (text.startsWith(user)) {
            return text
        }

        var decrypted = aes256.decrypt(key, text)
        return decrypted
    }
}