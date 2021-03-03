"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var path = require('path');

class ChatMsg {
  constructor(nombreArchivo) {
    var _this = this;

    this.getMessages = _asyncToGenerator(function* () {
      try {
        var data = yield fs.promises.readFile(path.resolve(__dirname, _this.FileName), {
          encoding: 'utf8'
        });
        var arrayMsj = JSON.parse(data);
        var ChatMsg = arrayMsj.map(function (data) {
          return {
            mail: data.mail,
            time: data.time,
            message: data.message
          };
        });
        return ChatMsg;
      } catch (error) {
        console.log(error);
        console.log('Error Obteniendo datos de .txt');
        return [];
      }
    });

    this.addMessage = (() => {
      var _ref2 = _asyncToGenerator(function* (nuevoMsg) {
        try {
          _this.ChatMessagess.push(nuevoMsg);

          var data = yield fs.promises.writeFile(path.resolve(__dirname, _this.FileName), JSON.stringify(_this.ChatMessagess));
          console.log("Archivo Guardado");
        } catch (error) {
          console.error("No se pudo Guardar el archivo");
          console.log(error);
        }
      });

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    })();

    this.ChatMessagess = [];
    this.FileName = nombreArchivo;
  } //getMessages = async function() {


}

module.exports = ChatMsg;