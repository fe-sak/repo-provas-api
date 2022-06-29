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
/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from '@faker-js/faker';
import { database } from '../src/database.js';
import dayjs from 'dayjs';
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var teachers, categories, terms, disciplines, testsQuantity;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    teachers = ['Dina', 'Bruna', 'Leo', 'Thiago', 'Iagod'];
                    categories = ['P1', 'P2', 'P3', 'P4'];
                    terms = [1, 2, 3, 4];
                    disciplines = ['CSS', 'TypeScript', 'C', 'PostgreSQL', 'React', 'Python'];
                    testsQuantity = 0;
                    return [4 /*yield*/, createTeachers(teachers)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, createCategories(categories)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, createTerms(terms)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, createDisciplines(disciplines)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, createDisciplinesTeachers()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, createTests(testsQuantity)];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (e) {
    console.error(e);
    process.exit(1);
})["finally"](function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
function createCategories(categories) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = categories.map(function (categories) { return ({ name: categories }); });
                    return [4 /*yield*/, createMany(data, 'category')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createTeachers(teachers) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = teachers.map(function (teacher) { return ({ name: teacher }); });
                    return [4 /*yield*/, createMany(data, 'teacher')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createTerms(terms) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = terms.map(function (term) { return ({ number: term }); });
                    return [4 /*yield*/, createMany(data, 'term')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createDisciplines(disciplines) {
    return __awaiter(this, void 0, void 0, function () {
        var terms, termIds, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.term.findMany()];
                case 1:
                    terms = _a.sent();
                    termIds = terms.map(function (term) { return term.id; });
                    data = disciplines.map(function (discipline) { return ({
                        name: discipline,
                        termId: getRandomElement(termIds)
                    }); });
                    return [4 /*yield*/, createMany(data, 'discipline')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createDisciplinesTeachers() {
    return __awaiter(this, void 0, void 0, function () {
        var disciplines, teachers, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.discipline.findMany()];
                case 1:
                    disciplines = _a.sent();
                    return [4 /*yield*/, database.teacher.findMany()];
                case 2:
                    teachers = _a.sent();
                    data = Array.from({ length: 12 }).map(function () { return ({
                        disciplineId: getRandomElement(disciplines).id,
                        teacherId: getRandomElement(teachers).id
                    }); });
                    return [4 /*yield*/, createMany(data, 'disciplineTeacher')];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createTests(quantity) {
    return __awaiter(this, void 0, void 0, function () {
        var categories, disciplinesTeachers, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database.category.findMany()];
                case 1:
                    categories = _a.sent();
                    return [4 /*yield*/, database.disciplineTeacher.findMany()];
                case 2:
                    disciplinesTeachers = _a.sent();
                    data = Array.from({ length: quantity }).map(function () { return ({
                        name: dayjs(faker.date.past()).format('DD/MM/YYYY'),
                        pdfUrl: faker.image.animals(),
                        categoryId: getRandomElement(categories).id,
                        disciplineTeacherId: getRandomElement(disciplinesTeachers).id
                    }); });
                    return [4 /*yield*/, createMany(data, 'test')];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createMany(data, table) {
    return __awaiter(this, void 0, void 0, function () {
        var createResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database[table].createMany({
                        data: data,
                        skipDuplicates: true
                    })];
                case 1:
                    createResult = _a.sent();
                    console.log(table);
                    console.log(data);
                    console.log({ createResult: createResult });
                    return [2 /*return*/];
            }
        });
    });
}
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
