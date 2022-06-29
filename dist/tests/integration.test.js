var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { database } from '../src/database.js';
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import app from '../src/app.js';
import { userFactory } from './factories/userFactory.js';
import { tokenFactory } from './factories/tokenFactory.js';
import { testFactory } from './factories/testFactory.js';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
describe('POST /login', function () {
    beforeEach(truncateUsers);
    afterAll(disconnect);
    it('should answer with status code 200 when given valid credentials', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, persistedUser, body, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = userFactory();
                    persistedUser = __assign(__assign({}, user), { password: bcrypt.hashSync(user.password, 10) });
                    return [4 /*yield*/, database.user.create({
                            data: persistedUser
                        })];
                case 1:
                    _a.sent();
                    body = {
                        email: user.email,
                        password: user.password
                    };
                    return [4 /*yield*/, supertest(app).post('/login').send(body)];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should answer with status code 401 when given unregistered email', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, persistedUser, body, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = userFactory();
                    persistedUser = __assign(__assign({}, user), { password: bcrypt.hashSync(user.password, 10) });
                    return [4 /*yield*/, database.user.create({
                            data: persistedUser
                        })];
                case 1:
                    _a.sent();
                    body = {
                        email: user.email + 'wrong email',
                        password: user.password
                    };
                    return [4 /*yield*/, supertest(app).post('/login').send(body)];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should answer with status code 401 when given wrong password', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, persistedUser, body, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = userFactory();
                    persistedUser = __assign(__assign({}, user), { password: bcrypt.hashSync(user.password, 10) });
                    return [4 /*yield*/, database.user.create({
                            data: persistedUser
                        })];
                case 1:
                    _a.sent();
                    body = {
                        email: user.email,
                        password: user.password + 'wrong password'
                    };
                    return [4 /*yield*/, supertest(app).post('/login').send(body)];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('POST /signup', function () {
    beforeEach(truncateUsers);
    afterAll(disconnect);
    it('should answer with status code 201 when given valid signup', function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, persistedUser, wasUserPersisted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = userFactory();
                    return [4 /*yield*/, supertest(app).post('/signup').send(body)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, database.user.findUnique({
                            where: { email: body.email }
                        })];
                case 2:
                    persistedUser = _a.sent();
                    wasUserPersisted = false;
                    if (persistedUser.email === body.email)
                        wasUserPersisted = true;
                    expect(wasUserPersisted).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should answer with status code 409 when given an already registered email', function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = userFactory();
                    return [4 /*yield*/, supertest(app).post('/signup').send(body)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post('/signup').send(body)];
                case 2:
                    response = _a.sent();
                    expect(response.statusCode).toBe(409);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should answer with status code 422 when given an empty signup', function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = {};
                    return [4 /*yield*/, supertest(app).post('/signup').send(body)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should answer with status code 422 when given an invalid email', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, body, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = userFactory();
                    body = __assign(__assign({}, user), { email: user.email + 'invalid email' });
                    return [4 /*yield*/, supertest(app).post('/signup').send(body)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('GET /categories', function () {
    beforeEach(truncateUsers);
    afterAll(disconnect);
    it('should return status code 200 if given valid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenFactory()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, supertest(app)
                            .get('/categories')
                            .set('authorization', token)];
                case 2:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return status code 401 if given invalid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(app)
                        .get('/categories')
                        .set('authorization', 'invalid token')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('GET /disciplines', function () {
    beforeEach(truncateUsers);
    afterAll(disconnect);
    it('should return status code 200 if given valid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenFactory()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, supertest(app)
                            .get('/disciplines')
                            .set('authorization', token)];
                case 2:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return status code 401 if given invalid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(app)
                        .get('/disciplines')
                        .set('authorization', 'invalid token')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('GET /teachers', function () {
    beforeEach(truncateUsers);
    afterAll(disconnect);
    it('should return status code 200 if given valid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenFactory()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, supertest(app)
                            .get('/teachers')
                            .set('authorization', token)];
                case 2:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return status code 401 if given invalid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(app)
                        .get('/teachers')
                        .set('authorization', 'invalid token')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('GET /tests', function () {
    beforeEach(truncateUsers);
    afterAll(disconnect);
    it('should return status code 200 if given valid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenFactory()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, supertest(app)
                            .get('/tests')
                            .set('authorization', token)];
                case 2:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return status code 401 if given invalid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(app)
                        .get('/tests')
                        .set('authorization', 'invalid token')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('GET /tests?byTeachers=true', function () {
    beforeEach(truncateUsers);
    afterAll(disconnect);
    it('should return status code 200 if given valid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenFactory()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, supertest(app)
                            .get('/tests?byTeachers=true')
                            .set('authorization', token)];
                case 2:
                    response = _a.sent();
                    expect(response.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return status code 401 if given invalid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(app)
                        .get('/tests?byTeachers=true')
                        .set('authorization', 'invalid token')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('POST /tests', function () {
    beforeEach(truncateUsers);
    beforeEach(truncateTests);
    afterAll(disconnect);
    it('should answer with status code 201 when given valid body', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, test, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenFactory()];
                case 1:
                    token = _a.sent();
                    test = testFactory();
                    return [4 /*yield*/, supertest(app)
                            .post('/tests')
                            .set('authorization', token)
                            .send(test)];
                case 2:
                    response = _a.sent();
                    expect(response.statusCode).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should answer with status code 401 when given invalid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var test, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    test = testFactory();
                    return [4 /*yield*/, supertest(app)
                            .post('/tests')
                            .set('authorization', 'invalid token')
                            .send(test)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should answer with status code 422 when given invalid body', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, _a, name, invalidTest, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, tokenFactory()];
                case 1:
                    token = _b.sent();
                    _a = testFactory(), name = _a.name, invalidTest = __rest(_a, ["name"]);
                    return [4 /*yield*/, supertest(app)
                            .post('/tests')
                            .set('authorization', token)
                            .send(invalidTest)];
                case 2:
                    response = _b.sent();
                    expect(response.statusCode).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should answer with status code 404 when given non existing ids', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, test, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenFactory()];
                case 1:
                    token = _a.sent();
                    test = testFactory();
                    test.categoryId = 1000;
                    return [4 /*yield*/, supertest(app)
                            .post('/tests')
                            .set('authorization', token)
                            .send(test)];
                case 2:
                    response = _a.sent();
                    expect(response.statusCode).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('POST /tests/:testId', function () {
    beforeEach(truncateUsers);
    beforeEach(truncateTests);
    afterAll(disconnect);
    it('should answer with status code 201 when given valid testId', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, id, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenFactory()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, createTest()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, database.test.findFirst()];
                case 3:
                    id = (_a.sent()).id;
                    return [4 /*yield*/, supertest(app)
                            .post("/tests/".concat(id))
                            .set('authorization', token)];
                case 4:
                    response = _a.sent();
                    expect(response.statusCode).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should answer with status code 404 when given invalid testId', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, id, invalidId, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenFactory()];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, createTest()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, database.test.findFirst()];
                case 3:
                    id = (_a.sent()).id;
                    invalidId = createRandomInt();
                    while (id === invalidId) {
                        invalidId = createRandomInt();
                    }
                    return [4 /*yield*/, supertest(app)
                            .post("/tests/".concat(invalidId))
                            .set('authorization', token)];
                case 4:
                    response = _a.sent();
                    expect(response.statusCode).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
});
function createTest() {
    return __awaiter(this, void 0, void 0, function () {
        var test;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    test = {
                        name: dayjs(faker.date.recent()).format('MM/YYYY'),
                        pdfUrl: faker.image.animals(),
                        categoryId: 1,
                        disciplineTeacherId: 1
                    };
                    return [4 /*yield*/, database.test.create({ data: test })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createRandomInt() {
    return Math.floor(Math.random() * 10);
}
function truncateUsers() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["TRUNCATE TABLE users;"], ["TRUNCATE TABLE users;"])))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function truncateTests() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.$executeRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["TRUNCATE TABLE tests;"], ["TRUNCATE TABLE tests;"])))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function disconnect() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.$disconnect()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var templateObject_1, templateObject_2;
