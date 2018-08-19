import { expect } from "chai";
import UserService from "../src/services/user";
const userData = {
  username: "johndoe",
  email: "test@mail.com",
  password: "1233321",
  country: "USA",
  phoneNumber: "+1011111111",
  isEmailVerified: false
};
const newData = {
  username: "Mr. Smith 4th",
  email: "test@mail1.com",
  password: "12333221",
  country: "UK",
  phoneNumber: "+1011111111",
  isEmailVerified: true
};
const firstId = 1;

beforeAll((done) => {
  const db = require("../src/services/db");
  db.default.syncDB().then(done);
});

describe("User service test", () => {
  it("should create new user", (done) => {
    UserService.create(userData)
      .then(user => {
        expect(user.token).to.be.a("string");
        expect(user.refreshToken).to.be.a("string");
        expect(user.accessTokenExpiredAt).to.be.a("number");
        done();
      });
  });


  it("should update user", (done) => {
    UserService.update(firstId, newData).then(async () => {
      const updated = (await UserService.read(firstId)) as any;

      expect(updated.dataValues.country).to.equal(newData.country);
      expect(updated.dataValues.email).to.equal(newData.email);
      expect(updated.dataValues.isEmailVerified).to.equal(newData.isEmailVerified);
      expect(updated.dataValues.password).to.equal(newData.password);
      expect(updated.dataValues.phoneNumber).to.equal(newData.phoneNumber);
      expect(updated.dataValues.username).to.equal(newData.username);
      done();
    });
  });

  it("should find user", (done) => {
    UserService.read(firstId).then(user => {
      expect(user.username).to.equal(newData.username);
      done();
    });
  });

  it("should delete", (done) => {
    UserService.delete(firstId).then(async () => {
      const deleted = await UserService.read(firstId);
      expect(deleted).is.null;
      done();
    });
  });
});
