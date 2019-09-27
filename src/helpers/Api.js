/**
 *  Апи
 *
 *  Большинство методов кешируют ответы
 *  Закешированные ответы возвращаються если не удалось загрузить по АПИ
 *
 */

import Request from "./Request";
import base64 from "react-native-base64";
import { BASE_URL } from "../config/prod";
import AuthHelper from "./Auth";

export default class Api {
  static getDataTemplate() {
    return {};
  }

  // auth

  static async editImage(image) {
    let imageData = new FormData();
    imageData.append("image", {
      uri: image.uri,
      type: "image/jpeg",
      name: "image"
    });

    return await Request.api("/edit_profile", imageData);
  }

  static async getCode(phone) {
    let data = Api.getDataTemplate();
    data.phone = phone;

    return await Request.post("/registration/sms", data);
  }

  static async sendCode(registration_sms_id, registration_sms_code) {
    let data = Api.getDataTemplate();
    data.registration_sms_id = registration_sms_id;
    data.registration_sms_code = registration_sms_code;

    return await Request.post("/registration/sms-validate", data);
  }

  static async registration(
    email,
    password,
    registration_sms_id,
    registration_sms_code,
    name,
    surname,
    birthday,
    country,
    sex,
    language
  ) {
    let data = Api.getDataTemplate();

    data.email = email;
    data.password = password;
    data.registration_sms_id = registration_sms_id;
    data.registration_sms_code = registration_sms_code;
    data.name = name;
    data.surname = surname;
    data.birthday = birthday;
    data.country = country;
    data.sex = sex;
    data.language = language;

    return await Request.post("/registration/register", data);
  }

  static async pushFCMToken(token, os) {
    let data = Api.getDataTemplate();

    data.token = token;
    data.os = os;

    // // console.log(data);

    return await Request.post(`/user/device`, data);
  }

  static async login(phone, password) {
    let url = "https://lotto.airsoft.dev/api/login/token";
    let headers = new Headers();

    headers.set(
      "Authorization",
      "Basic " + base64.encode(phone + ":" + password)
    );

    let response = await fetch(url, {
      method: "GET",
      headers: headers
    });
    let responseJSON = await response.json();

    return responseJSON;
  }

  static async resetPassword(email, phone) {
    let data = Api.getDataTemplate();
    data.email = email;
    data.phone = phone;

    return await Request.post("/reset/password", data);
  }

  static async deleteUser(phone) {
    let data = Api.getDataTemplate();

    data.phone = "380990077770";

    return await Request.delete("/user", data);
  }

  static async getProfile() {
    let data = Api.getDataTemplate();

    // return true;
    return await Request.get("/profile", data);
  }

  static async editProfile(name, surname, sex, birthday, country) {
    let data = Api.getDataTemplate();

    data.name = name;
    data.surname = surname;
    data.sex = sex;
    data.birthday = birthday;
    data.country = country;

    return await Request.put("/profile", data);
  }

  static async changePhone(phone) {
    let data = Api.getDataTemplate();
    data.phone = phone;
    return await Request.post("/profile/phone", data);
  }

  static async changeEmail(old_email, new_email) {
    let data = Api.getDataTemplate();

    data.old_email = old_email;
    data.new_email = new_email;

    return await Request.post("/profile/email", data);
  }

  static async changePassword(old_password, new_password) {
    let data = Api.getDataTemplate();

    //   "old_password":  "test321",
    // "new_password": {
    // 	"first": "test123",
    // 	"second": "test123"
    // }

    data.old_password = old_password;
    data.new_password = new_password;

    return await Request.put("/profile/password", data);
  }

  static async addBalance(amount) {
    let data = Api.getDataTemplate();
    data.amount = amount;
    return await Request.post("/payment/balance/popup", data);
  }

  // =============================

  static async buyGameNormal(dataset, extra, double) {
    let data = Api.getDataTemplate();

    data.dataset = dataset;
    data.extra = extra;
    data.double = double;

    return await Request.post("/game/lotto/normal", data);
  }

  static async subscribeGameNormal(dataset, extra, double, games) {
    let data = Api.getDataTemplate();

    data.dataset = dataset;
    data.extra = extra;
    data.double = double;
    data.games = games;

    return await Request.post("/game/lotto/normal/subscribe", data);
  }

  //

  static async buyGameSystematic(dataset, extra, double) {
    let data = Api.getDataTemplate();

    data.dataset = dataset;
    data.extra = extra;
    data.double = double;

    return await Request.post("/game/lotto/systematic", data);
  }

  static async subscribeGameSystematic(dataset, extra, double, games) {
    let data = Api.getDataTemplate();

    data.dataset = dataset;
    data.extra = extra;
    data.double = double;
    data.games = games;

    return await Request.post("/game/lotto/systematic/subscribe", data);
  }

  //

  static async buyGameSystematicPlus(dataset, extra, double) {
    let data = Api.getDataTemplate();

    data.dataset = dataset;
    data.extra = extra;
    data.double = double;

    return await Request.post("/game/lotto/systematic-plus", data);
  }

  static async subscribeGameSystematicPlus(dataset, extra, double, games) {
    let data = Api.getDataTemplate();

    data.dataset = dataset;
    data.extra = extra;
    data.double = double;
    data.games = games;

    return await Request.post("/game/lotto/systematic-plus/subscribe", data);
  }

  static async getPriceGame01(type) {
    let data = Api.getDataTemplate();

    data.type = type;
    console.log(data);

    return await Request.post("/game/lotto/price", data);
  }

  // ============================

  static async getScratchTicketPrice(type) {
    let data = Api.getDataTemplate();

    data.type = type;
    // console.log(data);

    return await Request.get("/scratch/price", data);
  }

  static async buyScratchTicket(type) {
    let data = Api.getDataTemplate();

    data.type = type;
    // console.log(data);

    return await Request.post("/scratch", data);
  }
  static async playScratchTicket(id) {
    let data = Api.getDataTemplate();

    // data.type = type;
    // // console.log(data);

    return await Request.put(`/scratch/play/${id}`, data);
  }
  static async getScratchTicket(id) {
    let data = Api.getDataTemplate();

    // data.type = type;
    // // console.log(data);

    return await Request.get(`/scratch/${id}`, data);
  }

  // ==========================

  static async getPayedTickets(ticket_type, is_history, offset, limit) {
    let data = Api.getDataTemplate();

    data.ticket_type = ticket_type;
    data.is_history = is_history;
    data.offset = offset;
    data.limit = limit;

    return await Request.get(`/scratch`, data);
  }

  static async getMyTicketsLotto(ticket_type, is_history, offset, limit) {
    let data = Api.getDataTemplate();

    data.is_history = is_history;
    data.offset = offset;
    data.limit = limit;

    return await Request.get(`/game/lotto/${ticket_type}`, data);
  }
}

//getPayedTickets limit
