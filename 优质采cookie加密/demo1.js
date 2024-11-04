const CryptoJs = require('crypto-js')


var keyHex = CryptoJS['enc']['Utf8']['parse'](a)
  , encrypted = CryptoJS['DES']['encrypt'](b, keyHex, {
    'mode': CryptoJS['mode']['ECB'],
    'padding': CryptoJS['pad']['Pkcs7']
})
encryptvrscode = encrypted['ciphertext']['toString']()
b = escape(encryptvrscode)